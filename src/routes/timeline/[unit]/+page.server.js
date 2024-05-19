import { error, redirect } from '@sveltejs/kit';
import { selectUnit } from '$lib/dateUtils';

export function load({ params }) {
	const unit = selectUnit(params.unit);
	if (!unit) {
		error(404);
	}
	const url = unit.getUrl(new Date());
	if (!url) {
		error(404);
	}
	redirect(307, url);
}
