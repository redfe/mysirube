<script>
	import Button from '$lib/components/core/Button.svelte';
	import Link from '$lib/components/core/Link.svelte';
	import TextInput from '$lib/components/core/TextInput.svelte';
</script>

<svelte:head><title>Myしるべ：ホーム</title></svelte:head>

<main>
	<h1>Myしるべ</h1>
	<p>歴史年表を作成するアプリケーションです。</p>
	<p>
		作成したデータはブラウザの<Link
			href="https://developer.mozilla.org/ja/docs/Web/API/IndexedDB_API"
			target="_blank"
			rel="noopener noreferrer">IndexedDB</Link
		>に保存されます。
	</p>
	<Button href="/edit" size="l" style={'margin-top:1rem;'}>使ってみる</Button>
</main>

<style>
	main {
		padding: 1rem;
		text-align: center;
		h1 {
			font-size: 3rem;
		}
	}
</style>
