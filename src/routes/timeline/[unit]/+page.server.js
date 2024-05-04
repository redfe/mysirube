import { redirect } from '@sveltejs/kit';
import { selectUnit } from '$lib/dateUtils';

export function load({ params }) {
	const unit = selectUnit(params.unit);

	redirect(307, unit.getUrl(new Date()));
}
