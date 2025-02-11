<script module lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	export type Props = { on: boolean; disabled?: boolean } & HTMLAttributes<HTMLElement>;
</script>

<script lang="ts">
	let { on: checked = $bindable(false), disabled = false, ...others }: Props = $props();

	function toggle(e: KeyboardEvent) {
		if (!disabled) {
			if (e.key === 'Enter' || e.key === ' ') {
				checked = !checked;
				e.preventDefault();
				e.stopPropagation();
			}
		}
	}
</script>

<label class="switch" {...others}>
	<input type="checkbox" tabindex="-1" bind:checked {disabled} />
	<span class="slider" role="checkbox" tabindex="0" aria-checked={checked} onkeydown={toggle}
	></span>
</label>

<style>
	.switch {
		position: relative;
		display: inline-block;
		width: 3.5rem;
		height: 1.75rem;
	}

	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #ccc;
		transition: 0.4s;
		border-radius: 1.75rem;
	}

	.slider:before {
		position: absolute;
		content: '';
		height: 1.25rem;
		width: 1.25rem;
		left: 4px;
		bottom: 4px;
		background-color: white;
		transition: 0.2s;
		border-radius: 50%;
	}

	input:checked + .slider {
		background-color: #2196f3;
	}

	input:checked + .slider:before {
		transform: translateX(26px);
	}

	input:disabled + .slider {
		background-color: #e6e6e6;
		cursor: not-allowed;
	}
</style>
