<script lang="ts">
	import { EditData } from './data.svelte';
	import { search, save, type Data, remove as removeData } from '$lib/repository';
	import { onMount } from 'svelte';
	import Button from '$lib/components/Button.svelte';

	let newData = $state(new EditData());
	let datas: EditData[] = $state([]);
	let startElm: HTMLElement;
	let offsetStart: number | undefined = $state();
	let allCount = $state(0);

	function toData(editData: EditData): Data {
		return {
			id: editData.id,
			start: parseInt(editData.start!),
			end: editData.end ? parseInt(editData.end) : undefined,
			title: editData.title!,
			color: editData.color,
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
			onchangeHandler: saveOnChange
		});

		save(toData(editData));

		newData = new EditData({ start: '', end: '', title: '', color: editData.color });
		startElm?.focus();
		loadAllData();
	}

	function remove(index: number) {
		removeData(datas[index].id);
		loadAllData();
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
				`tr:nth-child(${i + 4}) td:nth-child(${col})${tagName === 'button' ? ' button' : ''}`
			);
			if (next) {
				(next as HTMLElement).focus();
			}
		} else if (e.key === 'ArrowUp') {
			const prev = tbody?.querySelector(
				`tr:nth-child(${i + 2}) td:nth-child(${col})${tagName === 'button' ? ' button' : ''}`
			);
			if (prev) {
				(prev as HTMLElement).focus();
			}
		}
	}
	$effect(() => {
		if (startElm) startElm.focus();
	});

	onMount(() => {
		loadAllData();
	});
</script>

<svelte:head><title>Myしるべ：編集</title></svelte:head>

<table>
	<thead>
		<tr>
			<th>開始年</th>
			<th>終了年</th>
			<th>タイトル</th>
			<th>色</th>
			<th>エラー</th>
			<th></th>
		</tr>
	</thead>
	<tbody>
		<tr>
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
			<td colspan="6">
				<div>
					<div>
						<input type="number" bind:value={offsetStart} /><Button onclick={move}>移動</Button>
					</div>
					<div class="count">
						<span>件数:</span>
						<span>{datas.length}/{allCount}</span>
					</div>
				</div>
			</td>
		</tr>
		{#each datas as data, i (i)}
			<tr>
				<td
					data-errormsg={data.errors.start}
					bind:textContent={data.start}
					contenteditable="true"
					onkeydown={(e) => moveByArrowKey(e, i, 1)}
				></td>
				<td
					data-errormsg={data.errors.end}
					bind:textContent={data.end}
					contenteditable="true"
					onkeydown={(e) => moveByArrowKey(e, i, 2)}
				></td>
				<td
					data-errormsg={data.errors.title}
					bind:textContent={data.title}
					contenteditable="true"
					onkeydown={(e) => moveByArrowKey(e, i, 3)}
				></td>
				<td
					class="color"
					data-errormsg={data.errors.color}
					bind:textContent={data.color}
					contenteditable="true"
					style="border-right-color:{data.color ? data.color : 'white'}"
					onkeydown={(e) => moveByArrowKey(e, i, 4)}
				></td>
				<td>
					{#if hasError(data.errors)}
						<pre>{oneError(data)}</pre>
					{/if}
				</td>
				<td
					><Button
						onclick={() => remove(i)}
						onkeydown={(e: KeyboardEvent) => moveByArrowKey(e, i, 6)}>×</Button
					>
				</td></tr
			>
		{/each}
	</tbody>
</table>

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
	th:nth-child(4),
	td:nth-child(4) {
		opacity: 0.7;
	}
	thead {
		th:nth-child(1) {
			width: 7rem;
		}
		th:nth-child(2) {
			width: 7rem;
		}
		th:nth-child(3) {
			width: 14rem;
		}
		th:nth-child(4) {
			width: 4rem;
		}
		th:nth-child(4) {
			width: 4rem;
		}
		th:nth-child(5) {
			width: 18rem;
		}
		th:nth-child(6) {
			width: 5rem;
		}
	}
	tbody {
		td:nth-child(5) {
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
				input {
					width: 6.25rem;
					height: 1.25rem;
					text-align: right;
					margin-right: 0.25rem;
				}
			}
		}
		td:nth-child(1),
		td:nth-child(2) {
			text-align: right;
		}
		pre {
			color: red;
			margin: 0;
		}
	}
	td[data-errormsg] {
		background-color: rgb(255, 192, 203, 0.7);
	}
	.color {
		border-right: 2rem solid white;
	}
</style>
