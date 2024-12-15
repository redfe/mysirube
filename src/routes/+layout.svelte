<script lang="ts">
	import Link from '$lib/components/core/Link.svelte';
	import { page } from '$app/stores';
	import { onNavigate } from '$app/navigation';
	const { children } = $props();
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<header>
	<nav>
		<Link href="/" current={'/' == $page.url.pathname}>ホーム</Link>
		<Link href="/edit" current={'/edit' == $page.url.pathname}>年表</Link>
		<Link href="/timeline" current={'/timeline' == $page.url.pathname}>タイムライン</Link>
		<Link href="/export" current={'/export' == $page.url.pathname}>エクスポート</Link>
		<Link href="/import" current={'/import' == $page.url.pathname}>インポート</Link>
	</nav>
</header>

<main>
	{@render children()}
</main>

<style>
	:global body {
		margin: 0;
	}
	main {
		padding: 1rem;
		display: flex;
		justify-content: center;
	}
	header {
		padding: 1rem;
		nav {
			display: flex;
			gap: 2rem;
			justify-content: center;
		}
	}
	:global header {
		a {
			color: black !important;
			text-decoration: none;
		}
		a:hover {
			color: blue !important;
			font-weight: 700;
		}
		.current {
			border-bottom: 2px solid black;
			font-weight: 700;
		}
	}
</style>
