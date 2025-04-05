<script>
	import Button from '$lib/components/core/Button.svelte';
	import Link from '$lib/components/core/Link.svelte';
</script>

<svelte:head><title>Myしるべ：ホーム</title></svelte:head>

<h1>Myしるべ</h1>
<p>歴史年表を作成するアプリケーションです。</p>
<p>
	作成したデータはブラウザの<Link
		href="https://developer.mozilla.org/ja/docs/Web/API/IndexedDB_API"
		target="_blank"
		rel="noopener noreferrer">IndexedDB</Link
	>に保存されます。
</p>
<Button href="#/edit" size="l" style={'margin-top:1rem;'}>使ってみる</Button>
<section class="features">
	<h2>機能</h2>
	<ul>
		<li>リッチエディターでテーマ作成</li>
		<li>テーマごとに年表作成</li>
		<li>タイムラインで表示</li>
		<li>設定した色で絞り込み</li>
		<li>エクスポート</li>
		<li>インポート</li>
	</ul>
</section>

<style>
	* {
		text-align: center;
	}
	h1 {
		font-size: 3rem;
	}
	li {
		text-align: left;
	}
</style>
