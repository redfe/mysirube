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

<button bind:this={elm} class={size ?? 'm'} {...others}>{@render children?.()}</button>

<style>
	button {
		display: inline-block;
		text-decoration: none;
		border-radius: 0.25rem;
		background-color: beige;
		color: black;
		font-size: 1rem;
		border: 1px solid silver;
		box-sizing: border-box;
	}
	button:hover:not(:disabled) {
		background-color: bisque;
	}
	button:active:not(:disabled) {
		opacity: 0.7;
	}
	button.s {
		font-size: 0.6rem;
		padding: 0.2rem 0.3rem;
	}
	button.m {
		font-size: 0.8rem;
		padding: 0.25rem 0.5rem;
	}
	button.l {
		font-size: 1.25rem;
		padding: 0.3rem 0.7rem;
	}
	button:disabled {
		opacity: 0.5;
	}
</style>
