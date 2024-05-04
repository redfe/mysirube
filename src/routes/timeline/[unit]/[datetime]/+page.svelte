<script>
	import Timeline from '../../Timeline.svelte';
	export let data;
	/* 注意： $: で設定しておかないと data が変更されても unitLevel, start, timelineFrams に変更が適用されない。 */
	$: unitLevel = data.unitLevel;
	$: start = data.start;
	$: timelineFrames = data.timelineFrames;
</script>

<Timeline {unitLevel} {start} {timelineFrames} />
