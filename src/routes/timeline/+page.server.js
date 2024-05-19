import { error, redirect } from '@sveltejs/kit';
import { byDay } from '$lib/dateUtils.js';

export function load() {
	const url = byDay.getUrl(new Date());
	if (!url) {
		error(404);
	}
	redirect(307, url);
}
