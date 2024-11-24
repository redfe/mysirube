<script lang="ts">
	import { onMount, untrack } from 'svelte';
	import { generatePeriods, getUnitPeriod, formatYear, createLanes } from './timeline';
	import type { Item } from './timeline';
	import { getAllData } from '$lib/repository';

	const units = [10000, 5000, 2000, 1000, 500, 200, 100, 50, 20, 10, 5, 2, 1];

	// 表示単位
	let unit = $state(100);

	// 表示単位ごとの高さ
	const unitHeight = $derived(25 + (units.length - (units.indexOf(unit) + 1)) * 4);

	// 表示アイテム
	let items: Item[] = $state([]);

	// 表示期間
	let periods = $derived(generatePeriods(unit, items));

	// headerの要素
	let header: HTMLElement | undefined = $state();

	// 最上位の表示枠要素
	let first: HTMLElement | undefined = $state();

	// 表示関数
	async function display(unit: number, periods: number[]) {
		const lanes = createLanes(unit, items);
		lanes.forEach((lane, laneIndex) => {
			const items = lane;
			items.forEach((item) => {
				displayByItem(item, laneIndex, periods);
			});
		});
	}

	async function displayByItem(item: Item, laneIndex: number, periods: number[]) {
		const unitPeriod = getUnitPeriod(item.start, item.end, unit);
		const firstElement = first;
		const firstTop = firstElement?.offsetTop!;
		const itemElement: HTMLElement | null = document.querySelector('#item-' + item.id);
		const unitCount = (unitPeriod.end - unitPeriod.start) / unit + 1;
		const height = unitHeight * unitCount || unitHeight;
		itemElement!.style.left = '50px';
		let periodIndex = periods.indexOf(unitPeriod.start);
		itemElement!.style.top = firstTop + periodIndex * unitHeight + 'px';
		itemElement!.style.height = height + 'px';
		const left = 40 * (laneIndex + 1) + 100;
		itemElement!.style.left = left + 'px';
	}

	// ツールチップ表示アクション
	// 参考：https://svelte.dev/tutorial/svelte/adding-parameters-to-actions
	function tooltip(node: HTMLElement) {
		$effect(() => {
			const t = document.createElement('div');
			t.classList.add('tooltip');
			t.style.position = 'absolute';
			t.style.visibility = 'hidden';
			t.textContent = `${formatYear(parseInt(node.dataset.start!))}${node.dataset.start === node.dataset.end ? '' : '〜' + formatYear(parseInt(node.dataset.end!))} ${node.dataset.title}`;
			document.body.append(t);

			const mouseover = (e: Event) => {
				e.preventDefault();
				t.style.visibility = 'visible';
			};

			const mousemove = (e: Event) => {
				e.preventDefault();
				const { clientX, clientY } = e as MouseEvent;
				t.style.top = `${clientY}px`;
				t.style.left = `${clientX + 10}px`;
			};

			const mouseleave = (e: Event) => {
				e.preventDefault();
				t.style.visibility = 'hidden';
			};

			node.addEventListener('mouseover', mouseover);
			node.addEventListener('mousemove', mousemove);
			node.addEventListener('mouseleave', mouseleave);

			return () => {
				node.removeEventListener('mouseover', mouseover);
				node.removeEventListener('mousemove', mousemove);
				node.removeEventListener('mouseleave', mouseleave);
			};
		});
	}

	$effect(() => {
		display(
			unit,
			untrack(() => periods)
		);
	});

	onMount(async () => {
		// データ読み込み
		items = (await getAllData())
			.map((data) => ({
				...data,
				end: data.end == null ? data.start : data.end
			}))
			.sort((a, b) => a.start - b.start);

		// 20行で収まりそうな初期表示単位の基準値
		const s = Math.abs(items[items.length - 1].end - items[0].start) / 20;

		// 表示単位
		unit = units.reduce(
			(acc, cur) => (Math.abs(1 - cur / s) < Math.abs(1 - acc / s) ? cur : acc),
			units[0]
		);
	});
</script>

<header bind:this={header}>
	<div id="unit">
		<span>単位:</span>
		<button
			title="表示単位を小さくする"
			onclick={() => {
				const next = units[units.indexOf(unit) + 1];
				unit = next ?? units[units.length - 1];
			}}>-</button
		>
		<button
			title="表示単位を大きくする"
			onclick={() => {
				const next = units[units.indexOf(unit) - 1];
				unit = next ?? units[0];
			}}>+</button
		>
		<span>{formatYear(unit)}</span>
	</div>
</header>

<div
	id="container"
	style:height={`calc(100lvh - ${(header?.offsetTop ?? 0) + (header?.offsetHeight ?? 0)}px)`}
>
	<ul bind:this={first}>
		{#each periods as p, i (p)}
			<li id="li-{p}" style="height:{unitHeight}px">
				<span>{formatYear(p)}</span>
			</li>
		{/each}
	</ul>
	{#each items as item (item.id)}
		<div
			class="bar"
			id="item-{item.id}"
			data-start={item.start}
			data-end={item.end}
			data-title={item.title}
			style:background-color={item.color ? item.color : undefined}
			use:tooltip
		></div>
	{/each}
</div>

<style>
	:global body {
		padding: 0;
		margin: 0;
		overflow: hidden;
	}
	header {
		width: 100%;
		padding: 0.75rem;
		box-sizing: border-box;
	}
	#container {
		position: relative;
		overflow: scroll;
		width: 100lvw;
		box-sizing: border-box;
	}
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}
	li {
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		box-sizing: border-box;
	}
	li span {
		display: inline-block;
		width: 7rem;
		text-align: right;
	}
	.bar {
		white-space: nowrap;
		background-color: yellow;
		opacity: 0.7;
		width: 30px;
		border: solid 1px rgba(0, 0, 0, 0.3);
		box-sizing: border-box;
		position: absolute;
		transition:
			left 0.5s,
			top 0.5s,
			height 0.5s;
	}
	:global(.tooltip) {
		background-color: #000a;
		color: #ddd;
		padding: 0.25rem;
	}
</style>
