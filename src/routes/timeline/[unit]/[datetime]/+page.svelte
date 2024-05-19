<script>
	import Link from '$lib/components/Link.svelte';
	import { getChildUnit, getParentUnit, getUnit, isInvalidDate, Level } from '$lib/dateUtils';
	import { A, Badge, Button, Heading, Timeline, TimelineItem, P, Indicator } from 'flowbite-svelte';
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

	$: titleHelper = unitLevel < Level.ByYear ? `（${unit.label}）` : '';
</script>

<svelte:head>
	<title
		>My Sirube
		{pageTitle}{titleHelper}</title
	>
</svelte:head>

<Heading tag="h1" class="text-center"
	>{pageTitle}
	{#if unitLevel < Level.ByYear}<span class="text-lg font-normal">{titleHelper}</span>{/if}
</Heading>

<nav class="mb-10 mt-10 flex flex-col items-center gap-5">
	<Link
		disabled={previouseDateIsInvalid}
		href={previouseDateIsInvalid ? '#' : unit.getUrl(previouseDate)}
		title={unit.getDatetimeLabel(previouseDate)}><CaretUpOutline ariaLabel="前へ" /></Link
	>
	<Link
		disabled={!parentUnit}
		href={!parentUnit ? '#' : parentUnit?.getUrl(start)}
		title={`${parentUnit?.getDatetimeLabel(start)}`}
		><ZoomOutOutline ariaLabel={`ズームアウト`} /></Link
	>
	<Link
		disabled={nextDateIsInvalid}
		href={nextDateIsInvalid ? '#' : unit.getUrl(nextDate)}
		title={unit.getDatetimeLabel(nextDate)}><CaretDownOutline ariaLabel="次へ" /></Link
	>
</nav>

<div class="flex justify-center">
	<Timeline class="w-full max-w-xl">
		{#each timelineFrames as frame (`${String(unitLevel)}:${frame.datetime}`)}
			<TimelineItem>
				<div class="flex flex-wrap items-center">
					<time datetime={childUnit?.getDatetimeAttr(frame.datetime)} class="text-2xl font-bold">
						{childUnit.getDatetimeLabel(frame.datetime)}
					</time>
					{#if frame.count !== 0}<Badge color="red" class="ml-2"
							><Indicator color="red" size="xs" class="me-2" />{frame.count}件</Badge
						>{/if}
				</div>
				<div class={`mt-2 flex h-7 max-w-full gap-2 overflow-hidden`}>
					{#if frame.count !== 0}
						<span><Badge border large color="dark">歴史</Badge></span>
						<span><Badge border large color="dark">日記</Badge></span>
					{/if}
				</div>
				{#if grandChildUnit}
					<A outline size="xs" class="ml-2 mt-2" href={childUnit.getUrl(frame.datetime)}
						><ZoomInOutline
							ariaLabel={`${childUnit.getDatetimeLabel(frame.datetime)}にズームイン`}
						/></A
					>
				{/if}
			</TimelineItem>
		{/each}
	</Timeline>
</div>
