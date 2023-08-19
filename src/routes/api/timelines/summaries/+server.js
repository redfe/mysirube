import { json } from '@sveltejs/kit';
import { summaries } from '$lib/timelinesRepository';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	const from = new Date(url.searchParams.get('from') || 0);
	const to = new Date(url.searchParams.get('to') || 0);
	const offset = parseInt(url.searchParams.get('offset') || '0');
	const count = parseInt(url.searchParams.get('count') || '20');
	return json({ summaries: summaries(from, to, offset, count) });
}
