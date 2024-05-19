<script>
	import { A } from 'flowbite-svelte';

	/** @type {string=} */
	export let href = '#';

	/** @type {boolean=} */
	export let disabled = false;

	/** @type {string=} */
	export let aClass = 'inline-flex items-center hover:underline';

	/** @type {string=} */
	export let color = 'text-primary-600 dark:text-primary-500';

	/** @type {string} */
	export let title;
</script>

{#if !disabled}
	<A {href} {aClass} {color} on:click {title}><slot /></A>
{:else}
	<div class={aClass + ' ' + color + ' opacity-20'}>
		<slot />
	</div>
{/if}
