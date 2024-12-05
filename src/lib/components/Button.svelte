<script module lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	export type Props = { href?: string; size?: 's' | 'm' | 'l' } & HTMLButtonAttributes;
</script>

<script lang="ts">
	let { size, href, children, ...others }: Props = $props();
	let elm: HTMLButtonElement | undefined = $state();
	onMount(() => {
		if (elm && href) {
			elm.addEventListener('click', () => {
				goto(href);
			});
		}
	});
</script>

<button bind:this={elm} class="b {size ?? 'm'}" {...others}>{@render children?.()}</button>

<style>
	.b {
		display: inline-block;
		text-decoration: none;
		border-radius: 0.25rem;
		background-color: beige;
		color: black;
		font-size: 1rem;
		border: 1px solid silver;
		box-sizing: border-box;
	}
	.b:hover:not(:disabled) {
		background-color: bisque;
	}
	.b:active:not(:disabled) {
		background-color: rgb(255, 228, 196, 0.75);
	}
	.b.s {
		font-size: 0.6rem;
		padding: 0.2rem 0.3rem;
	}
	.b.m {
		font-size: 0.8rem;
		padding: 0.25rem 0.5rem;
	}
	.b.l {
		font-size: 1.25rem;
		padding: 0.3rem 0.7rem;
	}
	.b:disabled {
		opacity: 0.5;
	}
</style>
