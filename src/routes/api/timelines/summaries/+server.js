import { json } from '@sveltejs/kit';
import { summaries } from '$lib/timelinesRepository';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	const from = new Date(url.searchParams.get('from') || 0);
	const to = new Date(url.searchParams.get('to') || 0);
	return json({ counts: summaries(from, to) });
}
