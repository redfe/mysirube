<script lang="ts">
	import Link from '$lib/components/core/Link.svelte';
	import { page } from '$app/state';
	import { onNavigate } from '$app/navigation';
	import GitHub from '$lib/images/github-mark.svg?raw';

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
	<div class="left"></div>
	<nav>
		<Link href="#/" current={'' == page.url.hash || '#/' == page.url.hash}>ホーム</Link>
		<Link href="#/edit" current={'#/edit' == page.url.hash}>年表</Link>
		<Link href="#/timeline" current={'#/timeline' == page.url.hash}>タイムライン</Link>
		<Link href="#/export" current={'#/export' == page.url.hash}>エクスポート</Link>
		<Link href="#/import" current={'#/import' == page.url.hash}>インポート</Link>
	</nav>
	<div class="right">
		<Link href="https://github.com/redfe/mysirube" target="_blank" class="noblankicon"
			><img class="icon" alt="GitHub" src="data:image/svg+xml;base64,{btoa(GitHub)}" /></Link
		>
	</div>
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
		flex-direction: column;
		align-items: center;
	}
	header {
		padding: 1rem;
		display: flex;
		justify-content: space-between; /* 左右の要素を端に寄せる */
		nav {
			flex-grow: 1; /* navが中央に配置されるように成長 */
			text-align: center;
			display: flex;
			gap: 2rem;
			justify-content: center;
		}
		.left {
			width: 100px;
		}

		.right {
			width: 100px;
			text-align: right;
		}
		.icon {
			width: 2rem;
			height: 2rem;
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
