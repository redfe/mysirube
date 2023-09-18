<script>
	/** @type {Date} */
	export let value;

	const srcDatetime = value;

	console.log(srcDatetime);

	$: era = srcDatetime.getFullYear() < 0 ? 'BC' : 'AC';
	$: year =
		era === 'BC'
			? (-1 * srcDatetime.getFullYear() + 1).toString()
			: srcDatetime.getFullYear().toString();
	$: month = (srcDatetime.getMonth() + 1).toString();
	$: day = srcDatetime.getDate().toString();
	$: hour = srcDatetime.getHours().toString();
	$: minute = srcDatetime.getMinutes().toString();
	$: second = srcDatetime.getSeconds().toString();

	$: value = new Date(
		era === 'BC' ? -1 * (parseInt(year) - 1) : parseInt(year),
		parseInt(month) - 1,
		parseInt(day),
		parseInt(hour),
		parseInt(minute),
		parseInt(second)
	);

	/**
	 * @param {any} value
	 * @param {number} min
	 * @param {number} max
	 * @returns {string}
	 */
	function adjust(value, min, max) {
		if (!value) {
			return '0';
		}
		const intValue = parseInt(value);
		if (intValue < min) {
			return min.toString();
		}
		if (intValue > max) {
			return max.toString();
		}
		return intValue.toString();
	}
	$: {
		year = adjust(year, 1, 99999999);
	}
	$: {
		month = adjust(month, 1, 12);
	}
	$: {
		day = adjust(day, 1, 31);
	}
	$: {
		hour = adjust(hour, 0, 23);
	}
	$: {
		minute = adjust(minute, 0, 59);
	}
	$: {
		second = adjust(second, 0, 59);
	}
</script>

<div class="inline datetime">
	<select bind:value={era} style:width="4rem">
		<option value="BC">BC</option>
		<option value="AC">AC</option>
	</select>

	<input
		style:width="5rem"
		required
		type="number"
		min="0"
		id="year"
		name="year"
		bind:value={year}
	/>年
	<input
		style:width="3rem"
		required
		type="number"
		min="1"
		max="12"
		id="month"
		name="month"
		bind:value={month}
	/>月
	<input
		style:width="3rem"
		required
		type="number"
		min="1"
		max="31"
		id="day"
		name="day"
		bind:value={day}
	/>日
	<input
		style:width="3rem"
		required
		type="number"
		min="0"
		max="59"
		id="hour"
		name="hour"
		bind:value={hour}
	/>時
	<input
		style:width="3rem"
		required
		type="number"
		min="0"
		max="59"
		id="minute"
		name="minute"
		bind:value={minute}
	/>分
	<input
		style:width="3rem"
		required
		type="number"
		min="0"
		max="59"
		id="seond"
		name="second"
		bind:value={second}
	/>秒
</div>

<style>
	select {
		height: 2rem;
	}
</style>
