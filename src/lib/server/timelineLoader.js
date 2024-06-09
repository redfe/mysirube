import { counts } from './timelinesRepository.js';
import { getChildUnit } from '../dateUtils';

/** @typedef {import("$lib/types").TimelineUnit} TimelineUnit */

/**
 * @param {{baseDatetime:Date, unit:TimelineUnit}} args
 * @returns {{unitLevel:number, start:Date, timelineFrames:{datetime:Date, count:number, tags:string[]}[]}}
 */
export const loadTimeline = ({ baseDatetime, unit }) => {
	const childUnit = getChildUnit(unit);
	if (!childUnit) {
		throw new Error(`No child unit of :${JSON.stringify(unit)}`);
	}
	const start = unit.startOf(baseDatetime);
	const end = childUnit.increment(unit.increment(start, 1), -1);

	/** @type {Date[]} */
	const datetimes = [];
	let current = start;
	while (current <= end) {
		datetimes.push(current);
		current = childUnit.increment(current, 1);
	}

	const timelineFrames = counts(datetimes);

	return {
		unitLevel: unit.level,
		start,
		timelineFrames
	};
};
