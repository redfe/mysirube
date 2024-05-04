import { redirect } from '@sveltejs/kit';
import { byDay } from '$lib/dateUtils.js';

export function load() {
	throw redirect(307, byDay.getUrl(new Date()));
}
