<script lang="ts">
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
		<a href="/">Top</a>
		<a href="/edit">Edit</a>
		<a href="/timeline">Timeline</a>
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
	}
	header {
		padding: 1rem;
		background-color: cornflowerblue;
		nav {
			display: flex;
			gap: 1rem;
		}
	}
</style>
