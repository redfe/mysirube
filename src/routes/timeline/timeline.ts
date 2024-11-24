import type { Data } from '$lib/repository';

export type Item = Data & {
	end: number;
};

/**
 * 枠単位の開始・終了取得
 * 枠内に入るのは unitStart <= year < unitEnd
 *
 * @param start
 * @param end
 * @param unit
 * @returns
 */
export function getUnitPeriod(start: number, end: number, unit: number) {
	const unitStart = Math.floor(start / unit) * unit;
	const unitEnd = Math.floor(end / unit) * unit;
	return {
		start: unitStart,
		end: unitEnd
	};
}

// 表示枠作成
export function generatePeriods(unit: number, items: Item[]): number[] {
	if (items.length === 0) return [];
	const min = items[0].start;
	const max = [...items].sort((a, b) => b.end - a.end)[0].end;
	const displayPeriod = getUnitPeriod(min, max, unit);
	const periods = new Array(Math.abs(displayPeriod.end - displayPeriod.start) / unit + 1);
	for (let i = 0; i < periods.length; i++) {
		periods[i] = displayPeriod.start + i * unit;
	}
	return periods;
}

export function formatYear(y: number) {
	return `${new Intl.NumberFormat().format(y)}年`;
}

export function createLanes(unit: number, items: Item[]) {
	const lanes: Item[][] = [];

	items.forEach((item) => {
		if (lanes.length === 0) {
			lanes.push([]);
		}
		for (const lane of lanes) {
			const last = lane[lane.length - 1];
			if (!last) {
				lane.push(item);
				return;
			} else {
				const laneEndYear = getUnitPeriod(last.start, last.end, unit).end + (unit - 1);
				const unitPeriod = getUnitPeriod(item.start, item.end, unit);
				const itemStart = unitPeriod.start;
				if (laneEndYear < itemStart) {
					lane.push(item);
					return;
				}
			}
		}
		lanes.push([item]);
	});

	return lanes;
}
