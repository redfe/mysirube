import { error, fail, json } from '@sveltejs/kit';
import { save } from '$lib/timelinesRepository';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const formData = await request.json();

	/** @type {string=} */
	const datetime = formData.datetime;

	/** @type {string=} */
	const content = formData.content;

	/** @type {string=} */
	const tags = formData.tags;

	if (!datetime || !content || !tags) {
		throw error(400, '未入力がありますー。');
	}

	/** @type {import('$lib/types').SaveData} */
	const saveData = {
		datetime: new Date(datetime.toString()),
		content: content.toString(),
		tags: tags
			.toString()
			.split(',')
			.map((tag) => tag.trim())
	};

	save(saveData);
	return json({ success: true });
}
