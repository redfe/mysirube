<script module lang="ts">
	import Button from '$lib/components/core/Button.svelte';
	import Typograph from '$lib/components/core/Typograph.svelte';

	export type Props = {
		text?: string;
		onclickCancel?: () => void;
		onclickOk?: () => void;
	};
</script>

<script lang="ts">
	import DialogBase from '$lib/components/core/DialogBase.svelte';
	import { onMount, tick } from 'svelte';
	import mermaid from 'mermaid';
	import Link from '$lib/components/core/Link.svelte';
	const defaultText = 'flowchart\na --> b';
	let { text = $bindable(), onclickCancel, onclickOk }: Props = $props();
	let elementText = $state(text ?? defaultText);
	let previewElement: HTMLElement | undefined = $state();
	let isError = $state(false);
	const run = async () => {
		if (await mermaid.parse(elementText, { suppressErrors: true })) {
			isError = false;
			await tick(); // wait for the DOM to update
			const { svg } = await mermaid.render('dummy', elementText);
			previewElement!.innerHTML = svg;
		} else {
			isError = true;
		}
	};
	onMount(() => {
		run();
	});
</script>

<DialogBase
	draggables={{ enabled: false }}
	isModal={true}
	style={`
	width: 90%;
	max-width: 70rem;
	height: 90%;
	max-height: 50rem;
	z-index: 2000;
	`}
>
	<div class="header">
		<Typograph>図（Mermaid）</Typograph>
		<div>
			<Typograph></Typograph>
			<Button onclick={onclickCancel}>キャンセル</Button>
		</div>
	</div>
	<div class="container">
		<textarea bind:value={elementText} oninput={() => run()}></textarea>
		{#if isError}
			<div>
				<p>
					構文エラーです。
					<Link href="https://mermaid.js.org/intro/" target="_blank">こちらのサイト</Link
					>を参考にして修正してください。
				</p>
			</div>
		{:else}
			<div class="preview" class:hide={!isError} bind:this={previewElement}></div>
		{/if}
	</div>
	<Button onclick={onclickOk}>決定</Button>
</DialogBase>

<style>
	.header {
		display: flex;
		justify-content: space-between;
	}
	.container {
		display: flex;
		flex-direction: row;
		height: calc(100% - 10rem);
		& > * {
			width: 50%;
			height: 100%;
		}
		margin-bottom: 1.5rem;
	}
	textarea {
		font-size: 1rem;
		padding: 0.5rem;
		line-height: 1.25rem;
		resize: none;
	}
</style>
