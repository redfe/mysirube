<script>
	import { DynamicScroll } from 'svelte-dynamic-scroll';
	import { dateTypes, formatDate, isOverPrevious, isOverNext } from '$lib/dateUtils.js';

	/**
	 * @typedef {import('$lib/dateUtils.js').Level} Level
	 * @typedef {import('$lib/types.d.ts').DateOptions} DateOptions
	 */

	/**
	 * @param {Date} datetime;
	 * @param {DateOptions} dateOptions;
	 * @returns {void}
	 */
	export let handleOnClickCountButton = (datetime, dateOptions) => {
		console.log('handleOnClickCountButton', datetime, dateOptions);
	};

	/** @type {Date=} */
	export let selectedDatetime = undefined;

	/** @type {Level=} */
	export let selectedLevel = undefined;

	const chunkSize = 20;
	const triggerRangeRatio = 0.3;

	/**
	 * @typedef {import('$lib/types.d.ts').DateValue} DateValue
	 */

	let selected = dateTypes[6];
	let initialDatetime = selected.startOf(new Date());

	$: selectedIndex = dateTypes.indexOf(selected);

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
		return { id: selected.format(datetime), datetime: datetime, count: count };
	}

	/**
	 * @param {Date} from
	 * @param {Date} to
	 * @param {number} level
	 */
	async function fetchCounts(from, to, level) {
		const params = {
			from: formatDate(from),
			to: formatDate(to),
			level: '' + level
		};
		const searchParams = new URLSearchParams(params);
		const response = await fetch(`/api/timelines/counts?${searchParams.toString()}`);
		const { counts } = await response.json();
		return counts;
	}

	/**
	 * @param {DateValue=} lastValue
	 * @returns {Promise<DateValue[]>}
	 */
	async function previousChunk(lastValue) {
		let _last = lastValue ?? createValue(selected.increment(initialDatetime, 1), 0);
		if (isOverPrevious(selected.increment(_last.datetime, -1))) {
			return !lastValue ? [_last] : [];
		}
		const to = selected.increment(_last.datetime, 0);
		const from = selected.increment(_last.datetime, -1 * chunkSize);
		const counts = (await fetchCounts(from, to, selected.level)).reverse();
		let array = [];
		for (let i = 0; i < chunkSize; i++) {
			const newDatetime = selected.increment(_last.datetime, -(i + 1));
			if (isOverPrevious(newDatetime)) {
				return array.reverse();
			}
			array.push(createValue(newDatetime, counts[i]?.count ?? 0));
		}
		return array.reverse();
	}

	/**
	 * @param {DateValue=} lastValue
	 * @returns {Promise<DateValue[]>}
	 */
	async function nextChunk(lastValue) {
		let _last = lastValue ?? createValue(selected.increment(initialDatetime, -1), 0);
		if (isOverNext(selected.increment(_last.datetime, 1))) {
			return !lastValue ? [_last] : [];
		}
		const from = selected.increment(_last.datetime, 1);
		const to = selected.increment(_last.datetime, 1 + chunkSize);
		const counts = await fetchCounts(from, to, selected.level);
		let array = [];
		for (let i = 0; i < chunkSize; i++) {
			const newDatetime = selected.increment(_last.datetime, i + 1);
			if (isOverNext(newDatetime)) {
				return array;
			}
			// @ts-ignore
			array.push(createValue(newDatetime, counts[i]?.count ?? 0));
		}
		return array;
	}

	/**
	 * @param {DateValue} value
	 * @param {boolean=} isUp
	 */
	function changeLevel(value, isUp = true) {
		const i = dateTypes.indexOf(selected);
		const nextIndex = isUp ? i - 1 : i + 1;
		if (nextIndex < 0 || nextIndex > dateTypes.length - 1) return;
		selected = dateTypes[nextIndex];
		initialDatetime = selected.startOf(value.datetime);
	}
</script>

<div class="app">
	<div class="timeline" bind:this={timelineElement}>
		{#key initialDatetime}
			<DynamicScroll {previousChunk} {nextChunk} {triggerRangeRatio} bufferSize={1000} let:value>
				{@const _value = /** @type DateValue */ (value)}
				<div class="loading" slot="loading">loading...</div>
				<div
					class="row"
					class:now={_value.datetime <= new Date() &&
						new Date() < selected.increment(_value.datetime, 1)}
					class:selected={selected.level === selectedLevel &&
						_value.datetime.getTime() === selectedDatetime?.getTime()}
				>
					<div class="up">
						{#if selectedIndex !== 0}
							<button on:click={() => changeLevel(_value)}>&lt;</button>
						{/if}
					</div>
					<div class="row-main">
						<div class="row-title">
							{selected.format(_value.datetime)}
						</div>
						<div class="row-count">
							{#if !!_value.count && _value.count > 0}
								<button on:click={() => handleOnClickCountButton(_value.datetime, selected)}
									>{_value.count}</button
								>
							{/if}
						</div>
					</div>
					<div class="down">
						{#if selectedIndex !== dateTypes.length - 1}
							<button on:click={() => changeLevel(_value, false)}>&gt;</button>
						{/if}
					</div>
				</div>
			</DynamicScroll>
		{/key}
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
		background-color: rgba(255, 255, 255, 0.8);
	}
	.up,
	.down {
		width: 50px;
	}
	.up button,
	.down button {
		width: 30px;
		height: 30px;
		font-size: 1rem;
		border-radius: 50%;
		padding: 0;
		margin: 0;
		align-items: center;
		border: solid 1px rgba(0, 0, 0, 0.1);
		cursor: pointer;
		background-color: #efefef;
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
		border-radius: 30px;
		width: 50px;
		height: 100%;
		background-color: rgb(75, 40, 246);
		color: white;
		cursor: pointer;
	}
	.now {
		background-color: rgba(112, 248, 146, 0.8);
	}
	.selected {
		background-color: rgb(239, 168, 151, 0.8);
	}
	.loading {
		text-align: center;
		background-color: rgba(0, 0, 0, 0.5);
	}
</style>
