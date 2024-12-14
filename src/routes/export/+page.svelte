<script lang="ts">
	import { browser } from '$app/environment';
	import Button from '$lib/components/core/Button.svelte';
	import Typograph from '$lib/components/core/Typograph.svelte';
	import { initDB, search, storeName, type Data } from '$lib/repository';

	// 書き込み中かどうかを管理するストア
	let writing = $state(false);
	// 進捗状況を管理するストア
	let progress = $state(0);

	const isExportable = browser && 'showSaveFilePicker' in window;

	const write = async (fileHandle: FileSystemFileHandle) => {
		// 総件数だけ欲しいので start は未来を指定
		const totalCount = (await search({ start: 100000 })).count;
		const writable = await fileHandle.createWritable();
		const db = await initDB();

		let exportedCount = 0;

		// 大量データを想定して1件ずつ書き込む
		await new Promise<void>(async (resolve, reject) => {
			await writable.write('[');
			const transaction = db.transaction(storeName, 'readonly');
			const store = transaction.objectStore(storeName);
			const index = store.index('indexOfStartAndTitle');
			const cursorRequest = index.openCursor(null, 'next');
			cursorRequest.onsuccess = async () => {
				const cursor = cursorRequest.result;
				if (cursor) {
					const data: Data = cursor.value;
					writable.write(JSON.stringify(data) + ',');
					exportedCount++;
					progress = Math.floor((exportedCount / totalCount) * 100);
					cursor.continue();
				} else {
					if (totalCount > 0) {
						// フォーマットエラー対策で空オブジェクトを挿入
						await writable.write('{}');
					}
					await writable.write(']');
					await writable.close();
					resolve();
				}
			};
			cursorRequest.onerror = () => reject(cursorRequest.error);
		});
	};

	const exportFile = async () => {
		if (!isExportable) return;

		try {
			const now = new Date();
			// @ts-ignore 型エラーを避けるためのコメント。ただし型定義を導入することが理想。
			const fileHandle: FileSystemFileHandle = await window.showSaveFilePicker({
				suggestedName: `myshirube_${now.toLocaleDateString().replaceAll(/[^0-9]/g, '')}_${now.toLocaleTimeString().replaceAll(/[^0-9]/g, '')}.json`,
				types: [
					{
						description: 'JSON Files',
						accept: { 'application/json': ['.json'] }
					}
				]
			});
			writing = true;
			await write(fileHandle);
			// 完了したことを認識してもらいやすくするため、少し停止する
			await new Promise((r) => setTimeout(r, 1000));

			alert('エクスポートが完了しました');
		} catch (error: any) {
			if (error['name'] === 'AbortError') {
				// キャンセル
				return;
			}
			console.error('エクスポート中にエラーが発生しました:', error);
			throw error;
		} finally {
			writing = false;
			progress = 0;
		}
	};
</script>

<svelte:head><title>Myしるべ：エクスポート</title></svelte:head>

{#if isExportable}
	{#if writing}
		<Typograph>{`書き込み中...${progress}%`}</Typograph>
	{:else}
		<Button onclick={exportFile}>{'エクスポート'}</Button>
	{/if}
{:else}
	<Typograph>window.showSaveFilePicker がないためエクスポートできません</Typograph>
{/if}
