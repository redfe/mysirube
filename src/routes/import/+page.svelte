<script lang="ts">
	import Button from '$lib/components/core/Button.svelte';
	import Typograph from '$lib/components/core/Typograph.svelte';
	import { initDB, storeName, version } from '$lib/repository';

	let progress = $state(0);
	let importing = $state(false);

	const clearStore = async () => {
		const db = await initDB();
		return new Promise<void>((resolve, reject) => {
			const transaction = db.transaction(storeName, 'readwrite');
			const store = transaction.objectStore(storeName);
			const clearRequest = store.clear();
			clearRequest.onsuccess = () => resolve();
			clearRequest.onerror = (error) => reject(error);
		});
	};

	// チャンクごとに IndexedDB にデータを挿入
	const insertChunk = async (chunk: any[]) => {
		const db = await initDB();
		return new Promise<void>((resolve, reject) => {
			const transaction = db.transaction(storeName, 'readwrite');
			const store = transaction.objectStore(storeName);

			for (const item of chunk) {
				if (!('start' in item)) {
					continue;
				}
				store.add({
					...item,
					createdAt: new Date(item.createdAt),
					updatedAt: new Date(item.updatedAt)
				});
			}

			transaction.oncomplete = () => resolve();
			transaction.onerror = () => reject(transaction.error);
		});
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

				insertChunk(lines.map((line) => JSON.parse(line)));
				progress = (processedSize * 100) / totalSize;
			}

			// 最後に残ったバッファを処理
			if (buffer) {
				insertChunk([JSON.parse(buffer)]);
			}

			alert('インポートが完了しました');
		} finally {
			importing = false;
			progress = 0;
		}
	}

	const handleFileSelect = async (event: Event) => {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files[0]) {
			await importFile(input.files[0]);
		}
	};

	const id = crypto.randomUUID();
</script>

<svelte:head><title>Myしるべ：インポート</title></svelte:head>

<div>
	<div>
		{#if importing}
			<Typograph>インポート中... {progress}%</Typograph>
		{:else}
			<Button><label for={id}>ファイル選択</label></Button>
			<input {id} type="file" accept=".myshirube" onchange={handleFileSelect} />
		{/if}
	</div>
	<div>
		<Button>TODO サンプルデータインポート</Button>
	</div>
</div>

<style>
	input {
		display: none;
	}
</style>
