<script>
	import Button from '$lib/components/Button.svelte';
</script>

<main>
	<h1>Myしるべ</h1>
	<p>自分専用の歴史年表を作成するアプリケーションです。</p>
	<p>
		作成したデータはブラウザの<a
			href="https://developer.mozilla.org/ja/docs/Web/API/IndexedDB_API"
			target="_blank"
			rel="noopener noreferrer">IndexedDB</a
		>に保存されます。
	</p>
	<Button href="/edit" size="l" style={'margin-top:3rem;'}>使ってみる</Button>
</main>

<style>
	main {
		padding: 1rem;
		h1 {
			font-size: 5rem;
		}
	}
</style>
