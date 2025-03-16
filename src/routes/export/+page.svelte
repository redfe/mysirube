<script lang="ts">
	import { browser } from '$app/environment';
	import Button from '$lib/components/core/Button.svelte';
	import Typograph from '$lib/components/core/Typograph.svelte';
	import {
		initDB,
		dataStoreName,
		themeStoreName,
		version,
		getAllDataCount,
		getAllThemeCount
	} from '$lib/repository';

	// 書き込み中かどうかを管理するストア
	let writing = $state(false);

	// 進捗状況を管理するストア
	let progress = $state(0);

	const isExportable = browser && 'showSaveFilePicker' in window;

	const write = async (fileHandle: FileSystemFileHandle) => {
		const totalCount = (await getAllDataCount()) + (await getAllThemeCount());
		const writable = await fileHandle.createWritable();
		const db = await initDB();

		let exportedCount = 0;

		// メタ情報を書き込み
		await writable.write(JSON.stringify({ version, exportedAt: new Date() }) + '\n');

		// datas
		// 大量データを想定して1件ずつ書き込む
		const datas = new Promise<void>(async (resolve, reject) => {
			const transaction = db.transaction(dataStoreName, 'readonly');
			const store = transaction.objectStore(dataStoreName);
			const index = store.index('indexOfStartAndTitle');
			const cursorRequest = index.openCursor(null, 'next');
			cursorRequest.onsuccess = async () => {
				const cursor = cursorRequest.result;
				if (cursor) {
					const value = cursor.value;
					// どのストアにインポートすべきかを示すためストア名を追加しておく
					writable.write(JSON.stringify({ _storeName: dataStoreName, ...value }) + '\n');
					exportedCount++;
					progress = Math.floor((exportedCount / totalCount) * 100);
					cursor.continue();
				} else {
					resolve();
				}
			};
			cursorRequest.onerror = () => reject(cursorRequest.error);
		});

		// themes
		const themes = new Promise<void>(async (resolve, reject) => {
			const transaction = db.transaction(themeStoreName, 'readonly');
			const store = transaction.objectStore(themeStoreName);
			const cursorRequest = store.openCursor(null, 'next');
			cursorRequest.onsuccess = async () => {
				const cursor = cursorRequest.result;
				if (cursor) {
					const value = cursor.value;
					writable.write(JSON.stringify({ _storeName: themeStoreName, ...value }) + '\n');
					exportedCount++;
					progress = Math.floor((exportedCount / totalCount) * 100);
					cursor.continue();
				} else {
					resolve();
				}
			};
			cursorRequest.onerror = () => reject(cursorRequest.error);
		});
		await Promise.all([datas, themes]);
		await writable.close();
	};

	const exportFile = async () => {
		if (!isExportable) return;

		try {
			const now = new Date();
			const createFileName = (date: Date) => {
				const yyyy = `${date.getFullYear()}`;
				const mm = `${date.getMonth() < 10 - 1 ? '0' : ''}${date.getMonth() + 1}`;
				const dd = `${date.getDate() < 10 - 1 ? '0' : ''}${date.getDate()}`;
				return `mysirube_${yyyy}${mm}${dd}_${now.toLocaleTimeString().replaceAll(/[^0-9]/g, '')}.mysirube`;
			};
			// @ts-ignore 型エラーを避けるためのコメント。ただし型定義を導入することが理想。
			const fileHandle: FileSystemFileHandle = await window.showSaveFilePicker({
				suggestedName: createFileName(now),
				types: [
					{
						description: 'Myしるべ ファイル',
						accept: { 'text/plain': ['.mysirube'] }
					}
				]
			});
			writing = true;
			await write(fileHandle);
			writing = false;
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
