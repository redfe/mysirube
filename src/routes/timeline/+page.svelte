<script lang="ts">
	import { onMount, untrack } from 'svelte';
	import {
		generatePeriods,
		getUnitPeriod,
		formatYear,
		createLanes,
		tooltip
	} from './timeline.svelte';
	import type { Item } from './timeline.svelte';
	import { colors, search } from '$lib/repository';
	import { generate } from './dummyDataGenerator';
	import { fade, slide } from 'svelte/transition';

	const units = [10000, 5000, 1000, 500, 100, 50, 10, 5, 1];

	// 表示単位
	let unit = $state(100);

	// 表示単位ごとの高さ
	const unitHeight = $derived(25 + (units.length - (units.indexOf(unit) + 1)) * 4);

	// 色選択肢
	let selectableColors: string[] = $state([]);

	// デフォルトの色
	const defaultColor = 'white';

	// 選択中の色
	let selectedColors: string[] = $state([]);

	// 表示アイテム
	let items: Item[] = $state([]);

	// 全件数
	let allCount: number = $state(0);

	// 表示期間
	let periods = $derived(generatePeriods(unit, items));

	// headerの要素
	let header: HTMLElement | undefined = $state();

	// 最上位の表示枠要素
	let first: HTMLElement | undefined = $state();

	// 表示関数
	function display(unit: number, periods: number[], filteredItems: Item[]) {
		const lanes = createLanes(unit, filteredItems);
		lanes.forEach((lane, laneIndex) => {
			const items = lane;
			items.forEach((item) => {
				new Promise(() => displayByItem(item, laneIndex, periods));
			});
		});
	}

	function displayByItem(item: Item, laneIndex: number, periods: number[]) {
		const unitPeriod = getUnitPeriod(item.start, item.end, unit);
		const firstElement = first;
		const firstTop = firstElement?.offsetTop!;
		const itemElement: HTMLElement | null = document.querySelector('#item-' + item.id);
		const unitCount = (unitPeriod.end - unitPeriod.start) / unit + 1;
		const height = unitHeight * unitCount || unitHeight;
		let periodIndex = periods.indexOf(unitPeriod.start);
		itemElement!.style.top = firstTop + periodIndex * unitHeight + 'px';
		itemElement!.style.height = height + 'px';
		const left = 40 * (laneIndex + 1) + 100;
		itemElement!.style.left = left + 'px';
	}

	async function filter() {
		const result = await search({ colors: selectedColors });
		items = result.datas.map((data) => ({
			...data,
			end: data.end == null ? data.start : data.end
		}));
		allCount = result.count;
	}

	$effect(() => {
		display(
			unit,
			untrack(() => periods),
			items
		);
	});

	onMount(async () => {
		const result = await search();
		allCount = result.count;
		// データ読み込み
		items = result.datas.map((data) => ({
			...data,
			end: data.end == null ? data.start : data.end
		}));

		// for test
		//items = generate(-500, 500, 1000).sort((a, b) => a.start - b.start);

		// 表示単位を初期化
		// 20行で収まりそうな初期表示単位の基準値
		const s = Math.abs(items[items.length - 1].end - items[0].start) / 20;
		unit = units.reduce(
			(acc, cur) => (Math.abs(1 - cur / s) < Math.abs(1 - acc / s) ? cur : acc),
			units[0]
		);

		selectableColors = await colors();
		selectedColors = selectableColors;
	});
</script>

<header bind:this={header}>
	<div class="unitSelector">
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
	<div class="count">
		<span>件数:</span>
		<span>{items.length}/{allCount}</span>
	</div>
	<div class="colorSelector">
		{#each selectableColors as color (color)}
			<label class="color"
				><input
					type="checkbox"
					bind:group={selectedColors}
					value={color}
					onchange={() => filter()}
				/>
				<div
					style:background-color={color ? color : defaultColor}
					tabindex="0"
					role="checkbox"
					aria-checked={selectedColors.includes(color)}
					onkeypress={(e) => {
						const target = e.target as HTMLElement;
						if (e.key === ' ' || e.key === 'Enter') {
							target.parentElement?.querySelector('input')?.click();
						}
					}}
				></div>
			</label>
		{/each}
	</div>
</header>
<div
	class="timelineContainer"
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
			style:background-color={item.color ? item.color : defaultColor}
			use:tooltip={{
				backgroundColor: '#000a',
				color: '#ddd',
				padding: '0.25rem'
			}}
			transition:fade
		></div>
	{/each}
</div>

<style>
	:global(body:has(.timelineContainer)) {
		overflow: hidden;
		margin: 0;
		padding: 0;
		:global(main) {
			padding: 0;
		}
	}
	header {
		width: 100%;
		padding: 1rem;
		box-sizing: border-box;
		display: flex;
		gap: 2rem;

		.colorSelector {
			.color {
				padding: 4px;
				opacity: 0.7;
				width: 1.5rem;
				height: 1.5rem;
				display: inline-block;
				border: solid 1px rgba(0, 0, 0, 0.7);
				box-sizing: border-box;
				margin-right: 0.5rem;
				input {
					display: none;
				}
				div {
					width: 100%;
					height: 100%;
				}
			}
			.color:has(input:checked) {
				border-bottom: 3px solid blue;
				padding: 2px;
			}
		}
	}
	.timelineContainer {
		position: relative;
		overflow: scroll;
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
</style>
