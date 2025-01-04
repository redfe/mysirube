<script module lang="ts">
	export type Props = {
		onclickNew?: () => void;
		onclickClose?: () => void;
		onclickSelect?: (theme?: Theme) => void;
		onclickRemove?: (id: string) => void;
		getThemes: () => Promise<Theme[]>;
	};
</script>

<script lang="ts">
	import Button from '$lib/components/core/Button.svelte';
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
	isModal={true}
	style={`
	top: 2rem;
	width: 40rem;
	height: calc(100lvh - 6rem);
	z-index: 2000;
	`}
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
			<li>
				<Button
					onclick={() => onclickSelect?.(undefined)}
					style={`
				width: calc(100% - 4rem);
				text-align: left;
				font-size: 1rem;
				cursor: pointer;
				background-color: transparent;
				border: none;
				`}>選択解除</Button
				>
			</li>
			{#each themes as theme (theme.id)}
				<li>
					<Button
						onclick={() => onclickSelect?.(theme)}
						style={`
						width: calc(100% - 4rem);
						text-align: left;
						font-size: 1rem;
						cursor: pointer;
						background-color: transparent;
						border: none;
						`}>{theme.title}</Button
					>
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
	ul {
		padding: 0 1rem;
	}
	li {
		width: 100%;
		list-style: none;
	}
	li:hover {
		background-color: gainsboro;
	}
</style>
