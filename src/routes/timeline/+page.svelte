<script lang="ts">
	import { onMount, tick, untrack } from 'svelte';
	import {
		generatePeriods,
		getUnitPeriod,
		formatYear,
		createLanes,
		tooltip,
		fadeWithTooltip
	} from './timeline.svelte';
	import type { Item } from './timeline.svelte';
	import {
		colors,
		getCurrentThemeId,
		getTheme,
		getThemeSummaries,
		removeTheme,
		saveCurrentThemeId,
		saveTheme,
		search,
		type ThemeSummary
	} from '$lib/repository';
	import Button from '$lib/components/core/Button.svelte';
	import Typograph from '$lib/components/core/Typograph.svelte';
	import StartYearChange from '$lib/components/custom/StartYearChange.svelte';
	import ColorFilter from '$lib/components/custom/ColorFilter.svelte';
	import ThemeSelector from '$lib/components/custom/ThemeSelector.svelte';
	import { EditTheme } from '../edit/data.svelte';
	import ThemeEditor from '$lib/components/custom/ThemeEditor.svelte';
	import Switch from '$lib/components/core/Switch.svelte';

	// 表示単位
	const units = [10000, 5000, 1000, 500, 100, 50, 10, 5, 1];

	// 上部の余白幅（範囲外表示用）
	const paddingTop = 20;

	// 初期化フラグ
	let initialized = $state(false);

	// ローディングフラグ
	let loading = $state(true);

	// 表示単位
	let unit = $state(100);

	// 表示単位ごとの高さ
	const unitHeight = $derived(25 + (units.length - (units.indexOf(unit) + 1)) * 7);

	// デフォルトの色
	const defaultColor = 'white';

	// 色選択肢
	let selectableColors: string[] = $state([]);

	// 選択中の色
	let selectedColors: string[] = $state([]);

	// 補色選択肢
	let selectableSubColors: string[] = $state([]);

	// 選択中の補色
	let selectedSubColors: string[] = $state([]);

	// 表示アイテム
	let items: Item[] = $state([]);

	// アイテムの横幅
	const itemWidth: number = 30;

	// 全件数
	let allCount: number = $state(0);

	// 最上位の表示枠要素
	let first: HTMLElement | undefined = $state();

	// 表示開始年のバインド値
	let startValue: number | undefined = $state();

	// 表示開始年
	let offsetStartYear: number | undefined = $state();

	// 表示期間
	let periods = $derived(generatePeriods(unit, items, offsetStartYear));

	// 年表要素
	let timelineElm: HTMLElement | undefined = $state();

	// テーマフラグ
	let isViewThemeSelector = $state(false);
	let isViewThemeEditor = $state(false);

	// テーマ
	let editTheme: EditTheme = $state(new EditTheme());

	// テーマに紐づいたアイテムの選択フラグ
	let isFilterTheme = $state(false);

	// 期間選択フラグ
	let isSelecting = $state(false);

	// 期間選択開始年
	let selectStartYear: number | undefined = $state();

	// 期間選択終了年
	let selectEndYear: number | undefined = $state();

	const seleletablePeriod = (node: HTMLElement, { period }: { period: number }) => {
		// mouseenter、mouseleave、イベントでclassを設定すると抜けが出やすいので期間の範囲で選択状態を管理
		node.addEventListener('mousedown', () => {
			isSelecting = true;
			selectStartYear = period;
			selectEndYear = undefined;
		});
		node.addEventListener('mouseup', () => {
			isSelecting = false;
			selectEndYear = period;
		});
		node.addEventListener('mouseenter', (e) => {
			if (!isSelecting) return;
			selectEndYear = period;
		});
	};

	function isSelected(period: number) {
		if (selectStartYear && selectEndYear) {
			const start = Math.min(selectStartYear, selectEndYear);
			const end = Math.max(selectStartYear, selectEndYear);
			return period >= start && period <= end;
		}
		return false;
	}

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

	// 表示関数
	function display(unit: number, periods: number[], filteredItems: Item[]) {
		const lanes = createLanes(unit, filteredItems);
		lanes.forEach((lane, laneIndex) => {
			const items = lane;
			items.forEach((item) => {
				Promise.resolve().then(() => displayByItem(item, laneIndex, periods));
			});
		});
		// 横線が最大まで伸びるように幅を調整
		first!.style.width = 200 + lanes.length * (itemWidth + 10) + 130 + 'px';
	}

	function displayByItem(item: Item, laneIndex: number, periods: number[]) {
		const isOverWrap = offsetStartYear != null && item.start < offsetStartYear;
		const unitPeriod = getUnitPeriod(isOverWrap ? offsetStartYear! : item.start, item.end, unit);
		const firstElement = first;
		const firstTop = firstElement?.offsetTop!;
		const itemElement: HTMLElement | null = document.querySelector('#item-' + item.id);
		const beforeLayout = {
			left: itemElement!.offsetLeft,
			top: itemElement!.offsetTop,
			height: itemElement!.offsetHeight,
			width: itemElement!.offsetWidth
		};
		const unitCount = (unitPeriod.end - unitPeriod.start) / unit + 1;
		const height = unitHeight * unitCount || unitHeight;
		let periodIndex = periods.indexOf(unitPeriod.start);
		itemElement!.style.top =
			firstTop + periodIndex * unitHeight + 2 + (isOverWrap ? -(paddingTop + 3) : 0) + 'px';
		itemElement!.style.height = height - 3 + (isOverWrap ? paddingTop + 3 : 0) + 'px';
		const left = (10 + itemWidth) * laneIndex + 130;
		itemElement!.style.left = left + 'px';

		// レイアウト更新イベントを発火（ツールチップの位置調整用）
		const afterLayout = {
			left: parseInt(itemElement!.style.left),
			top: parseInt(itemElement!.style.top),
			height: parseInt(itemElement!.style.height),
			width: itemWidth
		};
		if (
			beforeLayout.left !== afterLayout.left ||
			beforeLayout.top !== afterLayout.top ||
			beforeLayout.height !== afterLayout.height
		) {
			itemElement!.dispatchEvent(
				new CustomEvent('timelineLayoutUpdate', {
					detail: {
						left: parseInt(itemElement!.style.left),
						top: parseInt(itemElement!.style.top),
						height: parseInt(itemElement!.style.height),
						width: itemWidth
					}
				})
			);
		}
	}

	async function filter() {
		loading = true;
		const result = await search({
			start: offsetStartYear,
			colors: selectableColors.length === 0 ? undefined : selectedColors,
			subColors: selectableSubColors.length === 0 ? undefined : selectedSubColors,
			ids: isFilterTheme ? editTheme.dataIds : undefined,
			isIncludeOverrap: true
		});
		items = result.datas.map((data) => ({
			...data,
			end: data.end == null ? data.start : data.end
		}));
		allCount = result.count;
		loading = false;
	}

	function moveStartYear() {
		offsetStartYear = startValue;
		filter();
	}

	function resizeTimelineElm() {
		if (timelineElm) timelineElm.style.height = `calc(100lvh - ${timelineElm.offsetTop}px)`;
	}

	$effect(() => {
		if (initialized) {
			loading = false;
		}
		display(
			unit,
			untrack(() => periods),
			items
		);
	});

	onMount(async () => {
		// テーマを復元
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

		// 表示開始年を初期化
		offsetStartYear = startValue;

		await filter();

		// 表示単位を初期化
		// 20行で収まりそうな初期表示単位の基準値
		const s = Math.abs((items[items.length - 1]?.end ?? 0) - (items[0]?.start ?? 0)) / 20;
		unit = units.reduce(
			(acc, cur) => (Math.abs(1 - cur / s) < Math.abs(1 - acc / s) ? cur : acc),
			units[0]
		);

		// 色選択肢を初期化
		const { colors: mainColors, subColors } = await colors();
		selectableColors = mainColors;
		selectedColors = selectableColors;
		selectableSubColors = subColors;
		selectedSubColors = selectableSubColors;

		// 年表のサイズを初期化
		resizeTimelineElm();

		initialized = true;
	});
</script>

<svelte:head><title>Myしるべ：タイムライン</title></svelte:head>

<svelte:window onresize={resizeTimelineElm} />

<div class="root">
	<div class="commands">
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
		<StartYearChange label="表示開始年" move={moveStartYear} bind:startYear={startValue} />
		<div class="count" style="width: 10rem;">
			{#if loading}
				<Typograph>Loading...</Typograph>
			{:else}
				<Typograph>件数:</Typograph>
				<Typograph>{items.length}/{allCount}</Typograph>
			{/if}
		</div>
		<ColorFilter bind:selectableColors bind:selectedColors {defaultColor} {filter} />
		<div class="color-separator"><span></span></div>
		<ColorFilter
			bind:selectableColors={selectableSubColors}
			bind:selectedColors={selectedSubColors}
			{defaultColor}
			{filter}
			type="sub"
		/>
		<div>
			<Typograph></Typograph>
			<Button
				onclick={() => {
					isViewThemeSelector = true;
					isViewThemeEditor = false;
				}}>テーマ</Button
			>
			<Typograph>{editTheme.title}</Typograph>
			{#if editTheme.isValid()}
				<Button
					onclick={() => {
						isViewThemeEditor = true;
					}}>編集</Button
				>
				<Switch bind:on={isFilterTheme} onchange={() => filter()}></Switch>
			{/if}
		</div>
	</div>
	<div class="timelineContainer" bind:this={timelineElm} style={`padding-top: ${paddingTop}px;`}>
		<ul bind:this={first}>
			{#each periods as p (p)}
				<li
					id="li-{p}"
					style="height:{unitHeight}px"
					use:seleletablePeriod={{ period: p }}
					class:selected={isSelected(p)}
				>
					<span>{formatYear(p)}</span>
				</li>
			{/each}
		</ul>
		{#each items as item (item.id)}
			<div
				class="bar"
				class:not-theme={editTheme.isValid() && !editTheme.dataIds?.includes(item.id)}
				id="item-{item.id}"
				data-start={item.start}
				data-end={item.end}
				data-title={item.title}
				style:background={`linear-gradient(90deg, ${item.color ? item.color : defaultColor} 0% 80%, ${item.subColor ? item.subColor : defaultColor} 80%)`}
				style:width={`${itemWidth}px`}
				use:tooltip
				transition:fadeWithTooltip
			></div>
		{/each}
	</div>
	{#if isViewThemeSelector}
		<ThemeSelector
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
				filter();
			}}
			onclickRemove={(id) => {
				if (confirm('削除しますか？')) {
					removeTheme(id);
					if (editTheme.id === id) {
						editTheme = new EditTheme();
						filter();
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
</div>

<style>
	:global(body:has(.timelineContainer)) {
		margin: 0;
		padding: 0;
		overflow: hidden;
		:global(main) {
			padding: 0;
		}
	}
	.root {
		width: 100%;
	}
	.commands {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
		padding: 0.25rem 1rem;
		justify-content: center;
		box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.2);
	}
	@media (max-width: 768px) {
		.commands {
			gap: 0;
			padding: 0.5rem;
		}
	}
	.timelineContainer {
		position: relative;
		overflow: auto;
		box-sizing: border-box;
		padding-bottom: 2rem;
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
		min-width: 100lvw;
		user-select: none;
		&:hover {
			background-color: lightblue;
		}
		:global(&.selected) {
			background-color: lightsteelblue;
		}
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
		border: solid 1px gray;
		box-sizing: border-box;
		position: absolute;
		transition:
			left 0.5s,
			top 0.5s,
			height 0.5s;
		&.not-theme {
			opacity: 0.1;
		}
	}
	.color-separator {
		display: flex;
		align-items: center;
		justify-content: center;
		span {
			border-left: 3px double gray;
			width: 1px;
			height: 1rem;
		}
	}
	.root :global(.tooltip) {
		background-color: #000;
		color: #ddd;
		padding: 0.25rem;
		border-radius: 0.25rem;
		opacity: 0.7;
	}
	.root :global(.tooltip.pinned) {
		--tooltip-arrow-size: 5px;
		&::before {
			content: '';
			position: absolute;
			top: calc(50% - var(--tooltip-arrow-size));
			left: calc(-1 * 2 * var(--tooltip-arrow-size));
			border-style: solid;
			border-width: var(--tooltip-arrow-size);
			border-color: transparent #000 transparent transparent; /* 矢印の色 */
		}
	}
</style>
