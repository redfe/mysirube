<script lang="ts">
	const { children } = $props();
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
