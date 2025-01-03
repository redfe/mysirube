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
	import Table from '@tiptap/extension-table';
	import TableCell from '@tiptap/extension-table-cell';
	import TableHeader from '@tiptap/extension-table-header';
	import TableRow from '@tiptap/extension-table-row';
	import Youtube from '@tiptap/extension-youtube';
	import Image from '@tiptap/extension-image';
	import FileHandler from '@tiptap-pro/extension-file-handler';
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
			extensions: [
				StarterKit.configure(),
				Link.configure({ openOnClick: true }),
				Table.configure({ resizable: true }),
				TableRow,
				TableHeader,
				TableCell,
				Youtube.configure({
					controls: false,
					nocookie: true
				}),
				Image,
				FileHandler.configure({
					allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
					onDrop: (currentEditor, files, pos) => {
						files.forEach((file) => {
							const fileReader = new FileReader();

							fileReader.readAsDataURL(file);
							fileReader.onload = () => {
								currentEditor
									.chain()
									.insertContentAt(pos, {
										type: 'image',
										attrs: {
											src: fileReader.result
										}
									})
									.focus()
									.run();
							};
						});
					},
					onPaste: (currentEditor, files, htmlContent) => {
						files.forEach((file) => {
							if (htmlContent) {
								// if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
								// you could extract the pasted file from this url string and upload it to a server for example
								return false;
							}

							const fileReader = new FileReader();

							fileReader.readAsDataURL(file);

							fileReader.onload = () => {
								currentEditor
									.chain()
									.insertContentAt(currentEditor.state.selection.anchor, {
										type: 'image',
										attrs: {
											src: fileReader.result
										}
									})
									.focus()
									.run();
							};
						});
					}
				})
			],
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
	<div class="menus">
		<div class="menu">
			<button
				class:hassubmenu={true}
				onclick={(e) => {
					e.stopPropagation();
					currentMenu = currentMenu === 'heading' ? undefined : 'heading';
				}}>見出し</button
			>
			{#if currentMenu === 'heading'}
				<div class="submenus" transition:scale={{ duration: 100, easing: cubicInOut }}>
					<button
						onclick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
						class:active={editor?.isActive('heading', { level: 1 })}
					>
						見出し1
					</button>
					<button
						onclick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
						class:active={editor?.isActive('heading', { level: 2 })}
					>
						見出し2
					</button>
				</div>
			{/if}
		</div>
		<div class="menu">
			<button
				class:hassubmenu={true}
				onclick={(e) => {
					e.stopPropagation();
					currentMenu = currentMenu === 'list' ? undefined : 'list';
				}}>リスト</button
			>
			{#if currentMenu === 'list'}
				<div class="submenus" transition:scale={{ duration: 100, easing: cubicInOut }}>
					<button
						onclick={() => editor?.chain().focus().toggleBulletList().run()}
						class:active={editor?.isActive('bulletList')}
					>
						リスト
					</button>
					<button
						onclick={() => editor?.chain().focus().toggleOrderedList().run()}
						class:active={editor?.isActive('orderedList')}
					>
						順序リスト
					</button>
				</div>
			{/if}
		</div>
		<div class="menu">
			<button
				onclick={() => editor?.chain().focus().toggleCode().run()}
				class:active={editor?.isActive('code')}
			>
				コード
			</button>
		</div>
		<div class="menu">
			<button
				class:hassubmenu={true}
				onclick={(e) => {
					e.stopPropagation();
					currentMenu = currentMenu === 'block' ? undefined : 'block';
				}}>ブロック</button
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
						class:active={editor?.isActive('blockquote')}
					>
						引用
					</button>
				</div>
			{/if}
		</div>
		<div class="menu">
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
				class:active={editor?.isActive('link')}>リンク</button
			>
		</div>
		<div class="menu">
			<button
				class:hassubmenu={true}
				onclick={(e) => {
					e.stopPropagation();
					currentMenu = currentMenu === 'table' ? undefined : 'table';
				}}>テーブル</button
			>
			{#if currentMenu === 'table'}
				<div class="submenus" transition:scale={{ duration: 100, easing: cubicInOut }}>
					<button
						onclick={() =>
							editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
					>
						テーブルを作成
					</button>
					<button
						onclick={() => editor?.chain().focus().fixTables().run()}
						disabled={!editor?.isActive('table')}
					>
						テーブルを修正
					</button>
					<button
						onclick={() => editor?.chain().focus().deleteTable().run()}
						disabled={!editor?.isActive('table')}>テーブルを削除</button
					>
					<hr />
					<button
						onclick={() => editor?.chain().focus().toggleHeaderColumn().run()}
						disabled={!editor?.isActive('table')}
					>
						ヘッダー列を切り替え
					</button>
					<button
						onclick={() => editor?.chain().focus().toggleHeaderRow().run()}
						disabled={!editor?.isActive('table')}
					>
						ヘッダー行を切り替え
					</button>
					<button
						onclick={() => editor?.chain().focus().toggleHeaderCell().run()}
						disabled={!editor?.isActive('table')}
					>
						ヘッダーセルを切り替え
					</button>
					<hr />
					<button
						onclick={() => editor?.chain().focus().addColumnBefore().run()}
						disabled={!editor?.isActive('table')}
					>
						列を左に追加
					</button>
					<button
						onclick={() => editor?.chain().focus().addColumnAfter().run()}
						disabled={!editor?.isActive('table')}
					>
						列を右に追加
					</button>
					<button
						onclick={() => editor?.chain().focus().deleteColumn().run()}
						disabled={!editor?.isActive('table')}>列を削除</button
					>
					<hr />
					<button
						onclick={() => editor?.chain().focus().addRowBefore().run()}
						disabled={!editor?.isActive('table')}>行を上に追加</button
					>
					<button
						onclick={() => editor?.chain().focus().addRowAfter().run()}
						disabled={!editor?.isActive('table')}>行を下に追加</button
					>
					<button
						onclick={() => editor?.chain().focus().deleteRow().run()}
						disabled={!editor?.isActive('table')}>行を削除</button
					>
					<hr />
					<button
						onclick={() => editor?.chain().focus().mergeCells().run()}
						disabled={!editor?.isActive('table')}>セルを結合</button
					>
					<button
						onclick={() => editor?.chain().focus().splitCell().run()}
						disabled={!editor?.isActive('table')}>セルを分割</button
					>
					<button
						onclick={() => editor?.chain().focus().mergeOrSplit().run()}
						disabled={!editor?.isActive('table')}
					>
						セルを結合または分割
					</button>
				</div>
			{/if}
		</div>
		<div class="menu">
			<button
				class:hassubmenu={true}
				onclick={(e) => {
					e.stopPropagation();
					currentMenu = currentMenu === 'others' ? undefined : 'others';
				}}>その他</button
			>
			{#if currentMenu === 'others'}
				<div class="submenus" transition:scale={{ duration: 100, easing: cubicInOut }}>
					<button
						onclick={() => {
							const url = prompt('画像のURL');
							if (url) {
								editor?.commands.setImage({
									src: url
								});
							}
						}}
						class:active={editor?.isActive('image')}
					>
						画像
					</button>
					<button
						onclick={() => {
							const url = prompt('YouTubeのURL');
							if (url) {
								editor?.commands.setYoutubeVideo({
									src: url,
									width: 320,
									height: 240
								});
							}
						}}
						class:active={editor?.isActive('youtube')}
					>
						YouTube動画
					</button>
				</div>
			{/if}
		</div>
	</div>
{/if}

<div class="editor" bind:this={element}></div>

<style>
	.menus {
		display: flex;
		flex-wrap: wrap;
	}
	.menu {
		position: relative;
		display: inline-block;
		&:hover > button {
			background-color: gainsboro;
		}
		& > button {
			background-color: white;
			padding: 0.25rem 0.75rem;
			text-align: left;
			border: none;
			margin: 0;
			cursor: pointer;
		}
		&:first-child {
			border-left: none;
		}
		& hr {
			margin: 0;
			border: none;
			border-top: 1px solid silver;
			margin: 0.25rem 0;
		}
	}
	.menu .hassubmenu::after {
		content: '…';
		font-size: 0.75rem;
	}
	.submenus {
		position: absolute;
		display: flex;
		flex-direction: column;
		top: 2rem;
		left: 0;
		width: 12rem;
		position: absolute;
		background-color: white;
		box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.5);
		& button {
			padding: 0.5rem;
			text-align: left;
			border: none;
			background-color: white;
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
		background-color: lightblue;
		border-radius: 0.25rem;
		padding: 0.25rem;
	}
	.editor :global(pre:has(code)) {
		background-color: lightblue;
		border: 1px solid darkblue;
		border-radius: 0.5rem;
		padding: 0.5rem;
		line-height: 1.25rem;
		:global(code) {
			background-color: transparent;
			padding: 0;
			font-size: 0.75rem;
		}
	}
	.editor :global(a) {
		cursor: pointer;
	}
	.editor :global(table) {
		border-collapse: collapse;
		border: 1px solid silver;
		:global(th),
		:global(td) {
			border: 1px solid silver;
			padding: 0.25rem;
		}
		:global(th) {
			background-color: gainsboro;
		}
	}
	.editor :global(table) {
		:global(th),
		:global(td) {
			:global(&:has(.column-resize-handle)) {
				border-right: 4px solid mediumorchid;
				box-sizing: border-box;
			}
		}
	}
	:global(*:has(.column-resize-handle)) {
		cursor: col-resize;
	}

	.editor :global(img.ProseMirror-selectednode) {
		outline: 4px solid mediumorchid;
	}
</style>
