<svelte:head>
	<title>My Sirube</title>
</svelte:head>

<div class="root">
	<div class="nav-dummy" />
	<main>
		<slot />
	</main>
	<nav>
		<div class="left">
			<a href="/">Home</a>
			<button>🔍</button>
		</div>
		<div class="center">
			<button class="add">+</button>
		</div>
		<div class="right">
			<a href="/">Login</a>
			<a href="/">Signup</a>
		</div>
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
		box-shadow: 0 0 80px 20px rgba(255, 255, 255, 0.3);
		display: flex;
	}
	nav a {
		color: white;
	}
	nav a:visited {
		color: white;
	}
	nav .center {
		flex-grow: 1;
		display: flex;
		justify-content: center;
	}
	nav .add {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		font-size: 1.3rem;
		border: none;
		background-color: rgba(255, 255, 255, 0.8);
		cursor: pointer;
	}
	main {
		height: calc(100% - 50px);
		box-sizing: border-box;
		background-image: url(/actionvance-t7EL2iG3jMc-unsplash.jpg);
	}
</style>
