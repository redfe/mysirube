<script>
	import Timeline from './Timeline.svelte';
	import Summaries from './Summaries.svelte';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	/**
	 * @typedef {import('$lib/dateUtils.js').Level} Level
	 * @typedef {import('$lib/types.d.ts').DateOptions} DateOptions
	 */

	let isViewSummaries = false;

	/** @type {Date=} */
	let summariesFrom;

	/** @type {Date=} */
	let summariesTo;

	/** @type {Level=} */
	let summariesLevel;

	$: {
		if (!isViewSummaries) {
			summariesFrom = undefined;
		}
	}

	/**
	 * @param {Date} datetime
	 * @param {DateOptions} dateOptions
	 */
	function handleOnClickCountButton(datetime, dateOptions) {
		if (summariesFrom === datetime) {
			isViewSummaries = !isViewSummaries;
		} else {
			isViewSummaries = true;
		}
		summariesFrom = datetime;
		summariesTo = dateOptions.increment(datetime, 1);
		summariesLevel = dateOptions.level;
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
</script>

<main>
	<article>
		{#key summariesFrom}
			<div
				class="summaries"
				style:display={isViewSummaries ? 'block' : 'none'}
				style:left={`${(clientWidth - 500) / 2 + 250}px`}
				transition:fly={{ x: -250 }}
			>
				<Summaries from={summariesFrom} to={summariesTo} />
				<button class="close" on:click={() => (isViewSummaries = false)}>×</button>
			</div>
		{/key}

		<!-- スクロール位置を残しておきたいので display:none で非表示にする -->
		<div
			class="timeline"
			style:left={isViewSummaries
				? `${(clientWidth - 500) / 2 - 250}px`
				: `${(clientWidth - 500) / 2}px`}
		>
			<Timeline {handleOnClickCountButton} markedDatetime={summariesFrom} markedLevel={summariesLevel} />
		</div>
	</article>
	<button class="add">+</button>
</main>

<style>
	:global(body) {
		width: 100%;
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
		width: 500px;
		height: 100%;
		box-sizing: border-box;
		position: absolute;
	}
	.summaries {
		width: 500px;
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
</style>
