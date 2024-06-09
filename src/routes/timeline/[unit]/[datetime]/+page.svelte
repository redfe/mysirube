<script>
	import Link from '$lib/components/Link.svelte';
	import { getChildUnit, getParentUnit, getUnit, isInvalidDate, Level } from '$lib/dateUtils';
	import { A, Badge, Heading, Timeline, TimelineItem, Indicator } from 'flowbite-svelte';
	import {
		ZoomInOutline,
		ZoomOutOutline,
		CaretUpOutline,
		CaretDownOutline
	} from 'flowbite-svelte-icons';

	export let data;
	/* 注意： $: で設定しておかないと data が変更されたときに unitLevel, start, timelineFrams に変更が適用されない。 */
	$: unitLevel = data.unitLevel;
	$: start = data.start;
	$: timelineFrames = data.timelineFrames;
	$: unit = getUnit(unitLevel);
	$: parentUnit = getParentUnit(unit);
	$: childUnit = getOrThrowIfUndefined(getChildUnit(unit));
	$: grandChildUnit = childUnit ? getChildUnit(childUnit) : undefined;
	$: pageTitle = unit.getDatetimeLabel(start);
	$: previouseDate = unit.increment(start, -1);
	$: previouseDateIsInvalid = isInvalidDate(previouseDate);
	$: nextDate = unit.increment(start, 1);
	$: nextDateIsInvalid = isInvalidDate(nextDate);
	$: titleHelper = unitLevel < Level.ByYear ? `（${unit.label}）` : '';
	$: titleHelperOfParent =
		parentUnit && parentUnit.level < Level.ByYear ? `(${parentUnit?.label})` : '';
	$: titleHelperOfChild = childUnit?.level < Level.ByYear ? `(${childUnit?.label})` : '';

	/** @typedef {import('$lib/types').TimelineUnit} TimelineUnit*/

	/**
	 * @param {TimelineUnit=} value
	 * @returns {TimelineUnit}
	 */
	function getOrThrowIfUndefined(value) {
		if (value === undefined) {
			throw new Error('value is undefined.');
		}
		return value;
	}
</script>

<svelte:head>
	<title
		>My Sirube
		{pageTitle}{titleHelper}</title
	>
</svelte:head>

<Heading tag="h1" class="text-center text-2xl md:text-5xl"
	>{pageTitle}
	{#if unitLevel < Level.ByYear}<span class="text-lg font-normal">{titleHelper}</span>{/if}
</Heading>

<A
	href="{unit.getUrl(start)}/add"
	title="{unit.getDatetimeLabel(start)}{titleHelper}に追加"
	class="fixed bottom-6 right-6 z-50"
>
	<svg
		stroke="currentColor"
		class="h-[48px] w-[48px]"
		aria-hidden="true"
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		fill="currentColor"
		viewBox="0 0 24 24"
	>
		<path
			fill-rule="evenodd"
			d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z"
			clip-rule="evenodd"
		/>
	</svg>
</A>

<div class="ml-14 mt-20 flex">
	<nav class="fixed left-7 flex flex-col items-center gap-5">
		<Link
			disabled={previouseDateIsInvalid}
			href={previouseDateIsInvalid ? '#' : unit.getUrl(previouseDate)}
			title="{unit.getDatetimeLabel(previouseDate)}へ移動"><CaretUpOutline ariaLabel="前へ" /></Link
		>
		<Link
			disabled={!parentUnit}
			href={!parentUnit ? '#' : parentUnit?.getUrl(start)}
			title="{parentUnit?.getDatetimeLabel(start)}{titleHelperOfParent}にズームアウト"
			><ZoomOutOutline ariaLabel={`ズームアウト`} /></Link
		>
		<Link
			disabled={nextDateIsInvalid}
			href={nextDateIsInvalid ? '#' : unit.getUrl(nextDate)}
			title="{unit.getDatetimeLabel(nextDate)}へ移動"><CaretDownOutline ariaLabel="次へ" /></Link
		>
	</nav>

	<Timeline class=" border-gray-200">
		{#each timelineFrames as frame (`${String(unitLevel)}:${frame.datetime}`)}
			<TimelineItem classDiv="bg-gray-500">
				<div class="flex flex-wrap items-center">
					<time datetime={childUnit?.getDatetimeAttr(frame.datetime)} class="text-base font-bold">
						{childUnit.getDatetimeLabel(frame.datetime)}
					</time>
					{#if frame.count !== 0}<Badge color="red" class="ml-2"
							><Indicator color="red" size="xs" class="me-2" />{frame.count}件</Badge
						>{/if}
				</div>
				<div class={`mt-2 flex h-7 gap-2`}>
					{#if frame.count !== 0}
						<span
							><Badge
								border
								color="dark"
								class="max-w-72 justify-start text-nowrap sm:max-w-96 md:max-w-2xl"
								><p class="truncate" title={frame.tags.sort().join('、')}>
									{frame.tags.sort().join('、')}
								</p></Badge
							></span
						>
					{/if}
				</div>
				<div class="ml-2 mt-2 flex gap-5">
					{#if grandChildUnit}
						<A
							outline
							size="xs"
							href={childUnit.getUrl(frame.datetime)}
							title="{childUnit.getDatetimeLabel(frame.datetime)}{titleHelperOfChild}にズームイン"
							><ZoomInOutline ariaLabel={`ズームイン`} /></A
						>
					{/if}
				</div>
			</TimelineItem>
		{/each}
	</Timeline>
</div>
