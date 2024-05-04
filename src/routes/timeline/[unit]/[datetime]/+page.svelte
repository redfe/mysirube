<script>
	import Timeline from '../../Timeline.svelte';
	export let data;
	const { unitLevel, start, timelineFrames } = data;
</script>

<Timeline {unitLevel} {start} {timelineFrames} />
