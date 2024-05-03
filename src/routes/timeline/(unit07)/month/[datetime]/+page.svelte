<script>
	import { byDay, byMonth, formatDate } from '$lib/dateUtils';
	import Timeline from '$lib/components/timeline/Timeline.svelte';
	export let data;
	const { start, timelineFrames } = data;
	const standardFormatter = (/** @type {Date} */ datetime) => formatDate(datetime, 'yyyy-MM-dd');
</script>

<Timeline
	pageTitle={byMonth.format(start)}
	parentUrl={`/timeline/month/${formatDate(start, 'yyyy')}`}
	{timelineFrames}
	getDatetimeAttr={standardFormatter}
	getDatetimeLabel={(datetime) => byDay.format(datetime)}
	getTimelineUrl={(datetime) => `/timeline/day/${standardFormatter(datetime)}`}
	getListUrl={(datetime) => `/list/unit=day&start=${standardFormatter(datetime)}`}
/>
