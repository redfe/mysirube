import { json } from '@sveltejs/kit';
import { counts } from '$lib/timelinesRepository';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	const datetimesParam = url.searchParams.get('datetimes');
	const datetimes = datetimesParam?.split(',').map((datetime) => new Date(datetime)) ?? [];
	return json({ counts: counts(datetimes) });
}
