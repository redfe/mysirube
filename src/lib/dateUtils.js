// @ts-check
import { DateTime } from 'luxon';

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
	BySecond: 9
};

/**
 * @typedef {import('$lib/types.js').TimelineUnit} TimelineUnit
 */

export const TZ = 'Asia/Tokyo';
const LC = 'ja-JP';

/**
 * @type {TimelineUnit}
 */
export const by10000Year = {
	level: Level.By10000Year,
	label: '10000年単位',
	increment: (date, inc) =>
		fromJSDate(date)
			.plus({ year: inc * 10000 })
			.toJSDate(),
	startOf: (date, tz) => startOfYear(10000, date, tz),
	getUrl: (date, tz) =>
		`/timeline/${pathName(Level.By10000Year)}/${formatDate(date, undefined, tz)}`,
	getDatetimeAttr: (date, tz) => formatDate(date, 'y', tz),
	getDatetimeLabel: (date, tz, lc) => formatDate(date, 'G y年', tz, lc),
	getDatetimeLabelShort: (date, tz, lc) => formatDate(date, 'y年', tz, lc)
};

/**
 * @type {TimelineUnit}
 */
export const by1000Year = {
	level: Level.By1000Year,
	label: '1000年単位',
	increment: (date, inc) =>
		fromJSDate(date)
			.plus({ year: inc * 1000 })
			.toJSDate(),
	startOf: (date, tz) => startOfYear(1000, date, tz),
	getUrl: (date, tz) =>
		`/timeline/${pathName(Level.By1000Year)}/${formatDate(date, undefined, tz)}`,
	getDatetimeAttr: (date, tz) => formatDate(date, 'y', tz),
	getDatetimeLabel: (date, tz, lc) => formatDate(date, 'G y年', tz, lc),
	getDatetimeLabelShort: (date, tz, lc) => formatDate(date, 'y年', tz, lc)
};

/**
 * @type {TimelineUnit}
 */
export const by100Year = {
	level: Level.By100Year,
	label: '100年単位',
	increment: (date, inc) =>
		fromJSDate(date)
			.plus({ year: inc * 100 })
			.toJSDate(),
	startOf: (date, tz) => startOfYear(100, date, tz),
	getUrl: (date, tz) => `/timeline/${pathName(Level.By100Year)}/${formatDate(date, undefined, tz)}`,
	getDatetimeAttr: (date, tz) => formatDate(date, 'y', tz),
	getDatetimeLabel: (date, tz, lc) => formatDate(date, 'G y年', tz, lc),
	getDatetimeLabelShort: (date, tz, lc) => formatDate(date, 'y年', tz, lc)
};

/**
 * @type {TimelineUnit}
 */
export const by10Year = {
	level: Level.By10Year,
	label: '10年単位',
	increment: (date, inc) =>
		fromJSDate(date)
			.plus({ year: inc * 10 })
			.toJSDate(),
	startOf: (date, tz) => startOfYear(10, date, tz),
	getUrl: (date, tz) => `/timeline/${pathName(Level.By10Year)}/${formatDate(date, undefined, tz)}`,
	getDatetimeAttr: (date, tz) => formatDate(date, 'y', tz),
	getDatetimeLabel: (date, tz, lc) => formatDate(date, 'G y年', tz, lc),
	getDatetimeLabelShort: (date, tz, lc) => formatDate(date, 'y年', tz, lc)
};

/**
 * @type {TimelineUnit}
 */
export const byYear = {
	level: Level.ByYear,
	label: '年単位',
	increment: (date, inc) => fromJSDate(date).plus({ year: inc }).toJSDate(),
	startOf: (date, tz) => fromJSDate(date, tz).startOf('year').toJSDate(),
	getUrl: (date, tz) => `/timeline/${pathName(Level.ByYear)}/${formatDate(date, undefined, tz)}`,
	getDatetimeAttr: (date, tz) => formatDate(date, 'y', tz),
	getDatetimeLabel: (date, tz, lc) => formatDate(date, 'G y年', tz, lc),
	getDatetimeLabelShort: (date, tz, lc) => formatDate(date, 'y年', tz, lc)
};

/**
 * @type {TimelineUnit}
 */
export const byMonth = {
	level: Level.ByMonth,
	label: '月単位',
	increment: (date, inc) => fromJSDate(date).plus({ month: inc }).toJSDate(),
	startOf: (date, tz) => fromJSDate(date, tz).startOf('month').toJSDate(),
	getUrl: (date, tz) => `/timeline/${pathName(Level.ByMonth)}/${formatDate(date, undefined, tz)}`,
	getDatetimeAttr: (date, tz) => formatDate(date, 'y-MM', tz),
	getDatetimeLabel: (date, tz, lc) => formatDate(date, 'G y年M月', tz, lc),
	getDatetimeLabelShort: (date, tz, lc) => formatDate(date, 'M月', tz, lc)
};

/**
 * @type {TimelineUnit}
 */
export const byDay = {
	level: Level.ByDay,
	label: '日単位',
	increment: (date, inc) => fromJSDate(date).plus({ day: inc }).toJSDate(),
	startOf: (date, tz) => fromJSDate(date, tz).startOf('day').toJSDate(),
	getUrl: (date, tz) => `/timeline/${pathName(Level.ByDay)}/${formatDate(date, undefined, tz)}`,
	getDatetimeAttr: (date, tz) => formatDate(date, 'y-MM-dd', tz),
	getDatetimeLabel: (date, tz, lc) => formatDate(date, 'G y年M月d日', tz, lc),
	getDatetimeLabelShort: (date, tz, lc) => formatDate(date, 'd日', tz, lc)
};

/**
 * @type {TimelineUnit}
 */
export const byHour = {
	level: Level.ByHour,
	label: '時間単位',
	increment: (date, inc) => fromJSDate(date).plus({ hour: inc }).toJSDate(),
	startOf: (date, tz) => fromJSDate(date, tz).startOf('hour').toJSDate(),
	getUrl: (date, tz) => `/timeline/${pathName(Level.ByHour)}/${formatDate(date, undefined, tz)}`,
	getDatetimeAttr: (date, tz) => formatDate(date, "y-MM-dd'T'HH", tz),
	getDatetimeLabel: (date, tz, lc) => formatDate(date, 'G y年M月d日 H時', tz, lc),
	getDatetimeLabelShort: (date, tz, lc) => formatDate(date, 'H時', tz, lc)
};

/**
 * @type {TimelineUnit}
 */
export const byMinute = {
	level: Level.ByMinute,
	label: '分単位',
	increment: (date, inc) => fromJSDate(date).plus({ minute: inc }).toJSDate(),
	startOf: (date, tz) => fromJSDate(date, tz).startOf('minute').toJSDate(),
	getUrl: (date, tz) => `/timeline/${pathName(Level.ByMinute)}/${formatDate(date, undefined, tz)}`,
	getDatetimeAttr: (date, tz) => formatDate(date, "y-MM-dd'T'HH:mm", tz),
	getDatetimeLabel: (date, tz, lc) => formatDate(date, 'G y年M月d日 H時m分', tz, lc),
	getDatetimeLabelShort: (date, tz, lc) => formatDate(date, 'm分', tz, lc)
};

/**
 * @type {TimelineUnit}
 */
export const bySecond = {
	level: Level.BySecond,
	label: '秒単位',
	increment: (date, inc) => fromJSDate(date).plus({ second: inc }).toJSDate(),
	startOf: (date, tz) => fromJSDate(date, tz).startOf('second').toJSDate(),
	getUrl: (date, tz) =>
		`/timeline/${pathName(Level.BySecond)}/${formatDate(date, "y-MM-dd'T'HH:mm:ss", tz)}`,
	getDatetimeAttr: (date, tz) => formatDate(date, "y-MM-dd'T'HH:mm:ss", tz),
	getDatetimeLabel: (date, tz, lc) => formatDate(date, 'G y年M月d日 H時m分s秒', tz, lc),
	getDatetimeLabelShort: (date, tz, lc) => formatDate(date, 's秒', tz, lc)
};

/**
 *
 * @param {10|100|1000|10000} interval
 * @param {Date} date
 * @param {string=} tz タイムゾーン (デフォルト: Asia/Tokyo)
 * @returns
 */
const startOfYear = (interval, date, tz) => {
	const temp = byYear.startOf(date, tz);
	const year = temp.getFullYear();
	const decade = Math.floor(year / interval) * interval;
	temp.setFullYear(decade);
	return temp;
};

/**
 * @param {Date} date
 * @returns {boolean}
 */
const isInvalidDate = (date) => {
	return date.toString() === 'Invalid Date';
};

/**
 * @param {Date} date
 * @param {string=} tz タイムゾーン (デフォルト: Asia/Tokyo)
 * @returns {DateTime}
 */
const fromJSDate = (date, tz) => DateTime.fromJSDate(date, { zone: tz ?? TZ });

/**
 * @param {Date} date
 * @param {string=} pattern パターン (デフォルト: ISO8601)
 * @param {string=} tz タイムゾーン (デフォルト: Asia/Tokyo)
 * @param {string=} lc ロケール (デフォルト: ja-JP)
 * @returns {string}
 */
export const formatDate = (date, pattern, tz, lc) => {
	if (isInvalidDate(date)) {
		return '';
	}
	if (!pattern) {
		return date.toISOString();
	} else {
		return fromJSDate(date, tz)
			.setLocale(lc ?? LC)
			.toFormat(pattern);
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
const min = DateTime.fromObject(
	{ year: -271821 + 20000, month: 3, day: 20, hour: 23, minute: 59, second: 59 },
	{ zone: 'UTC' }
).toJSDate();

// 西暦 275760 年 9 月 13 日
const max = DateTime.fromObject(
	{ year: 275760, month: 8, day: 13, hour: 0, minute: 0, second: 0 },
	{ zone: 'UTC' }
).toJSDate();

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

export const timelineUnits = [
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

/**
 * @param {number} level
 */
export const getUnit = (level) => {
	const unit = timelineUnits.find((unit) => unit.level === level);
	if (!unit) {
		throw new Error('unit not found');
	}
	return unit;
};

/**
 * @param {import('$lib/types.js').TimelineUnit} currentUnit
 * @return {import('$lib/types.js').TimelineUnit=}
 */
export const getParentUnit = (currentUnit) => {
	const index = timelineUnits.findIndex((unit) => unit.label === currentUnit.label);
	if (index <= 0) {
		return undefined;
	}
	return timelineUnits[index - 1];
};

/**
 * @param {import('$lib/types.js').TimelineUnit} currentUnit
 * @return {import('$lib/types.js').TimelineUnit=}
 */
export const getChildUnit = (currentUnit) => {
	const index = timelineUnits.findIndex((unit) => unit.label === currentUnit.label);
	if (index < 0 || timelineUnits.length - 1 <= index) {
		return undefined;
	}
	return timelineUnits[index + 1];
};

/**
 *
 * @param {string} label
 * @returns {TimelineUnit=}
 */
export const getDateType = (label) => {
	return timelineUnits.find((dateType) => dateType.label === label);
};

/**
 *
 * @param {TimelineUnit} unit
 * @param {Date} date
 * @returns {string}
 */
export const getListUrl = (unit, date) => `/list/?start=${unit.startOf(date).toISOString()}`;

/**
 *
 * @param {string} unitName
 */
export const selectUnit = (unitName) => {
	const unit = UNIT_MAP[unitName];
	if (!unit) {
		throw new Error('unit not found');
	}
	return unit;
};

/**
 *
 * @param {number} unitLevel
 */
export const getUnitPathName = (unitLevel) => {
	const target = Object.entries(UNIT_MAP).find(([, value]) => {
		return value.level === unitLevel;
	});
	if (target === undefined) {
		throw new Error('unit not found');
	}
	return target[0];
};

const pathName = getUnitPathName;

/**
 * key: URLのパスパラメータの単位名
 *
 * @type {Record<string, TimelineUnit>}
 */
const UNIT_MAP = {
	'10000year': by10000Year,
	'1000year': by1000Year,
	'100year': by100Year,
	'10year': by10Year,
	year: byYear,
	month: byMonth,
	day: byDay,
	hour: byHour,
	minute: byMinute,
	second: bySecond
};
