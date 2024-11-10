export const generate = (start: number, end: number, size: number) => {
	let seq = 1;
	const maxRange = Math.random() * 100;

	const result = [];
	for (let i = 0; i < size; i++) {
		const from = Math.floor(Math.max(start, start + Math.random() * Math.abs(end - start)));
		const range = Math.min(maxRange, Math.floor(Math.random() * Math.abs(end - from)));
		const to = Math.floor(Math.min(end, from + range));
		result.push({
			id: seq++,
			start: from,
			end: to,
			title: `${from},${to}`
		});
	}
	return result;
};

let seq = 1;
const _constantItems = [
	{
		id: seq++,
		start: -300,
		end: -99
	},
	{
		id: seq++,
		start: -10,
		end: 30
	},
	{
		id: seq++,
		start: -1000,
		end: -500
	}
];

export const constantItems = _constantItems.map((item) => ({
	...item,
	title: `${item.start}:${item.end}`
}));
