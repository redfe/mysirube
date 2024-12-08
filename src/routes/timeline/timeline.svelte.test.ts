import { describe, expect, it } from 'vitest';
import { createLanes, generatePeriods, getUnitPeriod } from './timeline.svelte';

describe('getUnitPeriod', () => {
	it('紀元前開始、紀元前終了', () => {
		const actual = getUnitPeriod(-110, -2, 100);
		// -200〜-101、-100〜-1
		expect(actual).toEqual({ start: -200, end: -100 });
	});
	it('紀元前開始、紀元前終了、開始と終了がピッタリ', () => {
		const actual = getUnitPeriod(-200, -100, 100);
		// -200〜-101、-100〜-1
		expect(actual).toEqual({ start: -200, end: -100 });
	});
	it('紀元前開始、紀元後終了', () => {
		const actual = getUnitPeriod(-110, 270, 100);
		// -200〜-101、-100〜-1、0〜99、100〜199、200〜299
		expect(actual).toEqual({ start: -200, end: 200 });
	});
	it('紀元前開始、紀元後終了、開始と終了がピッタリ', () => {
		const actual = getUnitPeriod(-200, 300, 100);
		// -200〜-101、-100〜-1、0〜99、100〜199、200〜299、300〜399
		expect(actual).toEqual({ start: -200, end: 300 });
	});
	it('紀元後開始、紀元後終了', () => {
		const actual = getUnitPeriod(10, 270, 100);
		// -100〜-1、0〜99、100〜199、200〜299
		expect(actual).toEqual({ start: 0, end: 200 });
	});
	it('紀元後開始、紀元後終了、開始と終了がピッタリ', () => {
		const actual = getUnitPeriod(100, 300, 100);
		// 100〜199、200〜299、300〜399
		expect(actual).toEqual({ start: 100, end: 300 });
	});
});

describe('generatePeriods', () => {
	it('紀元前開始、紀元後終了', () => {
		const actual = generatePeriods(100, [item(-110, -100), item(-50, 30), item(70, 270)]);
		expect(actual).toEqual([-200, -100, 0, 100, 200]);
	});
	it('紀元前開始、紀元後終了、開始と終了がピッタリ', () => {
		const actual = generatePeriods(100, [item(-200, -100), item(-50, 30), item(70, 200)]);
		expect(actual).toEqual([-200, -100, 0, 100, 200]);
	});
});

describe('createLanes', () => {
	it('1レーン', () => {
		const item1 = item(700, 724);
		const item2 = item(725, 770);
		const actual = createLanes(25, [item1, item2]);
		expect(actual).toEqual([[item1, item2]]);
	});
	it('2レーン', () => {
		const item1 = item(710, 710);
		const item2 = item(794, 794);
		const actual = createLanes(100, [item1, item2]);
		expect(actual).toEqual([[item1], [item2]]);
	});
});

function item(start: number, end: number) {
	return {
		id: '',
		start,
		end,
		title: '',
		createdAt: new Date(),
		updatedAt: new Date()
	};
}
