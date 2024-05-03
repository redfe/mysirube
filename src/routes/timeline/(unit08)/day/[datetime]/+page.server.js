import { byDay, byHour } from '$lib/dateUtils';
import { loadTimeline } from '$lib/timelineLoader.js';

export async function load({ params }) {
	return loadTimeline({
		baseDatetime: new Date(params.datetime),
		parentType: byDay,
		thisType: byHour
	});
}
