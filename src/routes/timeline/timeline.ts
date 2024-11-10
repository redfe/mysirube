export type ItemType = {
	id: number;
	start: number;
	end: number;
	title?: string;
};

// 枠単位の開始・終了取得
export function getUnitPeriod(start: number, end: number, unit: number) {
	let unitStart = Math.floor(start / unit) * unit;
	let unitEnd = Math.floor(end / unit) * unit;
	if (unitStart !== start && start < 0) {
		unitStart = unitStart - unit;
	}
	if (unitEnd !== end && end > 0) {
		unitEnd = unitEnd + unit;
	} else if (unitEnd === end) {
		unitEnd = unitEnd + unit;
	}
	return {
		start: unitStart,
		end: unitEnd
	};
}

// 表示枠作成
export function generatePeriods(unit: number, items: ItemType[]) {
	const min = items[0].start;
	const max = [...items].sort((a, b) => b.end - a.end)[0].end;
	const displayPeriod = getUnitPeriod(min, max, unit);
	const periods = new Array(Math.abs(displayPeriod.end - displayPeriod.start) / unit + 1);
	for (let i = 0; i < periods.length; i++) {
		periods[i] = displayPeriod.start + i * unit;
	}
	return periods;
}
