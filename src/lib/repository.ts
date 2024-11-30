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
				store.createIndex('indexOfColor', 'color', { unique: false });
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

const MAX_PER_DISPLAY = 1000;

/**
 * options.start 〜 1000件を取得する
 * @returns
 */
export async function search(options?: {
	start?: number;
	colors?: string[];
}): Promise<SearchResult> {
	const db = await (database ?? initDB());
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(storeName, 'readonly');
		const store = transaction.objectStore(storeName);
		// start でソートされた状態で取得する
		const indexOfStart = store.index('indexOfStart');
		const query = options?.start != null ? IDBKeyRange.lowerBound(options?.start) : null;
		const countRequest = indexOfStart.count();

		const searchResult: SearchResult = {
			datas: [],
			count: 0
		};
		countRequest.onsuccess = () => {
			const request = indexOfStart.openCursor(query, 'next');
			searchResult.count = countRequest.result;
			let hitCount = 0;
			request.onsuccess = () => {
				const cursor = request.result;
				if (hitCount >= MAX_PER_DISPLAY) {
					resolve(searchResult);
					return;
				}
				if (cursor) {
					const data: Data = cursor.value;
					if (options?.colors == null || options.colors.includes(data.color ?? '')) {
						hitCount++;
						searchResult.datas.push(data);
					}
					cursor.continue();
				} else {
					resolve(searchResult);
				}
			};
			request.onerror = () => reject(request.error);
		};
		countRequest.onerror = () => reject(countRequest.error);
	});
}

export async function colors(): Promise<string[]> {
	const db = await (database ?? initDB());
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(storeName, 'readonly');
		const store = transaction.objectStore(storeName);
		const indexOfStart = store.index('indexOfStart');
		const request = indexOfStart.openCursor(null, 'next');

		const colors: string[] = [];
		request.onsuccess = () => {
			const cursor = request.result;
			if (cursor) {
				const data: Data = cursor.value;
				const targetColor = data.color ?? '';
				if (!colors.includes(targetColor)) {
					colors.push(targetColor);
				}
				cursor.continue();
			} else {
				resolve(colors);
			}
		};
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

export type SearchResult = {
	datas: Data[];
	count: number;
};
