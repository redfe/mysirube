<script lang="ts">
	import { untrack } from 'svelte';
	import { generate } from './dummyDataGenerator';
	import { generatePeriods, getUnitPeriod } from './timeline';
	import type { ItemType } from './timeline';

	const units = [10000, 7500, 5000, 2500, 1000, 750, 500, 250, 100, 75, 50, 25, 10, 5, 1];

	// 単位ごとの高さ
	const unitHeight = 30;

	// 歴史アイテム
	const items = generate(-16000, 2024, 150).sort((a, b) => a.start - b.start);

	// 30行で収まりそうな初期表示単位の基準値
	const s = Math.abs(items[items.length - 1].end - items[0].start) / 30;

	// 表示単位
	let unit = $state(
		units.reduce(
			(acc, cur) => (Math.abs(1 - cur / s) < Math.abs(1 - acc / s) ? cur : acc),
			units[0]
		)
	);

	// 表示期間
	let periods = $derived(generatePeriods(unit, items));

	// 表示関数
	async function display(unit: number, periods: number[]) {
		const lanes: ItemType[][] = [];

		items.forEach((item, i) => {
			if (lanes.length === 0) {
				lanes.push([]);
			}
			for (let lane of lanes) {
				const last = lane[lane.length - 1];
				if (!last) {
					lane.push(item);
					return;
				} else {
					const laneEnd = getUnitPeriod(last.start, last.end, unit).end;
					const unitPeriod = getUnitPeriod(item.start, item.end, unit);
					const itemStart = unitPeriod.start;
					if (laneEnd < itemStart) {
						lane.push(item);
						return;
					}
				}
			}
			lanes.push([item]);
		});

		lanes.forEach((lane, laneIndex) => {
			const items = lane;
			items.forEach((item) => {
				displayByItem(item, laneIndex, periods);
			});
		});
	}

	async function displayByItem(item: ItemType, laneIndex: number, periods: number[]) {
		const unitPeriod = getUnitPeriod(item.start, item.end, unit);
		const firstElement = first;
		const firstTop = firstElement.offsetTop;
		const itemElement: HTMLElement | null = document.querySelector('#item-' + item.id);
		const unitCount = (unitPeriod.end - unitPeriod.start) / unit;
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
			t.textContent = node.dataset.title ?? '';
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

	let first: HTMLElement;
</script>

<header>
	<div id="unit">
		<span>単位:</span>
		<button
			title="表示単位を小さくする"
			onclick={() => {
				const next = units[units.indexOf(unit) + 1];
				unit = next ?? units[units.length - 1];
			}}>↓</button
		>
		<button
			title="表示単位を大きくする"
			onclick={() => {
				const next = units[units.indexOf(unit) - 1];
				unit = next ?? units[0];
			}}>↑</button
		>
		<span>{new Intl.NumberFormat().format(unit)}年</span>
	</div>
</header>

<div id="container">
	<ul bind:this={first}>
		{#each periods as p, i (p)}
			<li id="li-{p}" style="height:{unitHeight}px">
				<span>{new Intl.NumberFormat().format(p)}年</span>
			</li>
		{/each}
	</ul>
	{#each items as item (item.id)}
		<div class="bar" id="item-{item.id}" data-title={item.title} use:tooltip></div>
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
		background-color: #acf;
	}
	#container {
		position: relative;
		overflow: scroll;
		height: calc(100lvh - 3rem);
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
		background-color: #ff05;
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
