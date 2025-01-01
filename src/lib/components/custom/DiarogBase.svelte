<script lang="ts">
	import { slide } from 'svelte/transition';
	let { children } = $props();
</script>

<div class="dialog-base" transition:slide>
	{@render children()}
</div>

<style>
	.dialog-base {
		position: fixed;
		top: 2rem;
		right: 2rem;
		width: 40rem;
		height: calc(100lvh - 6rem);
		background-color: white;
		border-radius: 0.25rem;
		padding: 1rem;
		box-shadow: 0 0 10rem -3rem rgba(0, 0, 0, 0.5);
		overflow-y: scroll;
	}
</style>
