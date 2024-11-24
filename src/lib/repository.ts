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
				const store = db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: false });
				store.createIndex('indexOfStart', 'start', { unique: false });
			}
		};

		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
	return database;
}

export async function save(data: Data) {
	const db = await (database ?? initDB());
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(storeName, 'readwrite');
		const store = transaction.objectStore(storeName);
		const request = store.put(data);

		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}

export async function remove(id: string) {
	const db = await (database ?? initDB());
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(storeName, 'readwrite');
		const store = transaction.objectStore(storeName);
		const request = store.delete(id);

		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}

export async function getAllData(): Promise<Data[]> {
	const db = await (database ?? initDB());
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(storeName, 'readonly');
		const store = transaction.objectStore(storeName);
		// start でソートされた状態で取得する
		const indexOfStart = store.index('indexOfStart');
		const request = indexOfStart.getAll();

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
