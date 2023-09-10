export type SaveData = {
	id?: string;
	datetime: Date;
	content: string;
	tags: string[];
};

export type Data = {
	id: string;
} & SaveData;

export type DateOptions = {
	level: Level;
	label: string;
	format: (date: Date) => string;
	increment: (date: Date, inc: number) => Date;
	startOf: (date: Date) => Date;
};

export type DateValue = {
	id: string;
	datetime: Date;
	count: number;
};

export type Summary = {
	id: string;
	datetime: Date;
	text: string;
};
