const datas = [
	{
		id: '000',
		datetime: new Date('2023-07-01 00:00:00'),
		content: 'あいうえお',
		tags: ['tag1', 'tag2']
	},
	{
		id: '001',
		datetime: new Date('2023-08-20 00:00:00'),
		content: 'あいうえお',
		tags: ['tag1', 'tag2']
	},
	{
		id: '002',
		datetime: new Date('2023-08-21 00:00:00'),
		content: 'あいうえお',
		tags: ['tag1', 'tag2']
	},
	{
		id: '003',
		datetime: new Date('2023-08-21 21:03:45'),
		content: 'あいうえお',
		tags: ['tag1', 'tag2']
	}
];

/**
 * @typedef {import('./types.d.ts').Data} Data
 */

/**
 * @param {Date} from inclusive
 * @param {Date} to exclusive
 * @returns {Data[]} datas
 */
function find(from, to) {
	return datas.filter((data) => {
		const date = new Date(data.datetime);
		return from <= date && date < to;
	});
}

export default { find };
