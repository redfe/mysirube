import { saveData } from './save';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const formData = await request.json();
	return saveData(formData, undefined);
}
