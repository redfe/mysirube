<script>
	import { getChildUnit, getParentUnit, getUnit, Level } from '$lib/dateUtils';
	import { Badge, Button, Heading, Timeline, TimelineItem } from 'flowbite-svelte';

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
	$: nextDate = unit.increment(start, 1);

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

	function getItemHeight(/** @type {number} */ unitLevel) {
		switch (unitLevel) {
			case Level.By10000Year:
				return 'h-36';
			case Level.By1000Year:
				return 'h-32';
			case Level.By100Year:
				return 'h-28';
			case Level.By10Year:
				return 'h-24';
			case Level.ByYear:
				return 'h-20';
			case Level.ByMonth:
				return 'h-16';
			case Level.ByDay:
				return 'h-14';
			case Level.ByHour:
				return 'h-12';
			default:
				return 'h-11';
		}
	}

	$: itemHeight = getItemHeight(unitLevel);
</script>

<svelte:head>
	<title>My Sirube {unit.label} {pageTitle}</title>
</svelte:head>

<Heading tag="h1" class="text-center"
	>{pageTitle}
	{#if unitLevel < Level.ByYear}<span class="text-lg font-normal">（{unit.label}）</span>{/if}
</Heading>

<nav class="nav-date">
	<Button outline href={parentUnit?.getUrl(start)} disabled={!parentUnit}
		><span aria-label={`俯瞰（${parentUnit?.getDatetimeLabel(start)}）`}>俯瞰</span></Button
	>
	<Button outline href={unit.getUrl(previouseDate)}
		>{unit.getDatetimeLabelShort(previouseDate)}</Button
	>
	<Button outline href={unit.getUrl(nextDate)}>{unit.getDatetimeLabelShort(nextDate)}</Button>
</nav>

<div class="flex justify-center">
	<Timeline class="w-full lg:w-2/3">
		{#each timelineFrames as frame (`${String(unitLevel)}:${frame.datetime}`)}
			<TimelineItem>
				<time datetime={childUnit?.getDatetimeAttr(frame.datetime)} class="text-md">
					{#if grandChildUnit}
						<a href={childUnit.getUrl(frame.datetime)} class="underline underline-offset-8"
							>{childUnit.getDatetimeLabel(frame.datetime)}</a
						>
					{:else}
						{childUnit.getDatetimeLabel(frame.datetime)}
					{/if}
				</time>
				{#if frame.count !== 0}<Badge border large color="red" class="ml-2">{frame.count}件</Badge
					>{/if}
				<div class={`${itemHeight} ml-2 mt-2 max-w-full overflow-hidden md:inline`}>
					{#if frame.count !== 0}
						<span><Badge border large class="mr-2 inline text-base">歴史</Badge></span>
						<span><Badge border large class="mr-2 inline text-base">日記</Badge></span>
					{/if}
				</div>
			</TimelineItem>
		{/each}
	</Timeline>
</div>

<style>
	.nav-date,
	.nav-unit {
		margin-top: 0.5rem;
		margin-bottom: 3rem;
		display: flex;
		gap: 1rem;
		justify-content: center;
	}
</style>
