<script module lang="ts">
	export type Props = { label: string; startYear?: number; isSave?: boolean; move: () => void };
</script>

<script lang="ts">
	import Button from '$lib/components/core/Button.svelte';
	import TextInput from '$lib/components/core/TextInput.svelte';
	import { getCurrentStartyear, saveCurrentStartYear } from '$lib/repository';
	import { onMount } from 'svelte';

	let { label, startYear = $bindable(), isSave = true, move }: Props = $props();

	const defaultStartYear = startYear ?? getCurrentStartyear();

	const moveCallback = () => {
		move();
		if (isSave) {
			saveCurrentStartYear(startYear);
		}
	};
</script>

<div class="root">
	<form
		onsubmit={(e) => {
			e.preventDefault();
			moveCallback();
		}}
	>
		<TextInput {label} type="number" bind:value={startYear} defaultValue={defaultStartYear} />
		<Button onclick={move}>移動</Button>
	</form>
</div>

<style>
	.root :global input {
		width: 7rem;
		text-align: right;
	}
</style>
