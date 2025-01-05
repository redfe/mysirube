<script lang="ts">
	import Button from '$lib/components/core/Button.svelte';
	import Typograph from '$lib/components/core/Typograph.svelte';
	import { initDB, version } from '$lib/repository';

	const valueBuffers: { datas: any[]; themes: any[] } = { datas: [], themes: [] };

	let progress = $state(0);
	let importing = $state(false);

	const clearStore = async () => {
		const db = await initDB();
		const storeNames = Object.keys(valueBuffers);
		for (let i = 0; i < storeNames.length; i++) {
			const storeName = storeNames[i];
			await new Promise<void>((resolve, reject) => {
				const transaction = db.transaction(storeName, 'readwrite');
				const store = transaction.objectStore(storeName);
				const clearRequest = store.clear();
				clearRequest.onsuccess = () => resolve();
				clearRequest.onerror = (error) => reject(error);
			});
		}
	};

	const selectStoreName = (chunk: any) => {
		return chunk._storeName;
	};

	const saveValues = async (storeName: string, values: any[]) => {
		const db = await initDB();
		return new Promise<void>((resolve, reject) => {
			const transaction = db.transaction(storeName, 'readwrite');
			const store = transaction.objectStore(storeName);
			for (const item of values) {
				// 不要なデータを削除しておく
				delete item['_storeName'];
				// 登録
				store.put({
					...item,
					id: item.id ?? crypto.randomUUID,
					createdAt: new Date(item.createdAt ?? new Date()),
					updatedAt: new Date(item.updatedAt ?? new Date())
				});
			}

			transaction.oncomplete = () => resolve();
			transaction.onerror = () => reject(transaction.error);
		});
	};

	const addToValueBuffers = async (value: any) => {
		const storeName = selectStoreName(value);
		if (storeName == null) {
			console.warn(`ストア名を特定できませんでした。:`, value);
			return;
		}
		const buffer = (valueBuffers as any)[storeName] as any[];
		if (buffer) {
			buffer.push(value);
			// 件数が閾値を越えたら保存する
			if (buffer.length > 100) {
				await saveValues(storeName, buffer);
				buffer.splice(0, buffer.length);
			}
		}
	};

	const finalizeValueBuffers = async () => {
		const storeNames = Object.keys(valueBuffers);
		for (let i = 0; i < storeNames.length; i++) {
			const storeName = storeNames[i];
			await saveValues(storeName, (valueBuffers as any)[storeName]);
		}
	};

	// ファイルをストリーミングで読み込みながらインポート
	async function importFile(file: File) {
		const reader = file.stream().getReader();
		const decoder = new TextDecoder('utf-8');
		await clearStore();

		let buffer: string | undefined = ''; // 行分割用のバッファ

		const totalSize = file.size;
		let processedSize = 0;
		progress = 0;

		let firstLine: string | undefined = undefined;

		try {
			while (true) {
				// ファイルをストリームからチャンクごとに読み込む
				const { done, value } = await reader.read();
				if (done) break;

				processedSize += value.length;

				// バイナリデータをテキストにデコード
				buffer += decoder.decode(value, { stream: true });

				// 行単位に分割
				const lines: string[] = buffer?.split('\n') ?? [];
				if (!firstLine && lines.length > 0) {
					firstLine = lines[0];
					const meta: any = JSON.parse(firstLine);
					if (String(meta.version) !== String(version)) {
						alert('バージョンが違うためインポートできません。');
						return;
					}
					importing = true;
				}
				buffer = lines.pop(); // 最後の行が不完全ならバッファに保持

				const values = lines.map((line) => JSON.parse(line));
				for (let i = 0; i < values.length; i++) {
					await addToValueBuffers(values[i]);
				}
				progress = (processedSize * 100) / totalSize;
			}

			// 最後に残ったバッファを処理
			if (buffer) {
				addToValueBuffers([JSON.parse(buffer)]);
			}
			await finalizeValueBuffers();

			alert('インポートが完了しました');
		} finally {
			importing = false;
			progress = 0;
		}
	}

	const handleFileSelect = async (event: Event) => {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files[0]) {
			const file = input.files[0];
			await importFile(file);
		}
	};

	const id = crypto.randomUUID();
</script>

<svelte:head><title>Myしるべ：インポート</title></svelte:head>

<div>
	{#if importing}
		<Typograph>インポート中... {progress}%</Typograph>
	{:else}
		<Button
			onclick={(e) => {
				if (!confirm('データが上書きされるので、事前にエクスポートしておくことをお勧めします。')) {
					e.preventDefault();
					e.stopPropagation();
				}
			}}><label for={id}>インポート</label></Button
		>
		<input {id} type="file" accept=".myshirube" onchange={handleFileSelect} />
	{/if}
</div>

<style>
	input {
		display: none;
	}
</style>
