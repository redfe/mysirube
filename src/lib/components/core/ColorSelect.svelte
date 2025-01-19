<script module lang="ts">
	import { cubicInOut } from 'svelte/easing';
	import type { HTMLAttributes } from 'svelte/elements';
	import { scale } from 'svelte/transition';

	export type Props = {
		label: string;
		value?: string;
		axis?: 'y' | 'x';
	} & HTMLAttributes<HTMLElement>;

	let current: HTMLElement | undefined = $state();
</script>

<script lang="ts">
	let { label, value = $bindable(), axis, ...others }: Props = $props();
	const id = crypto.randomUUID();
	const colors = [
		'white',
		'red',
		'pink',
		'purple',
		'blue',
		'green',
		'yellowgreen',
		'yellow',
		'gold',
		'brown',
		'silver',
		'gray',
		'black'
	];

	let selectElm: HTMLElement | undefined = $state();

	function isParent(elm: HTMLElement, target: HTMLElement) {
		if (!elm.parentElement) {
			return false;
		}
		if (elm.parentElement === target) {
			return true;
		}
		return isParent(elm.parentElement, target);
	}

	function close() {
		current = undefined;
	}
</script>

<svelte:window
	onclick={(e) => {
		if ((e.target as any)['tagName'] === 'BUTTON') {
			if (!selectElm) return;
			const elm = e.target as HTMLElement;
			if (elm === selectElm) {
				return;
			}
			if (isParent(elm, selectElm)) {
				return;
			}
			if (elm.classList.contains('select-selected')) {
				return;
			}
		}
		close();
	}}
	onkeydown={(e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			close();
		}
	}}
/>

<div class="custom-select" {id} {...others} bind:this={selectElm}>
	<button
		aria-label={label}
		class="select-selected"
		onclick={() => {
			if (current === selectElm) {
				current = undefined;
			} else {
				current = selectElm;
			}
		}}
		style:background-color={value}
	></button>
	{#if selectElm != null && current === selectElm}
		<div
			class="select-items"
			transition:scale={{ duration: 100, easing: cubicInOut }}
			style={`
			margin-left: ${axis === 'y' ? '' : '1.85rem'};
			margin-top: ${axis === 'y' ? '0.25rem' : ''};
			top: ${axis === 'y' ? ';' : '0.25rem'};
			flex-direction: ${axis === 'y' ? 'column' : 'row'};
			`}
		>
			{#each colors as color (color)}
				<button
					aria-label={color}
					class={color}
					data-value={color}
					style:background-color={color}
					onclick={() => (value = color)}
				></button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.custom-select {
		position: relative;
		display: inline-block;
	}
	.select-selected {
		border: 1px solid silver;
		padding: 0.75rem;
		cursor: pointer;
		border-radius: 4px;
		background-color: white;
	}
	.select-items {
		position: absolute;
		border: 1px solid silver;
		border-radius: 0.25rem;
		z-index: 1;
		box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.5);
		display: flex;
		background-color: white;
	}
	.select-items button {
		opacity: 0.8;
		padding: 0.75rem;
		border: none;
		margin: 0;
		cursor: pointer;
		box-sizing: border-box;
		transform: scale(0.8);
		border: 1px solid rgba(0, 0, 0, 0.3);
		transition: transform 0.25s;
	}
	.select-items button:hover,
	.select-items button:focus {
		transform: scale(1);
	}
</style>
