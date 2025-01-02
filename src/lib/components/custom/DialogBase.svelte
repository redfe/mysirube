<script lang="ts">
	import { slide } from 'svelte/transition';
	import { draggable } from '@neodrag/svelte';
	let { children } = $props();
</script>

<div
	class="dialog-base"
	transition:slide
	use:draggable={{
		bounds: 'body',
		axis: 'x',
		handle: '.handle'
	}}
>
	<div class="handle"></div>
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
		padding-top: 0;
		box-shadow: 0 0 50rem -2rem rgba(0, 0, 0, 0.5);
		overflow-y: auto;
		z-index: 1000;
	}
	.handle {
		width: 100%;
		height: 1.5rem;
		cursor: ew-resize;
	}
</style>
