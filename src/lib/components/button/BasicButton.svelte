<script>
	/** @type {'primary' | 'secondary'} */
	export let kind = 'secondary';

	/** @type {'button' | 'submit' | 'reset'} */
	export let type = 'button';
</script>

<button on:click {type} class={kind} {...$$restProps}><slot /></button>

<style>
	.primary {
		background-color: var(--color-primary-bg);
		color: var(--color-primary-font);
	}
	.secondary {
		background-color: var(--color-secondary-bg);
		color: var(--color-secondary-font);
	}
	button {
		width: 100%;
		height: 100%;
		border-radius: var(--radius-base-border);
		border: var(--border-base);
		padding: 0;
		margin: 0;
		align-items: center;
		cursor: pointer;
	}
</style>
