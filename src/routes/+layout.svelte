<div class="root">
	<nav>
		<a href="/">Home</a>
	</nav>

	<main>
		<slot />
	</main>
</div>

<style>
	:global(body) {
		margin: 0;
		font-family: sans-serif;
	}
	.root {
		height: 100svh;
	}
	nav {
		height: 50px;
		box-sizing: border-box;
	}
	main {
		height: calc(100% - 50px);
		box-sizing: border-box;
	}
</style>
