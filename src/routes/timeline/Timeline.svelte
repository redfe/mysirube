<script>
	import { getChildUnit, getParentUnit, getUnit } from '$lib/dateUtils';
	/** @type number */
	export let unitLevel;

	/** @type {Date} */
	export let start;

	/** @type {{datetime:Date, count:number}[]} */
	export let timelineFrames;

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

	let scrollY = 0;
	$: isViewFixedTitle = 220 < scrollY;
</script>

<svelte:head>
	<title>My Sirube {unit.label} {pageTitle}</title>
</svelte:head>

<svelte:window bind:scrollY />

<h1>
	{unit.label}
</h1>
<nav class="nav-unit">
	{#if parentUnit}
		<a href={parentUnit?.getUrl(start)}>{parentUnit.label}</a>
	{/if}
	{#if childUnit}
		<a href={childUnit?.getUrl(start)}>{childUnit.label}</a>
	{/if}
</nav>

<h2>
	{pageTitle}
</h2>
<nav class="nav-date">
	<a href={unit.getUrl(previouseDate)}>{unit.getDatetimeLabelShort(previouseDate)}</a>
	<a href={unit.getUrl(nextDate)}>{unit.getDatetimeLabelShort(nextDate)}</a>
</nav>

<p class="fixed-title" class:none={!isViewFixedTitle} aria-hidden="true">{pageTitle}</p>

<ul>
	{#each timelineFrames as frame}
		<li>
			<time datetime={childUnit?.getDatetimeAttr(frame.datetime)}
				>{childUnit.getDatetimeLabelShort(frame.datetime)}</time
			>
			<data value={frame.count}>{frame.count === 0 ? '' : frame.count + '件'}</data>
			{#if grandChildUnit}
				<a href={childUnit.getUrl(frame.datetime)}>{grandChildUnit.label}</a>
			{:else}
				<span></span>
			{/if}
			<!--
			<a href={getListUrl(childUnit, frame.datetime)}>一覧</a>
			-->
		</li>
	{/each}
</ul>

<style>
	ul {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	li {
		display: flex;
		justify-content: center;
		height: 4rem;
		box-sizing: border-box;
		align-items: center;
	}
	data {
		text-align: right;
		width: 5rem;
	}
	li a,
	li span {
		margin-left: 1rem;
	}
	h1,
	h2 {
		text-align: center;
	}
	.nav-date *,
	.nav-unit * {
		display: block;
		text-align: center;
		margin: 1rem 0;
	}
	.fixed-title {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		background-color: white;
		box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.1);
		text-align: center;
		font-size: 1.25rem;
		font-weight: bold;
	}
	.none {
		display: none;
	}
	.nav-unit,
	.nav-date {
		display: flex;
		gap: 1rem;
		justify-content: center;
	}
</style>
