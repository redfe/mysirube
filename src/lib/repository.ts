import { sampleData } from './sampleData';

export const dbName = 'MySerube';
export const storeName = 'datas';
export const version = 1;
const MAX_PER_DISPLAY = 1000;

let database: Promise<IDBDatabase> | null = null;

export function initDB(): Promise<IDBDatabase> {
	if (database) return database;

	database = new Promise((resolve, reject) => {
		const request = indexedDB.open(dbName, version);

		request.onupgradeneeded = () => {
			const db = request.result;
			if (!db.objectStoreNames.contains(storeName)) {
				const store = db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: false });
				store.createIndex('indexOfStartAndTitle', ['start', 'title'], { unique: false });
				sampleData.forEach((item) => {
					const request = store.add(item);
					request.onerror = () => reject(request.error);
				});
			}
		};

		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
	return database;
}

export async function save(data: Data) {
	const db = await initDB();
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(storeName, 'readwrite');
		const store = transaction.objectStore(storeName);
		const request = store.put(data);

		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}

export async function remove(id: string) {
	const db = await initDB();
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(storeName, 'readwrite');
		const store = transaction.objectStore(storeName);
		const request = store.delete(id);

		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}

/**
 * options.start 〜 1000件を取得する
 * @returns
 */
export async function search(options?: {
	start?: number;
	colors?: string[];
	subColors?: string[];
}): Promise<SearchResult> {
	const db = await initDB();
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(storeName, 'readonly');
		const store = transaction.objectStore(storeName);
		// start でソートされた状態で取得する
		const indexOfStartAndTitle = store.index('indexOfStartAndTitle');
		const query = options?.start != null ? IDBKeyRange.lowerBound([options?.start]) : null;
		const countRequest = indexOfStartAndTitle.count();

		const searchResult: SearchResult = {
			datas: [],
			count: 0
		};
		countRequest.onsuccess = () => {
			const request = indexOfStartAndTitle.openCursor(query, 'next');
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
					if (
						options?.colors == null ||
						(options.colors.includes(data.color ?? '') &&
							(options.subColors == null || options.subColors.includes(data.subColor ?? '')))
					) {
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

export async function colors(): Promise<{ colors: string[]; subColors: string[] }> {
	const db = await initDB();
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(storeName, 'readonly');
		const store = transaction.objectStore(storeName);
		const indexOfStartAndTitle = store.index('indexOfStartAndTitle');
		const request = indexOfStartAndTitle.openCursor(null, 'next');

		const colors: string[] = [];
		const subColors: string[] = [];
		request.onsuccess = () => {
			const cursor = request.result;
			if (cursor) {
				const data: Data = cursor.value;
				const targetColor = data.color ?? '';
				if (!colors.includes(targetColor)) {
					colors.push(targetColor);
				}
				const targetSubColor = data.subColor ?? '';
				if (!subColors.includes(targetSubColor)) {
					subColors.push(targetSubColor);
				}
				cursor.continue();
			} else {
				resolve({ colors, subColors });
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
	subColor?: string;
	createdAt: Date;
	updatedAt: Date;
};

export type SearchResult = {
	datas: Data[];
	count: number;
};
