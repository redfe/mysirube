<script lang="ts">
	import { EditData, EditTheme } from './data.svelte';
	import {
		search,
		save,
		type Data,
		type Theme,
		remove as removeData,
		saveTheme,
		removeTheme,
		getCurrentThemeId,
		saveCurrentThemeId,
		getTheme,
		getThemeSummaries,
		type ThemeSummary
	} from '$lib/repository';
	import { onMount } from 'svelte';
	import Button from '$lib/components/core/Button.svelte';
	import Typograph from '$lib/components/core/Typograph.svelte';
	import StartYearChange from '$lib/components/custom/StartYearChange.svelte';
	import ThemeSelector from '$lib/components/custom/ThemeSelector.svelte';
	import ThemeEditor from '$lib/components/custom/ThemeEditor.svelte';
	import Switch from '$lib/components/core/Switch.svelte';
	import ColorSelect from '$lib/components/core/ColorSelect.svelte';

	let newData = $state(new EditData());
	let datas: EditData[] = $state([]);
	let startElm: HTMLElement;
	let offsetStartYear: number | undefined = $state();
	let allCount = $state(0);
	let isFilterTheme = $state(false);
	let isViewThemeSelector = $state(false);
	let isViewThemeEditor = $state(false);
	const themeChangeHandler = (edited: EditTheme) => {
		saveTheme({
			id: edited.id,
			title: edited.title!,
			dataIds: [...(edited.dataIds ?? [])],
			memo: edited.memo,
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

		// テーマを編集中であればテーマにも追加
		if (editTheme.isValid()) {
			editTheme.dataIds = [...(editTheme.dataIds ?? []), editData.id];
		}

		newData = new EditData({
			start: '',
			end: '',
			title: '',
			color: editData.color,
			subColor: editData.subColor
		});
		startElm?.focus();
		loadAllData();
	}

	function remove(id: string) {
		if (confirm('削除しますか？')) {
			removeData(id);
			loadAllData();
		}
	}

	function moveStartYear() {
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
		search({
			start: offsetStartYear,
			ids: isFilterTheme && editTheme.isValid() ? [...(editTheme.dataIds ?? [])] : undefined
		}).then((r) => {
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
		if (e.isComposing) return; // 日本語入力中は無視
		const t = e.target as HTMLElement;
		const tagName = t.tagName.toLowerCase();
		const tbody =
			tagName == 'td'
				? t.parentElement?.parentElement
				: t.parentElement?.parentElement?.parentElement;
		if (e.key === 'ArrowDown') {
			const next = tbody?.querySelector(
				`tr:nth-child(${i + 3}) td:nth-child(${col})${tagName === 'td' ? '' : ' ' + tagName}`
			);
			if (next) {
				(next as HTMLElement).focus();
			}
		} else if (e.key === 'ArrowUp') {
			const prev = tbody?.querySelector(
				`tr:nth-child(${i + 1}) td:nth-child(${col})${tagName === 'td' ? '' : ' ' + tagName}`
			);
			if (prev) {
				(prev as HTMLElement).focus();
			}
		}
	}

	$effect(() => {
		if (startElm) startElm.focus();
	});

	onMount(async () => {
		const currentThemeId = getCurrentThemeId();
		if (currentThemeId) {
			const theme = await getTheme(currentThemeId);
			if (theme) {
				editTheme = new EditTheme({
					...theme,
					onchangeHandler: themeChangeHandler
				});
				isFilterTheme = true;
			}
		}
		loadAllData();
	});
</script>

<svelte:head><title>Myしるべ：年表</title></svelte:head>
<div>
	<div class="commands">
		<div>
			<StartYearChange label="表示開始年" move={moveStartYear} bind:startYear={offsetStartYear} />
			<div class="count">
				<Typograph>件数:</Typograph>
				<Typograph>{datas.length}/{allCount}</Typograph>
			</div>
			<div>
				<Typograph></Typograph>
				<Button
					onclick={() => {
						isViewThemeSelector = true;
						isViewThemeEditor = false;
					}}>テーマ</Button
				>
				{#if editTheme.isValid()}
					<Typograph>{editTheme.title}</Typograph>
					<Button
						onclick={() => {
							isViewThemeSelector = false;
							isViewThemeEditor = true;
						}}>編集</Button
					>
					<Switch bind:on={isFilterTheme} onchange={() => loadAllData()} />
				{/if}
			</div>
		</div>
	</div>
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
				<td class="color" data-errormsg={newData.errors.color}>
					<ColorSelect label="色" bind:value={newData.color} />
				</td>
				<td class="color sub" data-errormsg={newData.errors.subColor}>
					<ColorSelect label="補色" bind:value={newData.subColor} />
				</td>
				<td>
					{#if !newData.isValid()}
						<pre>{oneError(newData)}</pre>
					{/if}
				</td>
				<td>
					<Button disabled={!newData.isValid()} onclick={add}>追加</Button>
				</td>
			</tr>
			{#each datas as data, i (i)}
				<tr class:selected={editTheme.dataIds?.includes(data.id)}>
					<td>
						{#if editTheme.isValid()}
							<input
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
							/>
						{/if}
					</td>
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
						onkeydown={(e) => moveByArrowKey(e, i, 5)}
					>
						<ColorSelect label="色" bind:value={data.color} />
					</td>
					<td
						class="color sub"
						data-errormsg={data.errors.subColor}
						onkeydown={(e) => moveByArrowKey(e, i, 6)}
					>
						<ColorSelect label="補色" bind:value={data.subColor} />
					</td>
					<td>
						{#if hasError(data.errors)}
							<pre>{oneError(data)}</pre>
						{/if}
					</td>
					<td
						><Button
							onclick={() => remove(data.id)}
							onkeydown={(e: KeyboardEvent) => moveByArrowKey(e, i, 8)}>×</Button
						>
					</td></tr
				>
			{/each}
		</tbody>
	</table>
</div>

{#if isViewThemeSelector}
	<ThemeSelector
		onclickNew={() => {
			editTheme = new EditTheme({
				id: crypto.randomUUID(),
				dataIds: [],
				onchangeHandler: themeChangeHandler
			});
			isViewThemeSelector = false;
			isViewThemeEditor = true;
		}}
		onclickClose={() => {
			isViewThemeSelector = false;
		}}
		onclickSelect={async (themeSummary?: ThemeSummary) => {
			const theme = themeSummary ? await getTheme(themeSummary?.id) : undefined;
			editTheme = new EditTheme({
				...theme,
				onchangeHandler: themeChangeHandler
			});
			if (themeSummary) {
				saveCurrentThemeId(themeSummary?.id);
				isFilterTheme = true;
			} else {
				saveCurrentThemeId(undefined);
				isFilterTheme = false;
			}
			isViewThemeSelector = false;
			loadAllData();
		}}
		onclickRemove={(id: string) => {
			if (confirm('削除しますか？')) {
				removeTheme(id);
				if (editTheme.id === id) {
					editTheme = new EditTheme();
					loadAllData();
				}
				isViewThemeSelector = false;
			}
		}}
		{getThemeSummaries}
	/>
{/if}
{#if isViewThemeEditor}
	<ThemeEditor
		onclickClose={() => {
			isViewThemeEditor = false;
		}}
		theme={editTheme}
	/>
{/if}

<style>
	.commands {
		& > div {
			text-align: left;
			display: flex;
			gap: 2rem;
		}
	}

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
	tr,
	th,
	td {
		transition: 0.25s;
	}

	thead {
		th:nth-child(1) {
			width: 2rem;
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
			width: 2rem;
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
			border-color: black;
			pre {
				margin: 0;
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
	tr.selected {
		background-color: azure;
	}
</style>
