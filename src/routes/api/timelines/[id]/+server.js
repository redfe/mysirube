import { json } from '@sveltejs/kit';
import { findById } from '$lib/timelinesRepository';
import { saveData } from '../save';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
	return json({ data: findById(params.id) });
}

/** @type {import('./$types').RequestHandler} */
export async function PUT({ request, params }) {
	const formData = await request.json();
	return saveData(formData, params.id);
}
