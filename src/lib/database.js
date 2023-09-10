import { exec } from 'child_process';
import { randomUUID } from 'crypto';
import { readFileSync, writeFileSync } from 'fs';

const DUMMY_DATA_FILE = './.dev/dummy_data.json';

/**
 * @type {Data[]}
 */
let datas;

/**
 * @returns {Data[]} datas
 */
function getDatas() {
	if (!datas || datas.length === 0) {
		try {
			datas = JSON.parse(readFileSync(DUMMY_DATA_FILE, 'utf-8'));
			datas = datas.map((data) => ({ ...data, datetime: new Date(data.datetime) }));
		} catch (error) {
			datas = createDummyDatas();
			// 書き込み
			exec(`mkdir -p "$(dirname "${DUMMY_DATA_FILE}")" && touch  "${DUMMY_DATA_FILE}"`, () => {
				writeFileSync(DUMMY_DATA_FILE, JSON.stringify(datas));
			});
		}
	}
	return datas;
}

/**
 * @param {number} min
 * @param {number} max
 * @returns
 */
function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max + 1 - min)) + min;
}
/**
 * @returns {Date} date
 */
function getRandomDate() {
	const now = new Date();
	const [minYear, maxYear] =
		Math.random() < 0.9 ? [0, now.getFullYear() + 10] : [now.getFullYear(), now.getFullYear()];
	const year = getRandomNumber(minYear, maxYear); // 0から2020の範囲で年を生成
	const month = getRandomNumber(1, 12); // 1から12の範囲で月を生成
	const day = getRandomNumber(1, 28); // 1から28の範囲で日を生成
	const hour = getRandomNumber(0, 23); // 0から23の範囲で時を生成
	const minute = getRandomNumber(0, 59); // 0から59の範囲で分を生成
	const second = getRandomNumber(0, 59); // 0から59の範囲で秒を生成
	const milliSecond = getRandomNumber(0, 999); // 0から999の範囲で秒を生成

	const datetime = new Date(year, month - 1, day, hour, minute, second, milliSecond);
	return datetime;
}

/**
 * @param {number} min
 * @param {number} max
 * @returns {string}
 */
function getRandomText(min, max) {
	const possibleChars =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ' +
		'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン一二三四五六七八九十百千万円';
	const textLength = Math.floor(Math.random() * (max - min + 1)) + min;
	let randomText = '';

	for (let i = 0; i < textLength; i++) {
		const randomCharIndex = Math.floor(Math.random() * possibleChars.length);
		const randomChar = possibleChars.charAt(randomCharIndex);
		randomText += randomChar;
	}

	return randomText;
}

const dummyTags = [
	'歴史',
	'文学',
	'小説',
	'漫画',
	'アニメ',
	'ゲーム',
	'プログラミング',
	'映画',
	'音楽',
	'スポーツ',
	'日記',
	'メモ',
	'音楽'
];

/**
 *
 * @returns {string[]}
 */
function getDummyTags() {
	const count = getRandomNumber(1, 5);
	const tags = [];
	for (let i = 0; i < count; i++) {
		const index = getRandomNumber(0, dummyTags.length - 1);
		tags.push(dummyTags[index]);
	}
	return [...new Set(tags)];
}

/**
 * @returns {Data[]} datas
 */
function createDummyDatas() {
	const datas = [];
	for (let i = 0; i < 2000; i++) {
		const id = 'dummy_' + i.toString().padStart(3, '0'); // 3桁の0埋めIDを生成

		const data = {
			id: id,
			datetime: getRandomDate(),
			content: getRandomText(20, 100),
			tags: getDummyTags()
		};
		datas.push(data);
	}
	return datas;
}

/**
 * @typedef {import('$lib/types.d.ts').Data} Data
 */

/**
 * @param {Date} from inclusive
 * @param {Date} to exclusive
 * @param {number=} offset
 * @param {number=} count
 * @returns {Data[]} datas
 */
function find(from, to, offset, count) {
	if (!offset) {
		offset = 0;
	}
	const results = getDatas()
		.filter((data) => {
			const date = new Date(data.datetime);
			return from <= date && date < to;
		})
		.sort((a, b) => {
			return a.datetime > b.datetime ? 1 : -1;
		});
	if (!count) {
		return results.slice(offset);
	} else {
		return results.slice(offset, offset + count);
	}
}

/**
 * @param {Data} data
 */
function register(data) {
	const datas = getDatas();
	datas.push(data);
	writeFileSync(DUMMY_DATA_FILE, JSON.stringify(datas));
}

/**
 * @param {Data} data
 */
function update(data) {
	const datas = getDatas();
	datas.push(data);
}

/**
 * @param {string} id
 */
function remove(id) {
	const datas = getDatas();
	const index = datas.findIndex((data) => data.id === id);
	if (index !== -1) {
		datas.splice(index, 1);
	}
}

function createId() {
	return randomUUID();
}

export default { find, register, update, remove, createId };
