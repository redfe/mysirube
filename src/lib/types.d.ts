export type Data = {
	id: string;
	datetime: Date;
	content: string;
	tags: string[];
};

export enum Level {
	By10000Year,
	By1000Year,
	By100Year,
	By10Year,
	ByYear,
	ByMonth,
	ByDay,
	ByHour,
	ByMinute,
	BySecond,
	ByMillisecond
}

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
