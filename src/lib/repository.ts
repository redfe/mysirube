import type { ColorName } from './colors';

export const dbName = 'MySirube';
export const dataStoreName = 'datas';
export const themeStoreName = 'themes';
export const colorSettingsStoreName = 'colorSettings';
export const storeNames = [dataStoreName, themeStoreName, colorSettingsStoreName];
export const version = 1;
const MAX_PER_DISPLAY = 1000;

let database: Promise<IDBDatabase> | null = null;

async function createDatabase(): Promise<IDBDatabase> {
	const createdDatabase: Promise<IDBDatabase> = new Promise((resolve, reject) => {
		const request = indexedDB.open(dbName, version);

		request.onupgradeneeded = () => {
			const db = request.result;
			initStores(db);
		};

		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
	return createdDatabase;
}

export function initDB(): Promise<IDBDatabase> {
	if (!database) {
		database = createDatabase();
	}
	database.then(initStores);
	return database;
}

function initStores(db: IDBDatabase) {
	if (!db.objectStoreNames.contains(dataStoreName)) {
		try {
			createDataStore(db);
		} catch (e) {
			// すでに存在する場合は無視
			console.warn(e);
		}
	}
	if (!db.objectStoreNames.contains(themeStoreName)) {
		try {
			createThemeStore(db);
		} catch (e) {
			// すでに存在する場合は無視
			console.warn(e);
		}
	}

	if (!db.objectStoreNames.contains(colorSettingsStoreName)) {
		let store = null;
		try {
			store = createColorSettingsStore(db);
		} catch (e) {
			console.warn(e);
		}
		if (store) {
			initializeColorSettings(store);
		}
	} else {
		const transaction = db.transaction(colorSettingsStoreName, 'readwrite');
		const store = transaction.objectStore(colorSettingsStoreName);
		const request = store.get('default');
		request.onsuccess = () => {
			if (request.result == null) {
				initializeColorSettings(store);
			}
		};
		request.onerror = () => console.warn(request.error);
	}
}

function createDataStore(db: IDBDatabase): IDBObjectStore {
	const store = db.createObjectStore(dataStoreName, { keyPath: 'id', autoIncrement: false });
	store.createIndex('indexOfStartAndTitle', ['start', 'title'], { unique: false });
	return store;
}

function createThemeStore(db: IDBDatabase): IDBObjectStore {
	const store = db.createObjectStore(themeStoreName, { keyPath: 'id', autoIncrement: false });
	// タイトルでソートして取得できるようにしておく
	store.createIndex('indexOfTitle', ['title'], { unique: false });
	return store;
}

function createColorSettingsStore(db: IDBDatabase): IDBObjectStore {
	const store = db.createObjectStore(colorSettingsStoreName, {
		keyPath: 'id',
		autoIncrement: false
	});
	return store;
}

function initializeColorSettings(store: IDBObjectStore) {
	// 初期データを登録
	const colorSettings: ColorSettings = {
		id: 'default',
		main: {
			white: { description: '全世界' },
			red: { description: '' },
			pink: { description: 'アフリカ' },
			purple: { description: '日本' },
			blue: { description: '欧州' },
			green: { description: '北米' },
			yellowgreen: { description: '中南米' },
			yellow: { description: '' },
			gold: { description: '中東' },
			brown: { description: '大洋州（オーストリア、ニュージーランド、ミクロネシア系）' },
			silver: { description: '' },
			gray: { description: 'アジア' },
			black: { description: '' }
		},
		sub: {
			white: { description: '' },
			red: { description: '争い' },
			pink: { description: '' },
			purple: { description: '' },
			blue: { description: '技術' },
			green: { description: '植民地' },
			yellowgreen: { description: '' },
			yellow: { description: '人物' },
			gold: { description: '' },
			brown: { description: '年代区分' },
			silver: { description: '' },
			gray: { description: '' },
			black: { description: '災害' }
		}
	};
	const request = store.put(colorSettings);
	request.onsuccess = () => {};
}

export async function save(data: Data) {
	const db = await initDB();
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(dataStoreName, 'readwrite');
		const store = transaction.objectStore(dataStoreName);
		const request = store.put(data);

		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}

export async function remove(id: string) {
	const db = await initDB();
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(dataStoreName, 'readwrite');
		const store = transaction.objectStore(dataStoreName);
		const request = store.delete(id);

		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}

export async function getAllCount(storeName: string): Promise<number> {
	const db = await initDB();
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(storeName, 'readonly');
		const store = transaction.objectStore(storeName);
		const request = store.count();
		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}

export async function getAllDataCount(): Promise<number> {
	return getAllCount(dataStoreName);
}

/**
 * options.start 〜 1000件を取得する
 * @returns
 */
export async function search(options?: {
	start?: number;
	colors?: string[];
	subColors?: string[];
	ids?: string[];
	isIncludeOverrap?: boolean; // {start:100} の場合 {start:50, end:150} はヒットする
}): Promise<SearchResult> {
	const db = await initDB();
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(dataStoreName, 'readonly');
		const store = transaction.objectStore(dataStoreName);
		// start でソートされた状態で取得する
		const indexOfStartAndTitle = store.index('indexOfStartAndTitle');
		const countRequest = indexOfStartAndTitle.count();

		const searchResult: SearchResult = { datas: [], count: 0 };
		countRequest.onsuccess = () => {
			const request = indexOfStartAndTitle.openCursor(null, 'next');
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
					const isMatchPeriod =
						options?.start == null ||
						(options?.isIncludeOverrap
							? options.start <= (data.end ?? data.start)
							: options.start <= data.start);
					const isMatchColor = options?.colors == null || options.colors.includes(data.color ?? '');
					const isMatchSubColor =
						options?.subColors == null || options.subColors.includes(data.subColor ?? '');
					const isMatchIds = options?.ids == null || options.ids.includes(data.id);
					if (isMatchPeriod && isMatchColor && isMatchSubColor && isMatchIds) {
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
		const transaction = db.transaction(dataStoreName, 'readonly');
		const store = transaction.objectStore(dataStoreName);
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

export async function getThemeSummaries(): Promise<ThemeSummary[]> {
	const db = await initDB();
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(themeStoreName, 'readonly');
		const store = transaction.objectStore(themeStoreName);
		// title でソートされた状態で取得する
		const indexOfTitle = store.index('indexOfTitle');
		const request = indexOfTitle.getAll();
		request.onsuccess = () =>
			resolve(request.result.map((theme: Theme) => ({ id: theme.id, title: theme.title })));
		request.onerror = () => reject(request.error);
	});
}

export async function getAllThemeCount(): Promise<number> {
	return getAllCount(themeStoreName);
}

export async function getTheme(id: string): Promise<Theme | undefined> {
	const db = await initDB();
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(themeStoreName, 'readonly');
		const store = transaction.objectStore(themeStoreName);
		const request = store.get(id);
		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}

export async function saveTheme(theme: Theme) {
	const db = await initDB();
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(themeStoreName, 'readwrite');
		const store = transaction.objectStore(themeStoreName);
		const request = store.put(theme);

		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}

export async function removeTheme(id: string) {
	const db = await initDB();
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(themeStoreName, 'readwrite');
		const store = transaction.objectStore(themeStoreName);
		const request = store.delete(id);

		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}

export function saveCurrentThemeId(id?: string) {
	if (id == null) {
		localStorage.removeItem('currentThemeId');
	} else {
		localStorage.setItem('currentThemeId', id);
	}
}

export function getCurrentThemeId(): string | null {
	return localStorage.getItem('currentThemeId');
}

export function saveCurrentStartYear(startYear?: number) {
	if (startYear == null) {
		localStorage.removeItem('currentStartYear');
	} else {
		localStorage.setItem('currentStartYear', `${startYear}`);
	}
}

export function getCurrentStartyear(): number | null {
	const val = localStorage.getItem('currentStartYear');
	return val ? Number(val) : null;
}

export async function getColorSettings(): Promise<ColorSettings> {
	const db = await initDB();
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(colorSettingsStoreName, 'readonly');
		const store = transaction.objectStore(colorSettingsStoreName);
		const request = store.get('default');
		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}

export async function saveColorSettings(colorSettings: ColorSettings) {
	const db = await initDB();
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(colorSettingsStoreName, 'readwrite');
		const store = transaction.objectStore(colorSettingsStoreName);
		const updateRequest = store.put(colorSettings);
		updateRequest.onsuccess = () => resolve(updateRequest.result);
		updateRequest.onerror = () => reject(updateRequest.error);
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

export type Theme = {
	id: string;
	title: string;
	dataIds: string[];
	memo?: string;
	createdAt: Date;
	updatedAt: Date;
};

export type Color = {
	id: ColorName;
	description: string;
};

export type ColorSettings = {
	id: string;
	main: Record<ColorName, { description: string }>;
	sub: Record<ColorName, { description: string }>;
};

export type ThemeSummary = { id: string; title: string };

export type SearchResult = { datas: Data[]; count: number };
