<script>
	import Timeline from './Timeline.svelte';
	import Summaries from './Summaries.svelte';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	let isViewSummaries = false;

	/** @type {Date=} */
	let selectedFrom;

	/** @type {Date=} */
	let selectedTo;

	$: {
		if (!isViewSummaries) {
			selectedFrom = undefined;
		}
	}

	/**
	 * @param {Date} from
	 * @param {Date} to
	 */
	function handleOnClickCountButton(from, to) {
		if (selectedFrom === from) {
			isViewSummaries = !isViewSummaries;
		} else {
			isViewSummaries = true;
		}
		selectedFrom = from;
		selectedTo = to;
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
	{#key selectedFrom}
		<div
			class="summaries"
			style:display={isViewSummaries ? 'block' : 'none'}
			style:left={`${(clientWidth - 500) / 2 + 250}px`}
			transition:fly={{ x: -250 }}
		>
			<Summaries from={selectedFrom} to={selectedTo} />
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
		<Timeline {handleOnClickCountButton} selectedDatetime={selectedFrom} />
	</div>
</main>

<style>
	:global(body) {
		width: 100%;
	}
	main {
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
		background-color: rgba(255, 255, 255, 0.8);
		cursor: pointer;
	}
</style>
