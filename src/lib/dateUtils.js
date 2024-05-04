// @ts-check

import {
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
import { ja } from 'date-fns/locale';
import { formatInTimeZone, fromZonedTime } from 'date-fns-tz';

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
const LC = ja;

/**
 * @type {TimelineUnit}
 */
export const by10000Year = {
	level: Level.By10000Year,
	label: 'by 10000 years',
	increment: (date, inc) => addYears(date, inc * 10000),
	startOf: (date, tz) =>
		byYear.startOf(setYear(date, Math.floor(getYear(date) / 10000) * 10000), tz),
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
	label: 'by 1000 years',
	increment: (date, inc) => addYears(date, inc * 1000),
	startOf: (date, tz) => byYear.startOf(setYear(date, Math.floor(getYear(date) / 1000) * 1000), tz),
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
	label: 'by 100 years',
	increment: (date, inc) => addYears(date, inc * 100),
	startOf: (date, tz) => byYear.startOf(setYear(date, Math.floor(getYear(date) / 100) * 100), tz),
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
	label: 'by 10 years',
	increment: (date, inc) => addYears(date, inc * 10),
	startOf: (date, tz) => byYear.startOf(setYear(date, Math.floor(getYear(date) / 10) * 10), tz),
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
	label: 'by year',
	increment: (date, inc) => addYears(date, inc),
	startOf: (date, tz) => fromZonedTime(startOfYear(date), tz ?? TZ),
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
	label: 'by month',
	increment: (date, inc) => addMonths(date, inc),
	startOf: (date, tz) => fromZonedTime(startOfMonth(date), tz ?? TZ),
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
	label: 'by day',
	increment: (date, inc) => addDays(date, inc),
	startOf: (date, tz) => fromZonedTime(startOfDay(date), tz ?? TZ),
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
	label: 'by hour',
	increment: (date, inc) => addHours(date, inc),
	startOf: (date, tz) => fromZonedTime(startOfHour(date), tz ?? TZ),
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
	label: 'by minute',
	increment: (date, inc) => addMinutes(date, inc),
	startOf: (date, tz) => fromZonedTime(startOfMinute(date), tz ?? TZ),
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
	label: 'by second',
	increment: (date, inc) => addSeconds(date, inc),
	startOf: (date, tz) => fromZonedTime(startOfSecond(date), tz ?? TZ),
	getUrl: (date, tz) =>
		`/timeline/${pathName(Level.BySecond)}/${formatDate(date, "y-MM-dd'T'HH:mm:ss", tz)}`,
	getDatetimeAttr: (date, tz) => formatDate(date, "y-MM-dd'T'HH:mm:ss", tz),
	getDatetimeLabel: (date, tz, lc) => formatDate(date, 'G y年M月d日 H時m分s秒', tz, lc),
	getDatetimeLabelShort: (date, tz, lc) => formatDate(date, 's秒', tz, lc)
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
 * @param {string=} pattern パターン (デフォルト: ISO8601)
 * @param {string=} tz タイムゾーン (デフォルト: Asia/Tokyo)
 * @param {import('date-fns').Locale=} locale ロケール (デフォルト: ja)
 * @returns {string}
 */
export const formatDate = (date, pattern, tz, locale) => {
	if (isInvalidDate(date)) {
		return '';
	}
	if (!pattern) {
		return date.toISOString();
	} else {
		return formatInTimeZone(date, tz ?? TZ, pattern, { locale: locale ?? LC });
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
