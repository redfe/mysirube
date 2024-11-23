export const dbName = 'MySerube';
export const storeName = 'datas';

let database: Promise<IDBDatabase> | null = null;

function initDB(): Promise<IDBDatabase> {
	if (database) return database;

	database = new Promise((resolve, reject) => {
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
	return database;
}

export async function save(datas: Data[]) {
	const db = await (database ?? initDB());
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
					const addRequest = store.add(data);
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

export async function getAllData(): Promise<Data[]> {
	const db = await (database ?? initDB());
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(storeName, 'readonly');
		const store = transaction.objectStore(storeName);
		const request = store.getAll();

		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}

export type Data = {
	id: string;
	start: number;
	end?: number;
	title: string;
	color?: string;
};
