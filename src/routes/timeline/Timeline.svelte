<script>
	import { getChildUnit, getListUrl, getParentUnit, getUnit } from '$lib/dateUtils';

	/** @type number */
	export let unitLevel;

	/** @type {Date} */
	export let start;

	/** @type {{datetime:Date, count:number}[]} */
	export let timelineFrames;

	const unit = getUnit(unitLevel);
	const parentUnit = getParentUnit(unit);
	const childUnit = getOrThrowIfUndefined(getChildUnit(unit));
	const grandChildUnit = childUnit ? getChildUnit(childUnit) : undefined;
	const pageTitle = unit.getDatetimeLabel(start);
	const parentUrl = parentUnit?.getUrl(start);

	const previouseDate = unit.increment(start, -1);
	const nextDate = unit.increment(start, 1);

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

<!-- FIXME なぜか data-sveltekit-reload を指定しないと画面遷移してくれない。（URLは書き換わっている）-->

<h1>{pageTitle}</h1>

{#if parentUrl}
	<a href={parentUrl} data-sveltekit-reload>上位時系列</a>
{/if}

<a href={unit.getUrl(previouseDate)} data-sveltekit-reload>{unit.getDatetimeLabel(previouseDate)}</a
>
<ul>
	{#each timelineFrames as frame}
		<li>
			<time datetime={childUnit?.getDatetimeAttr(frame.datetime)}
				>{childUnit.getDatetimeLabel(frame.datetime)}</time
			>
			<data value={frame.count}>{frame.count === 0 ? '' : frame.count + '件'}</data>
			{#if grandChildUnit}
				<a href={childUnit.getUrl(frame.datetime)} data-sveltekit-reload>下位時系列</a>
			{:else}
				<span></span>
			{/if}
			<a href={getListUrl(childUnit, frame.datetime)} data-sveltekit-reload>一覧</a>
		</li>
	{/each}
</ul>
<a href={unit.getUrl(nextDate)} data-sveltekit-reload>{unit.getDatetimeLabel(nextDate)}</a>

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
	time {
		width: 18rem;
	}
	data {
		text-align: right;
		width: 5rem;
	}
	li a,
	li span {
		margin-left: 1rem;
		width: 5rem;
	}
</style>
