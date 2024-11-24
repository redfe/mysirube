<script lang="ts">
	const { children } = $props();
</script>

<header>
	<nav>
		<a href="/edit">edit</a>
		<a href="/timeline">timeline</a>
	</nav>
</header>

{@render children()}

<style>
	header {
		padding: 0.75rem;
		background-color: cornflowerblue;
		nav {
			display: flex;
			gap: 0.75rem;
		}
	}
</style>
