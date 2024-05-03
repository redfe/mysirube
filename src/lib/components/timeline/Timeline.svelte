<script>
	/** @type {string}*/
	export let pageTitle;

	/** @type {string=} */
	export let parentUrl;

	/** @type {{datetime:Date, count:number}[]} */
	export let timelineFrames;

	/** @type {(datetime:Date) => string} */
	export let getDatetimeAttr;

	/** @type {(datetime:Date) => string} */
	export let getDatetimeLabel;

	/** @type {(datetime:Date) => string | undefined} */
	export let getTimelineUrl;

	/** @type {(datetime:Date) => string} */
	export let getListUrl;
</script>

<h1>{pageTitle}</h1>

{#if parentUrl}
	<a href={parentUrl}>戻る</a>
{/if}
<ul>
	{#each timelineFrames as frame}
		<li>
			<time datetime={getDatetimeAttr(frame.datetime)}>{getDatetimeLabel(frame.datetime)}</time>
			<data value={frame.count}>{frame.count}件</data>
			{#if getTimelineUrl}
				<a href={getTimelineUrl(frame.datetime)}>時系列</a>
			{/if}
			<a href={getListUrl(frame.datetime)}>一覧</a>
		</li>
	{/each}
</ul>
