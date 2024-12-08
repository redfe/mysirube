<script module lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	export type Props = HTMLAttributes<HTMLSpanElement>;
</script>

<script lang="ts">
	let { children, ...others }: Props = $props();
</script>

<span {...others}>{@render children?.()}</span>

<style>
	span {
		line-height: 3.25rem;
		vertical-align: middle;
	}
</style>
