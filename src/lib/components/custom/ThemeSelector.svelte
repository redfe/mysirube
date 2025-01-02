<script module lang="ts">
	export type Props = {
		onclickNew?: () => void;
		onclickClose?: () => void;
		onclickSelect?: (theme: Theme) => void;
		getThemes: () => Promise<Theme[]>;
	};
</script>

<script lang="ts">
	import Button from '$lib/components/core/Button.svelte';
	import Typograph from '$lib/components/core/Typograph.svelte';
	import type { Theme } from '$lib/repository';

	import ThemeDialogBase from './DialogBase.svelte';

	let { onclickNew, onclickClose, onclickSelect, getThemes }: Props = $props();

	let themes: Theme[] = $state([]);

	function reloadThemes(_node: HTMLElement) {
		getThemes().then((r) => {
			themes = r;
		});
	}
</script>

<ThemeDialogBase>
	<div class="header">
		{#if onclickNew}
			<Button onclick={onclickNew}>新規</Button>
		{:else}
			<div></div>
		{/if}
		<Button onclick={onclickClose}>閉じる</Button>
	</div>
	<div>
		<ul use:reloadThemes>
			{#each themes as theme (theme.id)}
				<li>
					<Button onclick={() => onclickSelect?.(theme)}>選択</Button><Typograph
						style={`margin-left: 0.5rem;`}>{theme.title}</Typograph
					>
				</li>
			{/each}
		</ul>
	</div>
</ThemeDialogBase>

<style>
	.header {
		display: flex;
		justify-content: space-between;
	}
	li {
		list-style: none;
	}
</style>
