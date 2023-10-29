import database from '$lib/database.js';

/**
 * @typedef {import('$lib/types.d.ts').SaveData} SaveData
 * @typedef {import('$lib/types.d.ts').Data} Data
 * @typedef {import('$lib/types.d.ts').DateOptions} DateOptions
 * @typedef {import('$lib/types.d.ts').Summary} Summary
 * @typedef {import('$lib/dateUtils.js').Level} Level
 */

/**
 * @param {string} id
 * @returns {Data=} data
 */
export function findById(id) {
	return database.findById(id);
}

/**
 * @param {Date} from greater than or equal to
 * @param {Date} to less than
 * @returns {Data[]} datas
 */
export function find(from, to) {
	return database.find(from, to);
}

/**
 * @param {Date[]} datetimes
 * @returns {{datetime:Date, count:number}[]}
 */
export function counts(datetimes) {
	if (!datetimes || datetimes.length < 2) {
		return [];
	}
	const results = [];
	const datas = database.find(datetimes[0], datetimes[datetimes.length - 1]);
	for (let i = 0; i <= datetimes.length; i++) {
		const from = datetimes[i];
		const to = datetimes[i + 1];
		const count = datas.filter((data) => from <= data.datetime && data.datetime < to).length;
		results.push({
			datetime: from,
			count
		});
	}
	return results;
}

/**
 * @param {Date} from
 * @param {Date} to
 * @param {number} offset
 * @param {number} count
 * @returns {Summary[]}
 */
export function summaries(from, to, offset, count) {
	const list = database.find(from, to, offset, count);
	return list.map((data) => ({ id: data.id, datetime: data.datetime, text: data.content }));
}

/**
 * @param {SaveData} data
 */
export function save(data) {
	if (!data.id) {
		database.register({ ...data, id: database.createId() });
	} else {
		database.update({ ...data, id: data.id });
	}
}
