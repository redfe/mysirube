<script lang="ts">
	type Data = {
		start: string;
		end?: string;
		title: string;
		color?: string;
	};

	let start: string = $state('');
	let end: string = $state('');
	let title: string = $state('');
	let color: string = $state('');
	let datas: Data[] = $state([]);
	let startElm: HTMLElement;

	function add() {
		datas.push({ start, end, title, color });
		start = '';
		end = '';
		title = '';
		startElm?.focus();
	}

	function sort() {
		datas.sort((a, b) => parseInt(a.start) - parseInt(b.start));
	}

	function remove(index: number) {
		datas.splice(index, 1);
	}

	$effect(() => {
		if (startElm) startElm.focus();
	});
</script>

<table>
	<thead>
		<tr>
			<th>開始年</th>
			<th>終了年</th>
			<th>タイトル</th>
			<th>色</th>
			<th></th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td bind:textContent={start} contenteditable="true" bind:this={startElm}></td>
			<td bind:textContent={end} contenteditable="true"></td>
			<td bind:textContent={title} contenteditable="true"></td>
			<td bind:textContent={color} contenteditable="true"></td>
			<td style="background-color:{color}"
				><button onclick={add}>追加</button><button onclick={sort}>ソート</button></td
			>
		</tr>
		{#each datas as data, i (i)}
			<tr>
				<td bind:textContent={data.start} contenteditable="true"></td>
				<td bind:textContent={data.end} contenteditable="true"></td>
				<td bind:textContent={data.title} contenteditable="true"></td>
				<td bind:textContent={data.color} contenteditable="true"></td>
				<td style="background-color:{data.color}"><button onclick={() => remove(i)}>×</button> </td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table,
	th,
	td {
		border-collapse: collapse;
		border: solid 1px;
		padding: 0.5rem;
	}
	thead th:nth-child(1) {
		width: 7rem;
	}
	thead th:nth-child(2) {
		width: 7rem;
	}
	thead th:nth-child(3) {
		width: 14rem;
	}
	thead th:nth-child(4) {
		width: 4rem;
	}
	thead th:nth-child(4) {
		width: 4rem;
	}
	thead th:nth-child(5) {
		width: 7rem;
	}
	tbody tr:nth-child(1) {
		td:nth-child(5) {
			display: flex;
			gap: 0.5rem;
			border: none;
		}
	}
</style>
