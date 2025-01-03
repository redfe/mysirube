<script module lang="ts">
	export type Props = {
		content?: string;
		onchangecontent?: (content: string) => void;
	};
</script>

<script lang="ts">
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Link from '@tiptap/extension-link';
	import { onDestroy, onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

	let { content, onchangecontent }: Props = $props();
	let element: HTMLElement | undefined = $state();
	let editor: Editor | undefined = $state();
	let currentMenu: string | undefined = $state();

	onMount(() => {
		const isValidContent = content ? content.startsWith('{') : false;
		editor = new Editor({
			element: element!,
			extensions: [StarterKit.configure(), Link.configure({ openOnClick: true })],
			content: isValidContent ? JSON.parse(content ?? '{}') : undefined,
			onTransaction: () => {
				// editor.isActive を発火せたいため、浅いコピーを再代入する。
				const clone = Object.assign({}, editor);
				Object.setPrototypeOf(clone, Editor.prototype);
				editor = clone;
				if (onchangecontent && editor) {
					onchangecontent(JSON.stringify(editor.getJSON()));
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

<svelte:window onclick={() => (currentMenu = undefined)} />

{#if editor}
	<div class="menu">
		<button
			onclick={(e) => {
				e.stopPropagation();
				currentMenu = currentMenu === 'heading' ? undefined : 'heading';
			}}>見出し…</button
		>
		{#if currentMenu === 'heading'}
			<div class="submenus" transition:scale={{ duration: 100, easing: cubicInOut }}>
				<button
					onclick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
					class:active={editor.isActive('heading', { level: 1 })}
				>
					見出し1
				</button>
				<button
					onclick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
					class:active={editor.isActive('heading', { level: 2 })}
				>
					見出し2
				</button>
			</div>
		{/if}
	</div>
	<button
		onclick={() => editor?.chain().focus().setParagraph().run()}
		class:active={editor.isActive('paragraph')}
	>
		段落
	</button>
	<div class="menu">
		<button
			onclick={(e) => {
				e.stopPropagation();
				currentMenu = currentMenu === 'list' ? undefined : 'list';
			}}>リスト…</button
		>
		{#if currentMenu === 'list'}
			<div class="submenus" transition:scale={{ duration: 100, easing: cubicInOut }}>
				<button
					onclick={() => editor?.chain().focus().toggleBulletList().run()}
					class:active={editor.isActive('bulletList')}
				>
					リスト
				</button>
				<button
					onclick={() => editor?.chain().focus().toggleOrderedList().run()}
					class:active={editor.isActive('orderedList')}
				>
					順序リスト
				</button>
			</div>
		{/if}
	</div>
	<button
		onclick={() => editor?.chain().focus().toggleCode().run()}
		class:active={editor.isActive('code')}
	>
		コード
	</button>
	<div class="menu">
		<button
			onclick={(e) => {
				e.stopPropagation();
				currentMenu = currentMenu === 'block' ? undefined : 'block';
			}}>ブロック…</button
		>
		{#if currentMenu === 'block'}
			<div class="submenus" transition:scale={{ duration: 100, easing: cubicInOut }}>
				<button
					onclick={() => editor?.chain().focus().toggleCodeBlock().run()}
					class:active={editor.isActive('codeBlock')}
				>
					コードブロック
				</button>
				<button
					onclick={() => editor?.chain().focus().toggleBlockquote().run()}
					class:active={editor.isActive('blockquote')}
				>
					引用
				</button>
			</div>
		{/if}
	</div>

	<button
		onclick={() => {
			const previousUrl = editor?.getAttributes('link').href;
			const url = window.prompt('URL', previousUrl);
			if (url == null) {
				return;
			}
			if (url === '') {
				editor?.chain().focus().extendMarkRange('link').unsetLink().run();
				return;
			}
			editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
		}}
		class:active={editor.isActive('link')}>リンク</button
	>
{/if}

<div class="editor" bind:this={element}></div>

<style>
	.menu {
		position: relative;
		display: inline-block;
	}
	.submenus {
		position: absolute;
		display: flex;
		flex-direction: column;
		top: 2rem;
		left: 0;
		width: 7rem;
		position: absolute;
		background-color: silver;
		box-shadow: 0 0 0.75rem 0 rgba(0, 0, 0, 0.5);
		& button {
			padding: 0.5rem;
			text-align: left;
			border: none;
		}
		& button:hover {
			background: gainsboro;
		}
		z-index: 9999;
	}
	button.active {
		background: black;
		color: white;
	}
	.editor {
		margin-top: 0.5rem;
		height: calc(100% - 7.5rem);
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
	.editor :global(a) {
		cursor: pointer;
	}
</style>
