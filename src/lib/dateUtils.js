// @ts-check

import {
	format,
	addYears,
	addMonths,
	addDays,
	addHours,
	addMinutes,
	addSeconds,
	//addMilliseconds,
	getYear,
	setYear,
	startOfYear,
	startOfMonth,
	startOfDay,
	startOfHour,
	startOfMinute,
	startOfSecond
} from 'date-fns';

/**
 * @enum {number}
 */
export const Level = {
	By10000Year: 0,
	By1000Year: 1,
	By100Year: 2,
	By10Year: 3,
	ByYear: 4,
	ByMonth: 5,
	ByDay: 6,
	ByHour: 7,
	ByMinute: 8,
	BySecond: 9,
	ByMillisecond: 10
};

/**
 * @typedef {import('$lib/types.js').DateOptions} DateOptions
 */

/**
 * @param {Date} date
 * @param {() => string} formatFunc
 * @returns {string}
 */
const formatIfValid = (date, formatFunc) => {
	if (isInvalidDate(date)) {
		return '';
	}
	return formatFunc();
};

/**
 * @type {DateOptions}
 */
const by10000Year = {
	level: Level.By10000Year,
	label: 'by 10000 years',
	format: (date) => formatIfValid(date, () => format(date, 'G y年')),
	increment: (date, inc) => addYears(date, inc * 10000),
	startOf: (date) => byYear.startOf(setYear(date, Math.floor(getYear(date) / 10000) * 10000))
};

/**
 * @type {DateOptions}
 */
const by1000Year = {
	level: Level.By1000Year,
	label: 'by 1000 years',
	format: (date) => formatIfValid(date, () => format(date, 'G y年')),
	increment: (date, inc) => addYears(date, inc * 1000),
	startOf: (date) => byYear.startOf(setYear(date, Math.floor(getYear(date) / 1000) * 1000))
};

/**
 * @type {DateOptions}
 */
const by100Year = {
	level: Level.By100Year,
	label: 'by 100 years',
	format: (date) => formatIfValid(date, () => format(date, 'G y年')),
	increment: (date, inc) => addYears(date, inc * 100),
	startOf: (date) => byYear.startOf(setYear(date, Math.floor(getYear(date) / 100) * 100))
};

/**
 * @type {DateOptions}
 */
const by10Year = {
	level: Level.By10Year,
	label: 'by 10 years',
	format: (date) => formatIfValid(date, () => format(date, 'G y年')),
	increment: (date, inc) => addYears(date, inc * 10),
	startOf: (date) => byYear.startOf(setYear(date, Math.floor(getYear(date) / 10) * 10))
};

/**
 * @type {DateOptions}
 */
const byYear = {
	level: Level.ByYear,
	label: 'by year',
	format: (date) => formatIfValid(date, () => format(date, 'G y年')),
	increment: (date, inc) => addYears(date, inc),
	startOf: (date) => startOfYear(date)
};

/**
 * @type {DateOptions}
 */
const byMonth = {
	level: Level.ByMonth,
	label: 'by month',
	format: (date) => formatIfValid(date, () => format(date, 'G y年M月')),
	increment: (date, inc) => addMonths(date, inc),
	startOf: (date) => startOfMonth(date)
};

/**
 * @type {DateOptions}
 */
const byDay = {
	level: Level.ByDay,
	label: 'by day',
	format: (date) => formatIfValid(date, () => format(date, 'G y年M月d日')),
	increment: (date, inc) => addDays(date, inc),
	startOf: (date) => startOfDay(date)
};

/**
 * @type {DateOptions}
 */
const byHour = {
	level: Level.ByHour,
	label: 'by hour',
	format: (date) => formatIfValid(date, () => format(date, 'G y年M月d日 H時')),
	increment: (date, inc) => addHours(date, inc),
	startOf: (date) => startOfHour(date)
};

/**
 * @type {DateOptions}
 */
const byMinute = {
	level: Level.ByMinute,
	label: 'by minute',
	format: (date) => formatIfValid(date, () => format(date, 'G y年M月d日 H時m分')),
	increment: (date, inc) => addMinutes(date, inc),
	startOf: (date) => startOfMinute(date)
};

/**
 * @type {DateOptions}
 */
const bySecond = {
	level: Level.BySecond,
	label: 'by second',
	format: (date) => formatIfValid(date, () => format(date, 'G y年M月d日 H時m分s秒')),
	increment: (date, inc) => addSeconds(date, inc),
	startOf: (date) => startOfSecond(date)
};

/**
 * @type {DateOptions}
 */
// const byMillisecond = {
// 	level: Level.ByMillisecond,
// 	label: 'by millisecond',
// 	format: (date) => formatIfValid(date, () => format(date, 'G y年M月d日 H時m分s.SSS秒')),
// 	increment: addMilliseconds,
// 	startOf: (date) => date
// };

/**
 * @param {Date} date
 * @returns {boolean}
 */
const isInvalidDate = (date) => {
	return date.toString() === 'Invalid Date';
};

/**
 * @type {(date:Date, pattern?:string) => string}
 * @returns {string}
 */
export const formatDate = (date, pattern) => {
	if (isInvalidDate(date)) {
		return '';
	}
	if (!pattern) {
		return date.toISOString();
	} else {
		return format(date, pattern);
	}
};

/**
 *
 * @param {string=} formatted
 * @returns {Date}
 */
export const parseDate = (formatted) => {
	if (!formatted) throw new Error('formatted is required');
	return new Date(formatted);
};

// 紀元前 271821 年 4 月 20 日
// 小さい範囲から大きい範囲に変更したときに Invalid Date になるのを予防するため 20000 年足しておく。
const min = new Date(-271821 + 20000, 3, 20, 23, 59, 59);

// 紀元 275760 年 9 月 13 日
const max = new Date(275760, 8, 13, 0, 0, 0);

/**
 * @param {Date} date
 * @returns {boolean}
 */
export const isOverPrevious = (date) => {
	if (isInvalidDate(date)) {
		return true;
	}
	return date < min;
};

/**
 * @param {Date} date
 * @returns {boolean}
 */
export const isOverNext = (date) => {
	if (isInvalidDate(date)) {
		return true;
	}
	return max < date;
};

export const dateTypes = [
	by10000Year,
	by1000Year,
	by100Year,
	by10Year,
	byYear,
	byMonth,
	byDay,
	byHour,
	byMinute,
	bySecond
];
