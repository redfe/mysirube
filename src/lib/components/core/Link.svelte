<script module lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	export type Props = { href?: string; current?: boolean } & HTMLAnchorAttributes;
</script>

<script lang="ts">
	let { href, current, children, ...others }: Props = $props();
</script>

<a {href} class:current {...others}>{@render children?.()}</a>

<style>
	a {
		color: blue;
	}
	a:hover {
		color: darkblue;
	}
	a:visited {
		color: darkblue;
	}
	a[target='_blank']:not(.noblankicon)::after {
		content: '';
		display: inline-block;
		width: 18px;
		height: 18px;
		background: currentColor;
		mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6" /><path d="M12 12L21 3" /><rect x="7" y="7" width="10" height="10" rx="2" ry="2" /></svg>')
			no-repeat center / contain;
		-webkit-mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6" /><path d="M12 12L21 3" /><rect x="7" y="7" width="10" height="10" rx="2" ry="2" /></svg>')
			no-repeat center / contain;
	}
</style>
