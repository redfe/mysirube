export const colors = [
	'white',
	'red',
	'pink',
	'purple',
	'blue',
	'green',
	'yellowgreen',
	'yellow',
	'gold',
	'brown',
	'silver',
	'gray',
	'black'
] as const;

export type ColorName = (typeof colors)[number];
