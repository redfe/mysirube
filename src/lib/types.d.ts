import { Locale } from 'date-fns';
import type { dataSchema } from './schemas';
import type { z } from 'zod';
import type { Level } from './dateUtils';

export type Data = z.infer<typeof dataSchema>;

export type TimelineUnit = {
	level: Level[keyof Level];
	label: string;
	increment: (date: Date, inc: number) => Date;
	startOf: (date: Date, tz?: string) => Date;
	getUrl: (date: Date, tz?: string) => string | undefined;
	getDatetimeAttr: (date: Date, tz?: string) => string;

	/**
	 * @param date
	 * @param tz タイムゾーン
	 * @param lc ロケール
	 */
	getDatetimeLabel: (date: Date, tz?: string, lc?: string) => string;

	/**
	 * @param date
	 * @param tz タイムゾーン
	 * @param lc ロケール
	 */
	getDatetimeLabelShort: (date: Date, tz?: string, lc?: string) => string;
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
