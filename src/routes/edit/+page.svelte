<script lang="ts">
	import { EditData, EditTheme } from './data.svelte';
	import {
		search,
		save,
		type Data,
		type Theme,
		remove as removeData,
		saveTheme,
		getThemes,
		removeTheme
	} from '$lib/repository';
	import { onMount } from 'svelte';
	import Button from '$lib/components/core/Button.svelte';
	import Typograph from '$lib/components/core/Typograph.svelte';
	import StartYearChange from '$lib/components/custom/StartYearChange.svelte';
	import ThemeSelector from '$lib/components/custom/ThemeSelector.svelte';
	import ThemeEditor from '$lib/components/custom/ThemeEditor.svelte';

	let newData = $state(new EditData());
	let datas: EditData[] = $state([]);
	let startElm: HTMLElement;
	let offsetStart: number | undefined = $state();
	let allCount = $state(0);
	let isFilterSelected = $state(false);
	let isViewThemeSelector = $state(false);
	let isViewTheme = $state(false);
	let themes: Theme[] = $state([]);
	const themeChangeHandler = (edited: EditTheme) => {
		saveTheme({
			id: edited.id,
			title: edited.title!,
			dataIds: [...(edited.dataIds ?? [])],
			memo: '',
			createdAt: new Date(),
			updatedAt: new Date()
		});
	};
	let editTheme = $state(
		new EditTheme({
			id: crypto.randomUUID(),
			dataIds: [],
			onchangeHandler: themeChangeHandler
		})
	);

	function toData(editData: EditData): Data {
		return {
			id: editData.id,
			start: parseInt(editData.start!),
			end: editData.end ? parseInt(editData.end) : undefined,
			title: editData.title!,
			color: editData.color,
			subColor: editData.subColor,
			createdAt: editData.createdAt ?? new Date(),
			updatedAt: editData.updatedAt ?? new Date()
		};
	}

	const saveOnChange: EditData['onchangeHandler'] = (editData) => {
		editData.updatedAt = new Date();
		save(toData(editData));
	};

	function add() {
		if (!newData.isValid()) {
			return;
		}
		let editData = new EditData({
			id: newData.id,
			start: newData.start,
			end: newData.end,
			title: newData.title,
			color: newData.color,
			subColor: newData.subColor,
			onchangeHandler: saveOnChange
		});

		save(toData(editData));

		newData = new EditData({ start: '', end: '', title: '', color: editData.color });
		startElm?.focus();
		loadAllData();
	}

	function remove(index: number) {
		if (confirm('削除しますか？')) {
			removeData(datas[index].id);
			loadAllData();
		}
	}

	function move() {
		loadAllData();
	}

	function hasError(errors: Record<string, string>) {
		return Object.keys(errors).length > 0;
	}

	function oneError(data: EditData) {
		return [data.errors.start, data.errors.end, data.errors.title, data.errors.color].filter(
			(v) => !!v
		)[0];
	}

	function loadAllData() {
		search({ start: offsetStart }).then((r) => {
			allCount = r.count;
			datas = r.datas.map((d) => {
				const editData = new EditData({
					id: d.id,
					start: `${d.start}`,
					end: `${d.end ?? ''}`,
					title: d.title,
					color: d.color,
					subColor: d.subColor,
					createdAt: d.createdAt,
					updatedAt: d.updatedAt,
					onchangeHandler: saveOnChange
				});
				return editData;
			});
		});
	}

	function moveByArrowKey(e: KeyboardEvent, i: number, col: number) {
		const t = e.target as HTMLElement;
		const tagName = t.tagName.toLowerCase();
		const tbody =
			tagName == 'td'
				? t.parentElement?.parentElement
				: t.parentElement?.parentElement?.parentElement;
		if (e.key === 'ArrowDown') {
			const next = tbody?.querySelector(
				`tr:nth-child(${i + 4}) td:nth-child(${col})${tagName === 'td' ? '' : ' ' + tagName}`
			);
			if (next) {
				(next as HTMLElement).focus();
			}
		} else if (e.key === 'ArrowUp') {
			const prev = tbody?.querySelector(
				`tr:nth-child(${i + 2}) td:nth-child(${col})${tagName === 'td' ? '' : ' ' + tagName}`
			);
			if (prev) {
				(prev as HTMLElement).focus();
			}
		}
	}

	function reloadThemes(node: Node) {
		$effect(() => {
			node;
			getThemes().then((r) => (themes = r));
		});
	}

	$effect(() => {
		if (startElm) startElm.focus();
	});

	onMount(async () => {
		loadAllData();
		themes = await getThemes();
	});
</script>

<svelte:head><title>Myしるべ：年表</title></svelte:head>

<table>
	<thead>
		<tr>
			<th></th>
			<th>開始年</th>
			<th>終了年</th>
			<th>タイトル</th>
			<th>色</th>
			<th>補色</th>
			<th>エラー</th>
			<th></th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td></td>
			<td
				data-errormsg={newData.errors.start}
				bind:textContent={newData.start}
				contenteditable="true"
				bind:this={startElm}
			></td>
			<td data-errormsg={newData.errors.end} bind:textContent={newData.end} contenteditable="true"
			></td>
			<td
				data-errormsg={newData.errors.title}
				bind:textContent={newData.title}
				contenteditable="true"
			></td>
			<td
				class="color"
				data-errormsg={newData.errors.color}
				bind:textContent={newData.color}
				contenteditable="true"
				style="border-right-color:{newData.color}"
			></td>
			<td
				class="color sub"
				data-errormsg={newData.errors.subColor}
				bind:textContent={newData.subColor}
				contenteditable="true"
				style="border-right-color:{newData.subColor}"
			></td>
			<td>
				{#if !newData.isValid()}
					<pre>{oneError(newData)}</pre>
				{/if}
			</td>
			<td>
				<Button disabled={!newData.isValid()} onclick={add}>追加</Button>
			</td>
		</tr>
		<tr class="commands">
			<td>
				<input
					type="checkbox"
					onclick={(e) => {
						const elm = e.target as HTMLInputElement;
						isFilterSelected = elm.checked;
					}}
				/>
			</td>
			<td colspan="7">
				<div>
					<StartYearChange label="表示開始年" {move} bind:startYear={offsetStart} />
					<div class="count">
						<Typograph>件数:</Typograph>
						<Typograph>{datas.length}/{allCount}</Typograph>
					</div>
					<div>
						<Typograph></Typograph>
						<Button
							onclick={() => {
								if (isViewThemeSelector) {
									isViewThemeSelector = false;
								} else {
									if (isViewTheme) {
										isViewTheme = false;
									} else {
										isViewThemeSelector = true;
									}
								}
							}}>テーマ</Button
						>
					</div>
				</div>
			</td>
		</tr>
		{#each datas.filter((d) => !isFilterSelected || editTheme.dataIds?.includes(d.id)) as data, i (i)}
			<tr class:selected={editTheme.dataIds?.includes(data.id)}>
				<td
					><input
						type="checkbox"
						checked={editTheme.dataIds?.includes(data.id)}
						onchange={(e) => {
							const elm = e.target as HTMLInputElement;
							if (elm.checked) {
								// onchangeHandler を発火させるため代入する
								editTheme.dataIds = [...(editTheme.dataIds ?? []), data.id];
							} else {
								editTheme.dataIds = editTheme.dataIds?.filter((v) => v !== data.id);
							}
						}}
						onkeydown={(e) => moveByArrowKey(e, i, 1)}
					/></td
				>
				<td
					data-errormsg={data.errors.start}
					bind:textContent={data.start}
					contenteditable="true"
					onkeydown={(e) => moveByArrowKey(e, i, 2)}
				></td>
				<td
					data-errormsg={data.errors.end}
					bind:textContent={data.end}
					contenteditable="true"
					onkeydown={(e) => moveByArrowKey(e, i, 3)}
				></td>
				<td
					data-errormsg={data.errors.title}
					bind:textContent={data.title}
					contenteditable="true"
					onkeydown={(e) => moveByArrowKey(e, i, 4)}
				></td>
				<td
					class="color"
					data-errormsg={data.errors.color}
					bind:textContent={data.color}
					contenteditable="true"
					style="border-right-color:{data.color ? data.color : 'white'}"
					onkeydown={(e) => moveByArrowKey(e, i, 5)}
				></td>
				<td
					class="color sub"
					data-errormsg={data.errors.subColor}
					bind:textContent={data.subColor}
					contenteditable="true"
					style="border-right-color:{data.subColor ? data.subColor : 'white'}"
					onkeydown={(e) => moveByArrowKey(e, i, 6)}
				></td>
				<td>
					{#if hasError(data.errors)}
						<pre>{oneError(data)}</pre>
					{/if}
				</td>
				<td
					><Button
						onclick={() => remove(i)}
						onkeydown={(e: KeyboardEvent) => moveByArrowKey(e, i, 8)}>×</Button
					>
				</td></tr
			>
		{/each}
	</tbody>
</table>

{#if isViewThemeSelector}
	<ThemeSelector
		onclickNew={() => {
			editTheme = new EditTheme({
				id: crypto.randomUUID(),
				dataIds: editTheme.dataIds,
				onchangeHandler: themeChangeHandler
			});
			isViewThemeSelector = false;
			isViewTheme = true;
		}}
		onclickClose={() => {
			isViewThemeSelector = false;
			editTheme = new EditTheme();
		}}
		onclickSelect={(theme: Theme) => {
			editTheme = new EditTheme({
				id: theme.id,
				title: theme.title,
				dataIds: theme.dataIds,
				onchangeHandler: themeChangeHandler
			});
			isViewThemeSelector = false;
			isViewTheme = true;
		}}
		reloadThemes={() => {
			getThemes().then((r) => (themes = r));
		}}
		{themes}
	/>
{/if}
{#if isViewTheme}
	<ThemeEditor
		onclickReturn={() => {
			isViewTheme = false;
			isViewThemeSelector = true;
			editTheme = new EditTheme();
		}}
		onclickClose={() => {
			isViewTheme = false;
			editTheme = new EditTheme();
		}}
		onclickRemove={() => {
			if (confirm('削除しますか？')) {
				removeTheme(editTheme.id);
				isViewTheme = false;
				isViewThemeSelector = true;
				editTheme = new EditTheme();
			}
		}}
		theme={editTheme}
	/>
{/if}

<style>
	table,
	th,
	td {
		border-collapse: separate;
		border: solid 1px;
	}
	th,
	td {
		padding: 0.25rem;
		box-sizing: border-box;
		vertical-align: middle;
	}
	th:nth-child(5),
	td:nth-child(5),
	th:nth-child(6),
	td:nth-child(6) {
		opacity: 0.8;
	}
	thead {
		th:nth-child(1) {
			width: 1rem;
		}
		th:nth-child(2) {
			width: 7rem;
		}
		th:nth-child(3) {
			width: 7rem;
		}
		th:nth-child(4) {
			width: 20rem;
		}
		th:nth-child(5) {
			width: 4rem;
		}
		th:nth-child(6) {
			width: 4rem;
		}
		th:nth-child(7) {
			width: 18rem;
		}
		th:nth-child(8) {
			width: 5rem;
		}
	}
	tbody {
		td:nth-child(7) {
			font-weight: bold;
			color: red;
			border-color: black;
			pre {
				margin: 0;
			}
		}
		tr.commands {
			td > div {
				text-align: left;
				display: flex;
				gap: 2rem;
			}
		}
		td:nth-child(2),
		td:nth-child(3) {
			text-align: right;
		}
		pre {
			color: crimson;
			margin: 0;
		}
	}
	td[data-errormsg] {
		background-color: rgb(255, 192, 203, 0.8);
	}
	.color {
		border-right: 2rem solid white;
	}
	.color.sub {
		border-right: 1rem solid white;
	}
	tr.selected {
		background-color: azure;
	}
</style>
