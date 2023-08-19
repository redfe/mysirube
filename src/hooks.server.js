// @see https://kit.svelte.dev/docs/accessibility#the-lang-attribute
/** @type {import('@sveltejs/kit').Handle} */
export function handle({ event, resolve }) {
	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', 'ja')
	});
}
