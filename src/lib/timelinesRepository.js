import database from '$lib/database.js';
import { dateTypes } from './dateUtils.js';

/**
 * @typedef {import('$lib/types.d.ts').Data} Data
 * @typedef {import('$lib/types.d.ts').DateOptions} DateOptions
 * @typedef {import('$lib/dateUtils.js').Level} Level
 */

/**
 * @param {Date} from greater than or equal to
 * @param {Date} to less than
 * @returns {Data[]} datas
 */
export function find(from, to) {
	return database.find(from, to);
}

/**
 *
 * @param {Date} from
 * @param {Date} to
 * @param {Level} level
 * @returns {{datetime:Date, count:number}[]} summaries
 */
export function counts(from, to, level) {
	const list = database.find(from, to);
	const dateType = getDateType(level);
	const results = [];
	/** @type {Date} */
	let datetime = from;
	while (datetime < to) {
		const next = dateType.increment(datetime, 1);
		const count = list.filter((data) => datetime <= data.datetime && data.datetime < next).length;
		results.push({
			datetime: datetime,
			count
		});
		datetime = next;
	}
	return results;
}

/**
 * @param {Level} level
 * @returns {DateOptions}
 */
function getDateType(level) {
	/** @type {DateOptions | undefined} */
	const dateType = dateTypes.find((dateType) => dateType.level === level);
	if (!dateType) {
		throw new Error(`Invalid level: ${level}`);
	}
	return dateType;
}
