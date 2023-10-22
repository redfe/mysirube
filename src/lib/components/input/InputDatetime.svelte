<script>
	/** @type {Date} */
	export let value;

	export let isValid = true;

	/** @type {string} */
	let era;

	/** @type {string} */
	let year;

	/** @type {string} */
	let month;

	/** @type {string} */
	let day;

	/** @type {string} */
	let hour;

	/** @type {string} */
	let minute;

	/** @type {string} */
	let second;

	replaceFromDate(value);

	/**
	 * @param {Date} date
	 */
	function replaceFromDate(date) {
		era = date.getFullYear() < 0 ? 'BC' : 'AC';
		year = era === 'BC' ? (-1 * date.getFullYear() + 1).toString() : date.getFullYear().toString();
		month = (date.getMonth() + 1).toString();
		day = date.getDate().toString();
		hour = date.getHours().toString();
		minute = date.getMinutes().toString();
		second = date.getSeconds().toString();
	}

	function toDatetimeString() {
		return `${padd('' + getYear(era, year), 4)}-${padd(month)}-${padd(day)}T${padd(hour)}:${padd(
			minute
		)}:${padd(second)}`;
	}

	/**
	 * @param {string} value
	 * @param {number=} length
	 * @returns {string}
	 */
	function padd(value, length = 2) {
		return value.padStart(length, '0');
	}

	/**
	 * @param {Date} date
	 * @returns {boolean}
	 */
	function isValidDate(date) {
		return (
			date.getFullYear() === getYear(era, year) &&
			date.getMonth() + 1 === parseInt(month) &&
			date.getDate() === parseInt(day) &&
			date.getHours() === parseInt(hour) &&
			date.getMinutes() === parseInt(minute) &&
			date.getSeconds() === parseInt(second)
		);
	}

	/**
	 * @param {string} era
	 * @param {string} year
	 * @returns {number}
	 */
	function getYear(era, year) {
		return era === 'BC' ? -1 * (parseInt(year) - 1) : parseInt(year);
	}

	$: {
		era, year, month, day, hour, minute, second;
		const temp = new Date(toDatetimeString());
		if ((isValid = isValidDate(temp))) {
			replaceFromDate(temp);
			value = temp;
		}
	}

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

<div>
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
