<script lang="ts">
	import Button from '$lib/components/core/Button.svelte';
	import Typograph from '$lib/components/core/Typograph.svelte';
	import { initDB, storeNames, version } from '$lib/repository';

	const valueBuffers: { datas: any[]; themes: any[]; colorSettings: any[] } = {
		datas: [],
		themes: [],
		colorSettings: []
	};

	let progress = $state(0);
	let importing = $state(false);

	const clearStore = async () => {
		const db = await initDB();
		const storeNames = db.objectStoreNames;
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
		if (storeNames.indexOf(storeName) < 0) {
			console.warn(`ストア名が不正です: ${storeName}`);
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
				const { done, value } = await reader.read();
				if (done) break;

				processedSize += value.length;
				buffer += decoder.decode(value, { stream: true });
				buffer = await processBuffer(buffer);
				progress = (processedSize * 100) / totalSize;
			}

			// 最後に残ったバッファを処理
			if (buffer) {
				await processFinalBuffer(buffer);
			}

			// バッファが空でも finalizeValueBuffers を実行
			await finalizeValueBuffers();

			alert('インポートが完了しました');
		} finally {
			importing = false;
			progress = 0;
		}
	}

	async function processBuffer(buffer: string): Promise<string> {
		const lines: string[] = buffer.split('\n');
		const lastLine = lines.pop(); // 最後の行が不完全ならバッファに保持

		const values = lines.map((line) => JSON.parse(line));
		for (const value of values) {
			await addToValueBuffers(value);
		}

		return lastLine || '';
	}

	async function processFinalBuffer(buffer: string) {
		// 最後のバッファを処理する際も processBuffer を再利用
		await processBuffer(buffer);
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
		<input {id} type="file" accept=".mysirube" onchange={handleFileSelect} />
	{/if}
</div>

<style>
	input {
		display: none;
	}
</style>
