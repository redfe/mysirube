<script module lang="ts">
	export type Props = {
		content?: string;
		onchangecontent?: (content: string) => void;
	};
</script>

<script lang="ts">
	import { Editor, type JSONContent } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import { onDestroy, onMount } from 'svelte';

	let { content, onchangecontent }: Props = $props();
	let element: HTMLElement | undefined = $state();
	let editor: Editor | undefined = $state();

	onMount(() => {
		const isValidContent = content ? content.startsWith('{') : false;
		editor = new Editor({
			element: element!,
			extensions: [StarterKit],
			content: isValidContent ? JSON.parse(content ?? '{}') : undefined,
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
				if (onchangecontent) {
					onchangecontent(JSON.stringify(editor!.getJSON()));
				}
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

{#if editor}
	<button
		onclick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
		class:active={editor.isActive('heading', { level: 1 })}
	>
		H1
	</button>
	<button
		onclick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
		class:active={editor.isActive('heading', { level: 2 })}
	>
		H2
	</button>
	<button
		onclick={() => editor?.chain().focus().setParagraph().run()}
		class:active={editor.isActive('paragraph')}
	>
		P
	</button>
{/if}

<div class="editor" bind:this={element}></div>

<style>
	button.active {
		background: black;
		color: white;
	}
	.editor {
		margin-top: 0.5rem;
		height: calc(100% - 7rem);
		overflow-y: auto; /* 縦方向のスクロールを有効化 */
		border: 1px solid silver; /* 視覚的に区別するための境界線 */
		border-radius: 0.25rem;
		padding-left: 0.5rem;
		padding-right: 0.5rem;
		box-sizing: border-box;
	}
	.editor > :global([contenteditable]) {
		outline: none;
	}
	.editor :global(blockquote) {
		border-left: 0.25rem solid silver;
		margin-left: 0;
		margin-right: 0;
		padding-left: 10px;
	}
	.editor :global(code) {
		background-color: paleturquoise;
		border-radius: 0.25rem;
		padding: 0.25rem;
	}
	.editor :global(pre:has(code)) {
		background-color: paleturquoise;
		border-radius: 0.25rem;
		padding: 0.5rem;
		:global(code) {
			background-color: transparent;
			padding: 0;
		}
	}
</style>
