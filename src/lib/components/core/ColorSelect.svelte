<script module lang="ts">
	import { colors, type ColorName } from '$lib/colors';
	import { getColorSettings, type ColorSettings } from '$lib/repository';
	import { cubicInOut } from 'svelte/easing';
	import type { HTMLAttributes } from 'svelte/elements';
	import { scale } from 'svelte/transition';

	export type Props = {
		label: string;
		value?: string;
		axis?: 'y' | 'x';
		type?: 'main' | 'sub';
		onselect?: (color: ColorName | undefined) => void;
		colorSettingsLoader?: Promise<ColorSettings>;
	} & HTMLAttributes<HTMLElement>;

	let current: HTMLElement | undefined = $state();
</script>

<script lang="ts">
	let {
		label,
		value = $bindable(),
		axis,
		type = 'main',
		onselect,
		colorSettingsLoader,
		...others
	}: Props = $props();
	const id = crypto.randomUUID();

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

	function description(color: ColorName, colorSetting?: ColorSettings) {
		return colorSetting?.[type][color].description;
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

{#await colorSettingsLoader then colorSetting}
	<div class="custom-select" {id} {...others} bind:this={selectElm}>
		<button
			aria-label={description((value as ColorName) ?? 'white', colorSetting)}
			title={description((value as ColorName) ?? 'white', colorSetting)}
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
						aria-label={description(color, colorSetting)}
						title={description(color, colorSetting)}
						class={color}
						data-value={color}
						style:background-color={color}
						onclick={() => {
							value = color;
							onselect?.(color);
							close();
						}}
					></button>
				{/each}
			</div>
		{/if}
	</div>
{/await}

<style>
	.custom-select {
		position: relative;
		display: inline-block;
		button {
			opacity: 0.7;
		}
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
		opacity: 0.7;
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
