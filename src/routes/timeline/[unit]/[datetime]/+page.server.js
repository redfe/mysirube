import { isInvalidDate, selectUnit } from '$lib/dateUtils';
import { loadTimeline } from '$lib/server/timelineLoader.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const unit = selectUnit(params.unit);
	if (!unit) {
		error(404);
	}
	const datetime = new Date(params.datetime);
	if (isInvalidDate(datetime)) {
		error(404);
	}
	return loadTimeline({
		baseDatetime: new Date(params.datetime),
		unit: unit
	});
}
