import { redirect } from '@sveltejs/kit';
import { formatInTimeZone } from 'date-fns-tz';
import { TZ } from '$lib/dateUtils.js';

export function load() {
	throw redirect(307, `/timeline/day/${formatInTimeZone(new Date(), TZ, 'yyyy-MM-dd')}`);
}
