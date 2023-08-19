import { json } from '@sveltejs/kit';
import { counts } from '$lib/timelinesRepository';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	const from = new Date(url.searchParams.get('from') || 0);
	const to = new Date(url.searchParams.get('to') || 0);
	const level = parseInt(url.searchParams.get('level') || '6');
	return json({ counts: counts(from, to, level) });
}
