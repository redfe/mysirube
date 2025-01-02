<script module lang="ts">
	import Button from '$lib/components/core/Button.svelte';
	import TextInput from '$lib/components/core/TextInput.svelte';
	import Typograph from '$lib/components/core/Typograph.svelte';
	import type { Theme } from '$lib/repository';

	export type Props = {
		onclickClose?: () => void;
		onclickRemove?: () => void;
		theme: Theme;
	};
</script>

<script lang="ts">
	import ThemeDialogBase from './DialogBase.svelte';
	let { onclickClose, onclickRemove, theme } = $props();
</script>

<ThemeDialogBase>
	<div class="header">
		<TextInput label="テーマ名" bind:value={theme.title} style={`width: 20rem;`} />
		<div>
			<Typograph></Typograph>
			<Button onclick={onclickClose}>閉じる</Button>
		</div>
	</div>
	<textarea
		style={`line-height:1.25rem;padding: 0.5rem; width:100%; height:calc(100% - 7.25rem);box-sizing:border-box;`}
		bind:value={theme.memo}
	></textarea>
	<div>
		<Button onclick={onclickRemove}>削除</Button>
	</div>
</ThemeDialogBase>

<style>
	.header {
		display: flex;
		justify-content: space-between;
	}
</style>
