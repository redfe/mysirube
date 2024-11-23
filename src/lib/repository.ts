import type { EditData } from '../routes/edit/data.svelte';

export const dbName = 'MySerube';
export const storeName = 'datas';

export function initDB(): Promise<IDBDatabase> {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(dbName, 1);

		request.onupgradeneeded = () => {
			const db = request.result;
			if (!db.objectStoreNames.contains(storeName)) {
				db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
			}
		};

		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}

export async function save(db: IDBDatabase, datas: EditData[]) {
	return new Promise((resolve, reject) => {
		try {
			// トランザクションの作成
			const transaction = db.transaction(storeName, 'readwrite');
			const store = transaction.objectStore(storeName);

			// 既存データをクリア
			const clearRequest = store.clear();
			clearRequest.onerror = () => reject(clearRequest.error);

			clearRequest.onsuccess = () => {
				// データを追加
				for (const data of datas) {
					const addRequest = store.add({
						start: data.start,
						end: data.end,
						title: data.title,
						color: data.color
					});
					addRequest.onerror = () => reject(addRequest.error);
				}

				// トランザクション完了時の処理
				transaction.oncomplete = () => resolve(true);
				transaction.onerror = () => reject(transaction.error);
			};
		} catch (error) {
			console.error('保存処理エラー:', error);
			reject(error);
		}
	});
}

export function getAllData(db: IDBDatabase): Promise<{ id: IDBValidKey }[]> {
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(storeName, 'readonly');
		const store = transaction.objectStore(storeName);
		const request = store.getAll();

		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}
