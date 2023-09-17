<script>
	/** @type {Date} */
	export let value;

	const srcDatetime = value;

	$: year = srcDatetime.getFullYear();
	$: month = srcDatetime.getMonth() + 1;
	$: day = srcDatetime.getDate();
	$: hour = srcDatetime.getHours();
	$: minute = srcDatetime.getMinutes();
	$: second = srcDatetime.getSeconds();
	$: value = new Date(year, month - 1, day, hour, minute, second);
</script>

<div class="inline datetime">
	<input style:width="5rem" required type="number" id="year" name="year" bind:value={year} />年
	<input
		style:width="2rem"
		required
		type="number"
		min="1"
		max="12"
		id="month"
		name="month"
		bind:value={month}
	/>月
	<input
		style:width="2rem"
		required
		type="number"
		min="1"
		max="31"
		id="day"
		name="day"
		bind:value={day}
	/>日
	<input
		style:width="2rem"
		required
		type="number"
		min="0"
		max="59"
		id="hour"
		name="hour"
		bind:value={hour}
	/>時
	<input
		style:width="2rem"
		required
		type="number"
		min="0"
		max="59"
		id="minute"
		name="minute"
		bind:value={minute}
	/>分
	<input
		style:width="2rem"
		required
		type="number"
		min="0"
		max="59"
		id="seond"
		name="second"
		bind:value={second}
	/>秒
</div>
