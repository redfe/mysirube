<script>
	import { DynamicScroll } from 'svelte-dynamic-scroll';
	import CircleButton from '$lib/components/button/CircleButton.svelte';
	import { dateTypes, formatDate, isOverPrevious, isOverNext } from '$lib/dateUtils.js';

	/** @type {DateValue[]}*/
	export let list = [];
	export let dateType = dateTypes[6];
	export let datetime = dateType.startOf(new Date());
	$: initialDatetime = dateType.startOf(datetime);
	$: selectedIndex = dateTypes.indexOf(dateType);

	/**
	 * @typedef {import('$lib/dateUtils.js').Level} Level
	 * @typedef {import('$lib/types.d.ts').DateOptions} DateOptions
	 * @typedef {import('$lib/types.d.ts').DateValue} DateValue
	 */

	/**
	 * @param {Date} datetime;
	 * @param {DateOptions} dateOptions;
	 * @returns {void}
	 */
	export let handleOnClickCountButton = (datetime, dateOptions) => {
		console.log('handleOnClickCountButton', datetime, dateOptions);
	};

	/**
	 * @param {Date} datetime;
	 * @param {DateOptions} dateType;
	 * @returns {void}
	 */
	export let handleOnChangeLevel = (datetime, dateType) => {
		console.log('handleOnChangeLevel', datetime, dateType);
	};

	/** @type {Date=} */
	export let markedDatetime = undefined;

	/** @type {Level=} */
	export let markedLevel = undefined;

	const chunkSize = 20;
	const triggerRangeRatio = 0.3;

	/**
	 * @type {HTMLDivElement}
	 */
	let timelineElement;

	/**
	 * @param {Date} datetime
	 * @param {number} count
	 * @returns {DateValue}
	 */
	function createValue(datetime, count) {
		return { id: dateType.format(datetime), datetime: datetime, count: count };
	}

	/**
	 * @param {Date[]} datetimes
	 */
	async function fetchCounts(datetimes) {
		const params = {
			datetimes: datetimes.map((datetime) => formatDate(datetime)).join(',')
		};
		const searchParams = new URLSearchParams(params);
		const response = await fetch(`/api/timelines/counts?${searchParams.toString()}`);
		/** @type {{counts:{datetime:string, count:number}[]}}*/
		const { counts } = await response.json();
		return counts.map((c) => ({ ...c, datetime: new Date(c.datetime) }));
	}

	/**
	 * @param {Date} from
	 * @param {Date} to
	 * @return {Date[]}
	 */
	function createDatetimes(from, to) {
		const datetimes = [];
		let current = from;
		while (current <= to) {
			datetimes.push(current);
			current = dateType.increment(current, 1);
		}
		return datetimes;
	}

	/**
	 * @param {DateValue=} lastValue
	 * @returns {Promise<DateValue[]>}
	 */
	async function previousChunk(lastValue) {
		let _last = lastValue ?? createValue(dateType.increment(initialDatetime, 1), 0);
		if (isOverPrevious(dateType.increment(_last.datetime, -1))) {
			return !lastValue ? [_last] : [];
		}
		const to = dateType.startOf(_last.datetime);
		const from = dateType.startOf(dateType.increment(_last.datetime, -1 * chunkSize));
		const datetimes = createDatetimes(from, to);
		const counts = await fetchCounts(datetimes);
		/** @type {DateValue[]} */
		let array = [];
		for (let i = 0; i < chunkSize; i++) {
			const newDatetime = dateType.increment(_last.datetime, -(i + 1));
			if (isOverPrevious(newDatetime)) {
				return array.reverse();
			}
			const end = dateType.increment(newDatetime, 1);
			const count = counts.find((c) => newDatetime <= c.datetime && c.datetime < end)?.count ?? 0;
			array.push(createValue(newDatetime, count));
		}
		return array.reverse();
	}

	/**
	 * @param {DateValue=} lastValue
	 * @returns {Promise<DateValue[]>}
	 */
	async function nextChunk(lastValue) {
		let _last = lastValue ?? createValue(dateType.increment(initialDatetime, -1), 0);
		if (isOverNext(dateType.increment(_last.datetime, 1))) {
			return !lastValue ? [_last] : [];
		}
		const from = dateType.increment(_last.datetime, 1);
		const to = dateType.increment(_last.datetime, 1 + chunkSize);
		const datetimes = createDatetimes(from, to);
		const counts = await fetchCounts(datetimes);
		/** @type {DateValue[]} */
		let array = [];
		for (let i = 0; i < chunkSize; i++) {
			const newDatetime = dateType.increment(_last.datetime, i + 1);
			if (isOverNext(newDatetime)) {
				return array;
			}
			const end = dateType.increment(newDatetime, 1);
			const count = counts.find((c) => newDatetime <= c.datetime && c.datetime < end)?.count ?? 0;
			array.push(createValue(newDatetime, count));
		}
		return array;
	}

	/**
	 * @param {DateValue} value
	 * @param {boolean=} isUp
	 */
	function changeLevel(value, isUp = true) {
		const i = dateTypes.indexOf(dateType);
		const nextIndex = isUp ? i - 1 : i + 1;
		if (nextIndex < 0 || nextIndex > dateTypes.length - 1) return;
		const _type = dateTypes[nextIndex];
		handleOnChangeLevel(_type.startOf(value.datetime), _type);
	}
</script>

<div class="app">
	<div class="timeline" bind:this={timelineElement}>
		<DynamicScroll
			bind:list
			{previousChunk}
			{nextChunk}
			{triggerRangeRatio}
			bufferSize={1000}
			let:value
		>
			{@const _value = /** @type DateValue */ (value)}
			<div class="loading" slot="loading">loading...</div>
			<div
				class="row"
				class:now={_value.datetime <= new Date() &&
					new Date() < dateType.increment(_value.datetime, 1)}
				class:marked={dateType.level === markedLevel &&
					_value.datetime.getTime() === markedDatetime?.getTime()}
			>
				<!-- レベルアップボタン -->
				<div class="up">
					{#if selectedIndex !== 0}
						<CircleButton on:click={() => changeLevel(_value)}>&lt;</CircleButton>
					{/if}
				</div>

				<!-- メイン -->
				<div class="row-main">
					<div class="row-title">
						{dateType.format(_value.datetime)}
					</div>
					<div class="row-count">
						{#if !!_value.count && _value.count > 0}
							<button on:click={() => handleOnClickCountButton(_value.datetime, dateType)}
								>{_value.count}</button
							>
						{/if}
					</div>
				</div>

				<!-- レベルダウンボタン -->
				<div class="down">
					{#if selectedIndex !== dateTypes.length - 1}
						<CircleButton on:click={() => changeLevel(_value, false)}>&gt;</CircleButton>
					{/if}
				</div>
			</div>
		</DynamicScroll>
	</div>
	<div class="end" />
</div>

<style>
	.app {
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
	}
	.timeline {
		height: 100%;
		width: 100%;
		overflow-y: hidden;
	}
	.row {
		border: none;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		height: 100px;
		width: 100%;
		overflow: hidden;
		padding: 20px;
		box-sizing: border-box;
		display: flex;
		background-color: var(--color-base-bg);
	}
	.up,
	.down {
		width: 30px;
		height: 30px;
	}
	.row-main {
		flex-grow: 1;
		display: flex;
		justify-content: center;
		flex-direction: column;
	}
	.row-main div {
		display: block;
		text-align: center;
	}
	.row-count {
		height: 30px;
	}
	.row-count button {
		margin-top: 10px;
		border: none;
		border-radius: var(--radius-base-border);
		width: 50px;
		height: 100%;
		background-color: var(--color-primary-bg);
		color: var(--color-primary-font);
		cursor: pointer;
	}
	.now {
		background-color: var(--color-heighlight-bg);
	}
	.marked {
		background-color: var(--color-content-bg);
	}
	.loading {
		text-align: center;
		background-color: rgba(0, 0, 0, 0.5);
	}
</style>
