<script>
	import { byDay, byHour, formatDate } from '$lib/dateUtils';
	import Timeline from '$lib/components/timeline/Timeline.svelte';
	export let data;
	const { start, timelineFrames } = data;
	const standardFormatter = (/** @type {Date} */ datetime) =>
		formatDate(datetime, "yyyy-MM-dd'T'HH");
</script>

<Timeline
	pageTitle={byDay.format(start)}
	parentUrl={`/timeline/month/${formatDate(start, 'yyyy-MM')}`}
	{timelineFrames}
	getDatetimeAttr={standardFormatter}
	getDatetimeLabel={(datetime) => byHour.format(datetime)}
	getTimelineUrl={(datetime) => `/timeline/hour/${standardFormatter(datetime)}`}
	getListUrl={(datetime) => `/list/unit=hour&start=${standardFormatter(datetime)}`}
/>
