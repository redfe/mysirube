<script>
	import Timeline from './Timeline.svelte';
	import Summaries from './Summaries.svelte';
	import { fade, fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { dateTypes, formatDate, getDateType } from '$lib/dateUtils.js';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import Form from './Form.svelte';
	import { cubicInOut } from 'svelte/easing';

	/**
	 * @typedef {import('$lib/dateUtils.js').Level} Level
	 * @typedef {import('$lib/types.d.ts').DateOptions} DateOptions
	 */

	const timelineWidth = 500;

	/**
	 * @param {string} name
	 */
	function getParam(name) {
		return $page.url.searchParams.get(name);
	}

	let datetime = new Date(getParam('datetime') ?? formatDate(new Date()));

	let dateType = getDateType(getParam('dateType') ?? dateTypes[6].label) ?? dateTypes[6];

	let isLevelUp = false;

	let isViewForm = false;

	$: {
		if (browser) {
			$page.url.searchParams.set('datetime', formatDate(datetime));
			$page.url.searchParams.set('dateType', dateType.label);
			if (summariesFrom) {
				$page.url.searchParams.set('summariesDatetime', formatDate(summariesFrom));
			} else {
				$page.url.searchParams.delete('summariesDatetime');
			}
			if (summariesDateType) {
				$page.url.searchParams.set('summariesDateType', summariesDateType.label);
			} else {
				$page.url.searchParams.delete('summariesDateType');
			}
			goto(`?${$page.url.searchParams.toString()}`);
		}
	}

	let isViewSummaries = !!getParam('summariesDatetime') && !!getParam('summariesDateType');

	/** @type {Date=} */
	let summariesFrom = new Date(getParam('summariesDatetime') ?? formatDate(new Date()));

	/** @type {DateOptions=} */
	let summariesDateType = getDateType(getParam('summariesDateType') ?? dateTypes[6].label);

	$: {
		if (!isViewSummaries) {
			summariesFrom = undefined;
			summariesDateType = undefined;
		}
	}

	/**
	 * @param {Date} datetime
	 * @param {DateOptions} dateType
	 */
	function handleOnClickCountButton(datetime, dateType) {
		if (summariesFrom === datetime) {
			isViewSummaries = !isViewSummaries;
		} else {
			isViewSummaries = true;
		}
		summariesFrom = datetime;
		summariesDateType = dateType;
	}

	/**
	 * @param {Date} _datetime;
	 * @param {DateOptions} _dateType;
	 * @returns {void}
	 */
	function handleOnChangeLevel(_datetime, _dateType) {
		isLevelUp = dateTypes.indexOf(dateType) < dateTypes.indexOf(_dateType);
		datetime = _datetime;
		dateType = _dateType;
	}

	/** @type {number} */
	let clientWidth;

	function initializeClientWidth() {
		clientWidth = document.body.clientWidth;
	}

	onMount(() => {
		initializeClientWidth();
		window.addEventListener('resize', initializeClientWidth);
	});

	/** @type {string=}*/
	let formError;
	$: if (!isViewForm) formError = undefined;

	/**
	 * @param {string} datetimeValue
	 * @param {string} content
	 * @param {string} tags
	 */
	async function save(datetimeValue, content, tags) {
		const ret = await fetch('/api/timelines', {
			method: 'POST',
			body: JSON.stringify({
				datetime: datetimeValue,
				content,
				tags
			})
		});
		if (!ret.ok) {
			/** @type {{message: string}}*/
			const json = await ret.json();
			formError = json.message;
			isViewForm = true;
		} else {
			isViewForm = false;
		}
	}
</script>

<main>
	<article>
		{#key summariesFrom}
			<!-- アニメーションさせたいので display:none で非表示にする -->
			<div
				class="summaries"
				style:display={isViewSummaries ? 'block' : 'none'}
				style:width={timelineWidth + 'px'}
				style:left={`${(clientWidth - timelineWidth) / 2 + timelineWidth / 2}px`}
				transition:fly={{ x: -timelineWidth, duration: 500 }}
			>
				<Summaries
					from={summariesFrom}
					to={summariesDateType?.increment(summariesFrom ?? new Date(), 1)}
				/>
				<button class="close" on:click={() => (isViewSummaries = false)}>×</button>
			</div>
		{/key}

		{#key datetime}
			<div
				class="timeline"
				style:width={timelineWidth + 'px'}
				style:left={isViewSummaries
					? `${(clientWidth - timelineWidth) / 2 - timelineWidth / 2}px`
					: `${(clientWidth - timelineWidth) / 2}px`}
				in:fly={{ x: timelineWidth * (isLevelUp ? 1 : -1), duration: 500 }}
				out:fly={{ x: timelineWidth * (isLevelUp ? -1 : 1), duration: 500, opacity: 0.2 }}
			>
				<Timeline
					{datetime}
					{dateType}
					{handleOnClickCountButton}
					{handleOnChangeLevel}
					markedDatetime={summariesFrom}
					markedLevel={summariesDateType?.level}
				/>
			</div>
		{/key}
	</article>
	<button class="add" on:click={() => (isViewForm = true)}>+</button>
	{#if isViewForm}
		<div class="form" transition:fade={{ easing: cubicInOut }}>
			<Form
				handleOnClickCancelButton={() => (isViewForm = false)}
				handleOnSave={async (datetimeValue, content, tags) => {
					await save(datetimeValue, content, tags);
				}}
				errorMessage={formError}
			/>
		</div>
	{/if}
</main>

<style>
	:global(body) {
		width: 100%;
		overflow-y: hidden;
	}
	main {
		height: 100%;
		width: 100%;
		position: relative;
	}
	.add {
		position: absolute;
		bottom: 50px;
		left: calc(50% - 25px);
		width: 50px;
		height: 50px;
		border-radius: 50%;
		font-size: 1.5rem;
		border: none;
		background-color: #efefefaf;
		cursor: pointer;
		box-shadow: 0 0 20px -5px rgba(0, 0, 0, 0.8);
	}
	.add:hover {
		background-color: #efefefff;
	}
	article {
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		/* background-image: url(/actionvance-t7EL2iG3jMc-unsplash.jpg); */
		background-size: cover;
		background-blend-mode: overlay;
		position: relative;
	}
	.timeline {
		transition: left 0.5s ease;
		height: 100%;
		box-sizing: border-box;
		position: absolute;
	}
	.summaries {
		transition: left 0.5s ease;
		height: 100%;
		box-sizing: border-box;
		position: absolute;
	}
	.summaries .close {
		position: absolute;
		top: 10px;
		right: 20px;
		width: 30px;
		height: 30px;
		border-radius: 50%;
		border: none;
		background-color: #efefef;
		cursor: pointer;
	}
	.form {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		backdrop-filter: blur(2px);
	}
	.form > :global(*) {
		position: absolute;
		left: 50%;
		top: 50px;
		height: 80%;
		transform: translate(-50%);
		padding: 10px;
		width: 700px;
		background-color: white;
		box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.5);
		border-radius: 5px;
	}
</style>
