<script lang="ts">
	import { EditData } from './data.svelte';
	import { search, save, type Data, remove as removeData } from '$lib/repository';
	import { onMount } from 'svelte';

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
			color: editData.color
		};
	}

	const saveOnChange: EditData['onchangeHandler'] = (editData) => {
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

		// DBに保存
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
					onchangeHandler: saveOnChange
				});
				return editData;
			});
		});
	}

	$effect(() => {
		if (startElm) startElm.focus();
	});

	onMount(() => {
		loadAllData();
	});
</script>

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
				data-errormsg={newData.errors.color}
				bind:textContent={newData.color}
				contenteditable="true"
				style="background-color:{newData.color}"
			></td>
			<td>
				{#if hasError(newData.errors)}
					<pre>{oneError(newData)}</pre>
				{/if}
			</td>
			<td>
				<button onclick={add} disabled={hasError(newData.errors)}>追加</button>
			</td>
		</tr>
		<tr class="commands">
			<td colspan="6">
				<div>
					<div>
						<input type="number" bind:value={offsetStart} /><button onclick={move}>移動</button>
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
				<td data-errormsg={data.errors.start} bind:textContent={data.start} contenteditable="true"
				></td>
				<td data-errormsg={data.errors.end} bind:textContent={data.end} contenteditable="true"></td>
				<td data-errormsg={data.errors.title} bind:textContent={data.title} contenteditable="true"
				></td>
				<td
					data-errormsg={data.errors.color}
					bind:textContent={data.color}
					contenteditable="true"
					style="background-color:{data.color}"
				></td>
				<td>
					{#if hasError(data.errors)}
						<pre>{oneError(data)}</pre>
					{/if}
				</td>
				<td><button onclick={() => remove(i)}>×</button> </td></tr
			>
		{/each}
	</tbody>
</table>

<style>
	button {
		margin-bottom: 1rem;
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
		button {
			margin: 0;
		}
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
		background-color: pink;
	}
</style>
