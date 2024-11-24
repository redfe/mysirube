<script lang="ts">
	import { EditData } from './data.svelte';
	import { getAllData, save as saveData } from '$lib/repository';

	let newData = $state(new EditData());
	let datas: EditData[] = $state([]);
	let startElm: HTMLElement;

	function add() {
		if (!newData.isValid()) {
			return;
		}
		let temp = new EditData();
		temp.start = newData.start;
		temp.end = newData.end;
		temp.title = newData.title;
		temp.color = newData.color;
		datas.push(temp);
		newData.start = '';
		newData.end = '';
		newData.title = '';
		startElm?.focus();
	}

	function sort() {
		datas.sort((a, b) => (a.start ? parseInt(a.start) : 0) - (b.start ? parseInt(b.start) : 0));
	}

	function remove(index: number) {
		datas.splice(index, 1);
	}

	function hasError(errors: Record<string, string>) {
		return Object.keys(errors).length > 0;
	}

	function oneError(data: EditData) {
		return [data.errors.start, data.errors.end, data.errors.title, data.errors.color].filter(
			(v) => !!v
		)[0];
	}

	function hasErrorDatas() {
		return datas.filter((data) => hasError(data.errors)).length > 0;
	}

	async function save() {
		if (hasErrorDatas()) {
			alert('エラーを修正して下さい！');
			return;
		}
		await saveData(
			datas.map((data) => ({
				id: data.id,
				start: parseInt(data.start!),
				end: !!data.end ? parseInt(data.end) : undefined,
				title: data.title!,
				color: data.color
			}))
		);
		alert('保存しました！');
	}

	$effect(() => {
		if (startElm) startElm.focus();
	});

	$effect(() => {
		getAllData().then((r) => {
			datas = r
				.sort((a, b) => a.start - b.start)
				.map(
					(d) =>
						new EditData({
							id: d.id,
							start: `${d.start}`,
							end: `${d.end ?? ''}`,
							title: d.title,
							color: d.color
						})
				);
		});
	});
</script>

<button onclick={save} disabled={hasErrorDatas()}>保存</button>

<table>
	<thead>
		<tr>
			<th>開始年</th>
			<th>終了年</th>
			<th>タイトル</th>
			<th>色</th>
			<th>エラー</th>
			<th><button onclick={sort}>ソート</button></th>
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
			<td></td>
		</tr>
		<tr>
			<td colspan="6">
				<button onclick={add} disabled={hasError(newData.errors)}>追加</button>
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
		padding: 0.5rem;
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
		tr:nth-child(2) {
			td {
				text-align: center;
				button {
					font-size: 2rem;
					text-align: justify;
					text-align-last: justify;
					padding-left: 2.5rem;
					padding-right: 2.5rem;
					width: 10rem;
				}
			}
		}
		tr:nth-child(n + 2) {
			td:nth-child(5) {
				font-weight: bold;
				color: red;
				border-color: black;
				pre {
					margin: 0;
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
