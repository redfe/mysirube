import { counts } from '$lib/timelinesRepository.js';
import { getChildUnit } from './dateUtils';

/** @typedef {import("$lib/types").TimelineUnit} TimelineUnit */

/**
 * @param {{baseDatetime:Date, unit:TimelineUnit}} args
 * @returns {{unitLevel:number, start:Date, timelineFrames:{datetime:Date, count:number}[]}}
 */
export const loadTimeline = ({ baseDatetime, unit }) => {
	const childUnit = getChildUnit(unit);
	if (!childUnit) {
		throw new Error('No child unit');
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
