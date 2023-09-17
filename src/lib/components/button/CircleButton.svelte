<script>
	import BasicButton from '$lib/components/button/BasicButton.svelte';
	/** @type {'primary' | 'secondary'} */
	export let kind = 'secondary';

	/** @type {'button' | 'submit' | 'reset'} */
	export let type = 'button';
</script>

<div>
	<BasicButton on:click {type} {kind}><slot /></BasicButton>
</div>

<style>
	div {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		border: var(--basic-border);
	}
	div > :global(button) {
		border: none;
		border-radius: 50%;
	}
</style>
