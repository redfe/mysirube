<svelte:head>
	<title>My Sirube</title>
</svelte:head>

<div class="root">
	<div class="nav-dummy" />
	<main>
		<slot />
	</main>
	<nav>
		<a href="/">Home</a>
		<button>🔍</button>
	</nav>
</div>

<style>
	:global(body) {
		margin: 0;
		font-family: sans-serif;
	}
	.root {
		height: 100svh;
	}
	.nav-dummy {
		height: 50px;
		box-sizing: border-box;
	}
	nav {
		position: absolute;
		top: 0;
		height: 50px;
		width: 100%;
		box-sizing: border-box;
		background-color: black;
		color: white;
		padding: 10px;
		box-shadow: 0 -20px 80px rgba(255, 255, 255, 0.3);
	}
	nav a:visited {
		color: white;
	}
	main {
		height: calc(100% - 50px);
		box-sizing: border-box;
		background-image: url(/actionvance-t7EL2iG3jMc-unsplash.jpg);
	}
</style>
