<script module lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	export type Props = { label: string } & HTMLInputAttributes;
</script>

<script lang="ts">
	let { label, value = $bindable(), ...others }: Props = $props();
	const id = crypto.randomUUID();
</script>

<div class="text-field">
	<input type="text" {id} bind:value {...others} placeholder="" />
	<label for={id}>{label}</label>
</div>

<style>
	.text-field {
		display: inline-block;
		position: relative;
		margin: 0.5rem 0;
		box-sizing: border-box;
	}
	.text-field input {
		padding: 0.5rem 0.25rem;
		font-size: 1rem;
		border: 1px solid silver;
		border-radius: 4px;
		box-sizing: border-box;
		line-height: 1.25rem;
	}
	.text-field label {
		top: 0.45rem;
		left: 0.5rem;
		position: absolute;
		font-size: 1rem;
		color: dimgray;
		pointer-events: none;
		transition: 0.2s ease all;
	}
	.text-field input:focus + label,
	.text-field input:not(:placeholder-shown) + label {
		top: 0;
		left: 10px;
		font-size: 0.8rem;
		padding: 0 5px;
		color: black;
		transform: translateY(-50%);
		background-color: white;
	}
</style>
