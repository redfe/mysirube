<script module lang="ts">
	export type Props = {
		isModal?: boolean;
		draggables?: {
			enabled?: boolean;
			axis?: 'x' | 'y' | 'both';
			bounds?: DragOptions['bounds'];
		};
	} & HTMLDialogAttributes;
</script>

<script lang="ts">
	import { draggable, type DragOptions } from '@neodrag/svelte';
	import { onMount } from 'svelte';
	import type { HTMLDialogAttributes } from 'svelte/elements';

	let { isModal, draggables, children, ...others }: Props = $props();
	let dialog: HTMLDialogElement | undefined = $state();
	let handleCursor = $state('auto');

	function draggableWrapper(node: HTMLElement, options?: DragOptions) {
		const { enabled, axis, bounds } = draggables || {};
		if (!enabled) return;
		draggable(node, { ...options, axis, bounds });
	}

	onMount(() => {
		if (dialog) {
			if (isModal) {
				dialog.showModal();
			} else {
				dialog.show();
			}
			handleCursor =
				draggables?.axis === 'x'
					? 'ew-resize'
					: draggables?.axis === 'y'
						? 'ns-resize'
						: draggables?.axis === 'both'
							? 'move'
							: 'auto';
		}
	});
</script>

<dialog
	bind:this={dialog}
	class="dialog-base"
	use:draggableWrapper={{
		handle: '.handle'
	}}
	{...others}
>
	<div class="handle" style={`cursor:${handleCursor};`}></div>
	{@render children?.()}
	<div class="handle" style={`cursor:${handleCursor};`}></div>
</dialog>

<style>
	.dialog-base {
		position: fixed;
		background-color: white;
		border: none;
		border-radius: 0.25rem;
		padding: 0 1rem;
		box-shadow: 0 0 2000rem 0rem rgba(0, 0, 0, 0.5);
	}
	.handle {
		width: 100%;
		height: 1.5rem;
	}
</style>
