import { Locale } from 'date-fns';

export type SaveData = {
	id?: string;
	datetime: Date;
	content: string;
	tags: string[];
};

export type Data = {
	id: string;
} & SaveData;

export type TimelineUnit = {
	level: Level;
	label: string;
	increment: (date: Date, inc: number) => Date;
	startOf: (date: Date, tz?: string) => Date;
	getUrl: (date: Date, tz?: string) => string;
	getDatetimeAttr: (date: Date, tz?: string) => string;

	/**
	 * @param date
	 * @param tz タイムゾーン
	 * @param lc ロケール
	 */
	getDatetimeLabel: (date: Date, tz?: string, lc?: Locale) => string;
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
