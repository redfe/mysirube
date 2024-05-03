<script>
	import { byHour, byMinute, formatDate } from '$lib/dateUtils';
	import Timeline from '$lib/components/timeline/Timeline.svelte';
	export let data;
	const { start, timelineFrames } = data;
	const standardFormatter = (/** @type {Date} */ datetime) =>
		formatDate(datetime, "yyyy-MM-dd'T'HH:mm");
</script>

<Timeline
	pageTitle={byHour.format(start)}
	parentUrl={`/timeline/day/${formatDate(start, 'yyyy-MM-dd')}`}
	{timelineFrames}
	getDatetimeAttr={standardFormatter}
	getDatetimeLabel={(datetime) => byMinute.format(datetime)}
	getTimelineUrl={(datetime) => `/timeline/minute/${standardFormatter(datetime)}`}
	getListUrl={(datetime) => `/list/unit=minute&start=${standardFormatter(datetime)}`}
/>
