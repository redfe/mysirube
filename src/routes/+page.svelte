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
	import CircleButton from '$lib/components/button/CircleButton.svelte';

	/**
	 * @typedef {import('$lib/dateUtils.js').Level} Level
	 * @typedef {import('$lib/types.d.ts').DateOptions} DateOptions
	 * @typedef {import('$lib/types.d.ts').DateValue} DateValue
	 */

	/** @type {DateValue[]}*/
	export let list = [];

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
		list = [];
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
	async function handleOnSave(datetimeValue, content, tags) {
		const normalizedTagsString = tags
			.split(/[,、\x20\u3000]/)
			.map((tag) => tag.trim())
			.filter((tag) => tag !== '')
			.join(',');
		const ret = await fetch('/api/timelines', {
			method: 'POST',
			body: JSON.stringify({
				datetime: datetimeValue,
				content,
				tags: normalizedTagsString
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
		// 表示済みのデータを更新する
		const formatted = dateType.format(new Date(datetimeValue));
		const index = list.findIndex((value) => dateType.format(value.datetime) === formatted);
		if (index > -1) {
			const target = list[index];
			target.count = target.count + 1;
			// 部分的に再レンダリングさせるために、配列の要素を直接更新する
			list[index] = target;
		}
	}
</script>

<div class="main">
	<article>
		{#key summariesFrom}
			<!-- アニメーションさせたいので display:none で非表示にする -->
			<div
				class="summaries"
				style:display={isViewSummaries ? 'block' : 'none'}
				style:width={timelineWidth + 'px'}
				style:left={`${(clientWidth - timelineWidth) / 2 + timelineWidth / 2}px`}
				transition:fly={{ x: -timelineWidth / 2, duration: 800 }}
			>
				<Summaries
					from={summariesFrom}
					to={summariesDateType?.increment(summariesFrom ?? new Date(), 1)}
				/>
				<div class="close">
					<CircleButton on:click={() => (isViewSummaries = false)}>✕</CircleButton>
				</div>
			</div>
		{/key}

		{#key dateType}
			<div
				class="timeline"
				style:width={timelineWidth + 'px'}
				style:left={isViewSummaries
					? `${(clientWidth - timelineWidth) / 2 - timelineWidth / 2}px`
					: `${(clientWidth - timelineWidth) / 2}px`}
				in:fly={{
					x: timelineWidth * (isLevelUp ? 1 : -1),
					duration: 800,
					easing: cubicInOut
				}}
				out:fly={{
					x: timelineWidth * (isLevelUp ? -1 : 1),
					duration: 800,
					easing: cubicInOut
				}}
			>
				<Timeline
					bind:list
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
	<div class="add">
		<CircleButton on:click={() => (isViewForm = true)}>
			<span class="button-text">+</span>
		</CircleButton>
	</div>
	{#if isViewForm}
		<div class="form" transition:fade={{ easing: cubicInOut }}>
			<Form
				handleOnClickCancelButton={() => (isViewForm = false)}
				{handleOnSave}
				{dateType}
				errorMessage={formError}
			/>
		</div>
	{/if}
</div>

<style>
	:global(body) {
		width: 100%;
		overflow-y: hidden;
	}
	.main {
		height: 100%;
		width: 100%;
		position: relative;
	}
	.add > :global(*) {
		box-shadow: 0 0 20px -5px rgba(0, 0, 0, 0.8);
	}
	.button-text {
		font-size: 1.5rem;
	}
	.add {
		position: absolute;
		bottom: 50px;
		left: calc(50% - 25px);
		width: 50px;
		height: 50px;
		opacity: 0.7;
	}
	.add:hover {
		opacity: 1;
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
		width: 90%;
		transform: translate(-50%);
		padding: 10px;
		background-color: white;
		box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.5);
		border-radius: var(--basic-border-radius);
	}
</style>
