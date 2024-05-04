import { selectUnit } from '$lib/dateUtils';
import { loadTimeline } from '$lib/timelineLoader.js';

export async function load({ params }) {
	const unit = selectUnit(params.unit);
	return loadTimeline({
		baseDatetime: new Date(params.datetime),
		unit: unit
	});
}
