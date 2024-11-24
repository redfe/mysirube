export const generate = (start: number, end: number, size: number) => {
	let seq = 1;
	const maxRange = Math.random() * 100;
	const colors = [
		'red',
		'green',
		'blue',
		'yellow',
		'pink',
		'silver',
		'black',
		'brown',
		'yellowgreen'
	];

	const result = [];
	for (let i = 0; i < size; i++) {
		const from = Math.floor(Math.max(start, start + Math.random() * Math.abs(end - start)));
		const range = Math.min(maxRange, Math.floor(Math.random() * Math.abs(end - from)));
		const to = Math.floor(Math.min(end, from + range));
		result.push({
			id: `${seq++}`,
			start: from,
			end: to,
			title: `こんなことがありました`,
			color: colors[Math.floor(Math.random() * colors.length)]
		});
	}
	return result;
};

let seq = 1;
const _constantItems = [
	{
		id: `${seq++}`,
		start: -15964,
		end: -15891
	},
	{
		id: `${seq++}`,
		start: -15835,
		end: -15762
	},
	{
		id: `${seq++}`,
		start: -15726,
		end: -15653
	}
];

export const constantItems = _constantItems.map((item) => ({
	...item,
	title: `dummy`
}));
