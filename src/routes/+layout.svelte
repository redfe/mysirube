<script lang="ts">
	import Link from '$lib/components/core/Link.svelte';
	import { page } from '$app/state';
	import { onNavigate, afterNavigate } from '$app/navigation';
	import GitHub from '$lib/images/github-mark.svg?raw';

	const { children } = $props();

	const navs = [
		{ href: '#/', label: 'ホーム' },
		{ href: '#/edit', label: '年表' },
		{ href: '#/timeline', label: 'タイムライン' },
		{ href: '#/export', label: 'エクスポート' },
		{ href: '#/import', label: 'インポート' },
		{ href: '#/color', label: '色設定' }
	];

	const navElms: HTMLElement[] = new Array(navs.length);
	let underlineElm: HTMLElement | undefined = $state();

	afterNavigate(() => {
		navElms.forEach((elm) => {
			if (elm.classList.contains('current')) {
				if (!underlineElm) return;
				underlineElm.style.transform = `translateX(${elm.offsetLeft - navElms[0].offsetLeft}px)`;
				underlineElm.style.width = `${elm.offsetWidth}px`;
			}
		});
	});

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	function isCurrent(href: string) {
		if (page.url.hash === '' && href === '#/') return true;
		return page.url.hash == href;
	}
</script>

<header>
	<div class="left"></div>
	<nav>
		<ul>
			{#each navs as n, i (i)}
				<li bind:this={navElms[i]} class:current={isCurrent(n.href)}>
					<Link href={n.href}>{n.label}</Link>
				</li>
			{/each}
		</ul>
		<div class="underline" bind:this={underlineElm}></div>
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
			ul {
				margin: 0;
				padding-left: 0;
				flex-grow: 1; /* navが中央に配置されるように成長 */
				text-align: center;
				display: flex;
				gap: 2rem;
				justify-content: center;
				list-style: none;
			}
			.current {
				font-weight: 700;
			}
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
	}
	.underline {
		margin-top: 0.25rem;
		height: 2px;
		width: 0;
		background-color: black;
		transition: transform 0.3s ease;
	}
</style>
