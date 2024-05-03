import { byHour, byMinute } from '$lib/dateUtils';
import { loadTimeline } from '$lib/timelineLoader.js';

export async function load({ params }) {
	return loadTimeline({
		baseDatetime: new Date(params.datetime),
		parentType: byHour,
		thisType: byMinute
	});
}
