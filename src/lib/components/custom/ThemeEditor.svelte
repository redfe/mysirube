<script module lang="ts">
	import Button from '$lib/components/core/Button.svelte';
	import TextInput from '$lib/components/core/TextInput.svelte';
	import Typograph from '$lib/components/core/Typograph.svelte';
	import type { Theme } from '$lib/repository';

	export type Props = {
		onclickClose?: () => void;
		theme: Theme;
	};
</script>

<script lang="ts">
	import ThemeDialogBase from './DialogBase.svelte';
	import RichEditor from './RichEditor.svelte';
	let { onclickClose, theme } = $props();
</script>

<ThemeDialogBase>
	<div class="header">
		<TextInput label="テーマ名" bind:value={theme.title} style={`width: 20rem;`} />
		<div>
			<Typograph></Typograph>
			<Button onclick={onclickClose}>閉じる</Button>
		</div>
	</div>
	<RichEditor
		content={theme.memo}
		onchangecontent={(content) => {
			theme.memo = content;
		}}
	/>
</ThemeDialogBase>

<style>
	.header {
		display: flex;
		justify-content: space-between;
	}
</style>
