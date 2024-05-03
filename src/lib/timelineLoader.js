import { counts } from '$lib/timelinesRepository.js';

/** @typedef {import("$lib/types").DateOptions} DateOptions */

/**
 * @param {{baseDatetime:Date, thisType:DateOptions, parentType:DateOptions}} args
 * @returns {{start:Date, timelineFrames:{datetime:Date, count:number}[]}}
 */
export const loadTimeline = ({ baseDatetime, thisType, parentType }) => {
	const start = parentType.startOf(baseDatetime);
	const end = thisType.increment(parentType.increment(start, 1), -1);

	/** @type {Date[]} */
	const datetimes = [];
	let current = start;
	while (current <= end) {
		datetimes.push(current);
		current = thisType.increment(current, 1);
	}

	const timelineFrames = counts(datetimes);

	return {
		start,
		timelineFrames
	};
};
