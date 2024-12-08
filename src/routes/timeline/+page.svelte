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
	import { fade } from 'svelte/transition';
	import Button from '$lib/components/core/Button.svelte';
	import Typograph from '$lib/components/core/Typograph.svelte';
	import StartYearChange from '$lib/components/custom/StartYearChange.svelte';
	import ColorFilter from '$lib/components/custom/ColorFilter.svelte';

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

	// 最上位の表示枠要素
	let first: HTMLElement | undefined = $state();

	// 表示開始年のバインド値
	let startValue: number | undefined = $state();

	// 表示開始年
	let offsetStartYear: number | undefined = $state();

	// 年表要素
	let timelineElm: HTMLElement | undefined = $state();

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
		const result = await search({ start: offsetStartYear, colors: selectedColors });
		items = result.datas.map((data) => ({
			...data,
			end: data.end == null ? data.start : data.end
		}));
		allCount = result.count;
	}

	function move() {
		offsetStartYear = startValue;
		filter();
	}

	function resizeTimelineElm() {
		if (timelineElm) timelineElm.style.height = `calc(100lvh - ${timelineElm.offsetTop}px)`;
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

		// 色選択肢を初期化
		selectableColors = await colors();
		selectedColors = selectableColors;

		// 年表のサイズを初期化
		resizeTimelineElm();
	});
</script>

<svelte:head><title>Myしるべ：年表</title></svelte:head>

<svelte:window onresize={resizeTimelineElm} />

<div class="root">
	<header>
		<div class="unitSelector">
			<Typograph>単位:</Typograph>
			<Button
				title="表示単位を小さくする"
				onclick={() => {
					const next = units[units.indexOf(unit) + 1];
					unit = next ?? units[units.length - 1];
				}}>-</Button
			>
			<Button
				title="表示単位を大きくする"
				onclick={() => {
					const next = units[units.indexOf(unit) - 1];
					unit = next ?? units[0];
				}}>+</Button
			>
			<Typograph>{formatYear(unit)}</Typograph>
		</div>
		<StartYearChange label="表示開始年" {move} bind:startYear={startValue} />
		<div class="count">
			<Typograph>件数:</Typograph>
			<Typograph>{items.length}/{allCount}</Typograph>
		</div>
		<ColorFilter bind:selectableColors bind:selectedColors {defaultColor} {filter} />
	</header>
	<div class="timelineContainer" bind:this={timelineElm}>
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
	.root {
		width: 100%;
	}
	header {
		width: 100%;
		padding: 1rem;
		box-sizing: border-box;
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
		justify-content: center;
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
