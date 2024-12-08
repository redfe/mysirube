<script module lang="ts">
	export type Props = { label: string; startYear?: number; move: () => void };
</script>

<script lang="ts">
	import Button from '$lib/components/core/Button.svelte';
	import TextInput from '$lib/components/core/TextInput.svelte';

	let { label, startYear = $bindable(), move }: Props = $props();
</script>

<div class="root">
	<TextInput {label} type="number" bind:value={startYear} />
	<Button onclick={move}>移動</Button>
</div>

<style>
	.root :global input {
		width: 7rem;
		text-align: right;
	}
</style>
