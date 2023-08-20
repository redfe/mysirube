<script>
	import { formatDate } from '$lib/dateUtils';
	import { DynamicScroll } from 'svelte-dynamic-scroll';

	/**
	 * @typedef {import('$lib/types').Summary} Summary
	 */

	/** @type {Date} */
	export let from = new Date();

	/** @type {Date} */
	export let to = new Date();

	let isFetchedAll = false;

	/** @type {string[]} */
	let loadedIds = [];

	/**
	 * @param {Date} from
	 * @param {Date} to
	 * @param {number} offset
	 * @param {number} count
	 * @returns {Promise<Summary[]>}
	 */
	async function fetchSummaries(from, to, offset, count) {
		const params = {
			from: formatDate(from),
			to: formatDate(to),
			offset: '' + offset,
			count: '' + count
		};
		const searchParams = new URLSearchParams(params);
		const response = await fetch(`/api/timelines/summaries?${searchParams.toString()}`);

		/** @type {{summaries: Summary[]}} */
		const { summaries } = await response.json();
		return summaries.map((data) => ({
			id: data.id,
			datetime: new Date(data.datetime),
			text: data.text
		}));
	}

	/**
	 * @returns {Promise<Summary[]>}
	 */
	async function nextChunk() {
		if (isFetchedAll) return [];
		const summaries = await fetchSummaries(from, to, loadedIds.length ?? 0, 20);
		const results = summaries.filter((data) => data.id !== loadedIds.find((id) => id === data.id));
		loadedIds = [...loadedIds, ...results.map((data) => data.id)];
		if (summaries.length === 0) {
			isFetchedAll = true;
		}
		return results;
	}
</script>

<div class="app">
	<div class="summaries">
		<DynamicScroll {nextChunk} let:value>
			{@const _value = /** @type {Summary} */ (value)}
			<div class="loading" slot="loading">loading...</div>
			<div class="row">
				<div class="datetime">{formatDate(_value.datetime, 'G y年M月d日 H時m分s.SSS秒')}</div>
				<div class="text">
					{_value.text}
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
	.summaries {
		height: 100%;
		width: 100%;
		background-color: rgb(239, 168, 151, 0.8);
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
		flex-direction: column;
	}
	.text {
		padding-top: 8px;
		font-size: 0.8rem;
		color: rgba(0, 0, 0, 0.5);
		cursor: pointer;
	}
	.loading {
		text-align: center;
		background-color: rgba(0, 0, 0, 0.5);
	}
</style>
