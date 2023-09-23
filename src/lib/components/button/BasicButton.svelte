<script>
	/** @type {'primary' | 'secondary'} */
	export let kind = 'secondary';

	/** @type {'button' | 'submit' | 'reset'} */
	export let type = 'button';
</script>

<button on:click {type} class={kind} {...$$restProps}><slot /></button>

<style>
	.primary {
		background-color: var(--primary-color);
		color: var(--primary-font-color);
	}
	.secondary {
		background-color: var(--secondary-color);
		color: var(--secondary-font-color);
	}
	button {
		width: 100%;
		height: 100%;
		border-radius: var(--basic-border-radius);
		border: var(--basic-border);
		padding: 0;
		margin: 0;
		align-items: center;
		cursor: pointer;
	}
</style>
