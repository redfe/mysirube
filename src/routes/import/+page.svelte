<script lang="ts">
	import Button from '$lib/components/core/Button.svelte';
	import TextInput from '$lib/components/core/TextInput.svelte';
	import Typograph from '$lib/components/core/Typograph.svelte';
	import { initDB, storeName } from '$lib/repository';

	let progress = $state(0);
	let importing = $state(false);

	const clearStore = async (db: IDBDatabase) => {
		return new Promise<void>((resolve, reject) => {
			const transaction = db.transaction(storeName, 'readwrite');
			const store = transaction.objectStore(storeName);
			const clearRequest = store.clear();
			clearRequest.onsuccess = () => resolve();
			clearRequest.onerror = (error) => reject(error);
		});
	};

	// チャンクごとに IndexedDB にデータを挿入
	const insertChunk = async (db: IDBDatabase, chunk: any[]) => {
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
	const importFile = async (file: File) => {
		try {
			importing = true;
			const db = await initDB();
			await clearStore(db);

			const stream = file.stream();
			const reader = stream.getReader();
			const decoder = new TextDecoder();

			let buffer = '';
			let totalSize = file.size;
			let processedSize = 0;

			// チャンクごとに処理
			const chunkSize = 100; // 1回のトランザクションで処理するデータ数
			let dataChunk: any[] = [];

			while (true) {
				const { value, done } = await reader.read();
				if (done) break;

				// デコードしてバッファに追加
				buffer += decoder.decode(value, { stream: true });

				// JSON オブジェクト単位で区切りを見つける
				let boundary = buffer.lastIndexOf('}');
				if (boundary !== -1) {
					let chunk = buffer.slice(0, boundary + 1);
					let currentSize = chunk.length;
					chunk = chunk.startsWith('[') ? chunk.slice(1) : chunk;
					chunk = chunk.startsWith(',') ? chunk.slice(1) : chunk;
					buffer = buffer.slice(boundary + 1);

					// JSON パースしてチャンクに追加
					const items = JSON.parse(`[${chunk}]`);
					dataChunk.push(...items);

					// チャンクサイズを超えたら挿入
					while (dataChunk.length >= chunkSize) {
						await insertChunk(db, dataChunk.splice(0, chunkSize));
						processedSize += currentSize / chunkSize;
						progress = Math.floor((processedSize / totalSize) * 100);
					}
				}
			}

			// 最後に残ったデータを挿入
			if (dataChunk.length > 0) {
				await insertChunk(db, dataChunk);
			}
			progress = 100;

			// 完了したことを認識してもらいやすくするため、少し停止する
			await new Promise((r) => setTimeout(r, 1000));

			alert('インポートが完了しました');
		} catch (error) {
			console.error('インポートエラー:', error);
		} finally {
			importing = false;
			progress = 0;
		}
	};

	const handleFileSelect = async (event: Event) => {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files[0]) {
			await importFile(input.files[0]);
		}
	};

	const id = crypto.randomUUID();
</script>

{#if importing}
	<Typograph>インポート中... {progress}%</Typograph>
{:else}
	<Button><label for={id}>ファイル選択</label></Button>
	<input {id} type="file" accept="application/json" onchange={handleFileSelect} />
{/if}

<style>
	input {
		display: none;
	}
</style>
