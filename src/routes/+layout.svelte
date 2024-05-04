<script>
	import './style.css';
</script>

<svelte:head>
	<title>My Sirube</title>
</svelte:head>

<div class="root">
	<nav>
		<div class="left">
			<a href="/" data-sveltekit-reload>Home</a>
		</div>
		<div class="center" />
		<div class="right">
			<button class="search">🔍</button>
			<a href="/">Login</a>
			<a href="/">Signup</a>
		</div>
	</nav>
	<main>
		<slot />
	</main>
	<footer>
		<p>© 2024 My Sirube</p>
	</footer>
</div>

<style>
	:global(body) {
		margin: 0;
		font-family: sans-serif;
	}
	nav {
		height: 50px;
		width: 100%;
		box-sizing: border-box;
		background-color: rgb(22, 18, 144);
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
	nav .search {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		font-size: 1rem;
		border: none;
		background-color: efefef;
		cursor: pointer;
	}
	main {
		height: calc(100% - 50px);
		box-sizing: border-box;
		padding: 2rem;
	}
	footer {
		margin-top: 5rem;
		height: 50px;
		width: 100%;
		box-sizing: border-box;
		background-color: rgb(22, 18, 144);
		color: white;
		padding: 10px;
		box-shadow: 0 0 80px 20px rgba(255, 255, 255, 0.3);
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
