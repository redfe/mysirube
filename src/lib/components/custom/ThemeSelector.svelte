<script module lang="ts">
	export type Props = {
		onclickNew?: () => void;
		onclickClose?: () => void;
		onclickSelect?: (theme: Theme) => void;
		onclickRemove?: (id: string) => void;
		getThemes: () => Promise<Theme[]>;
	};
</script>

<script lang="ts">
	import Button from '$lib/components/core/Button.svelte';
	import Typograph from '$lib/components/core/Typograph.svelte';
	import type { Theme } from '$lib/repository';
	import ThemeDialogBase from '$lib/components/core/DialogBase.svelte';

	let { onclickNew, onclickClose, onclickSelect, onclickRemove, getThemes }: Props = $props();

	let themes: Theme[] = $state([]);

	function reloadThemes(_node: HTMLElement) {
		getThemes().then((r) => {
			themes = r;
		});
	}
</script>

<ThemeDialogBase
	draggables={{ enabled: true, bounds: 'body', axis: 'x' }}
	style={`
	top: 2rem;
	left: calc(100lvw - 40rem - 8rem);
	width: 40rem;
	height: calc(100lvh - 6rem);`}
>
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
					<Button onclick={() => onclickSelect?.(theme)}>選択</Button>
					<Typograph style={`margin-left: 0.5rem;`}>{theme.title}</Typograph>
					<Button onclick={() => onclickRemove?.(theme.id)}>削除</Button>
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
