<script module lang="ts">
	export type Props = {
		onclickNew: () => void;
		onclickClose: () => void;
		onclickSelect: (theme: Theme) => void;
		reloadThemes: () => void;
		themes: Theme[];
	};
</script>

<script lang="ts">
	import Button from '$lib/components/core/Button.svelte';
	import Typograph from '$lib/components/core/Typograph.svelte';
	import type { Theme } from '$lib/repository';

	import { slide } from 'svelte/transition';
	import ThemeDiarogBase from './DiarogBase.svelte';

	let { onclickNew, onclickClose, onclickSelect, reloadThemes: reload, themes }: Props = $props();

	function reloadThemes(node: Node) {
		$effect(() => {
			node;
			reload();
		});
	}
</script>

<ThemeDiarogBase>
	<div class="header">
		<Button onclick={onclickNew}>新規</Button>
		<Button onclick={onclickClose}>閉じる</Button>
	</div>
	<div>
		<ul use:reloadThemes>
			{#each themes as theme (theme.id)}
				<li>
					<Button onclick={() => onclickSelect(theme)}>編集</Button><Typograph
						style={`margin-left: 0.5rem;`}>{theme.title}</Typograph
					>
				</li>
			{/each}
		</ul>
	</div>
</ThemeDiarogBase>

<style>
	.header {
		display: flex;
		justify-content: space-between;
	}
</style>
