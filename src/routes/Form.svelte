<script>
	import { dateTypes, formatDate } from '$lib/dateUtils';

	export let handleOnClickCancelButton = () => {};

	/**
	 * @param {string} datetimeValue
	 * @param {string} content
	 * @param {string} tags
	 */
	export let handleOnSave = (datetimeValue, content, tags) => {
		console.log(datetimeValue, content, tags);
	};

	/** @type {import('$lib/types').DateOptions} */
	export let dateType = dateTypes[6];

	/** @type {string=} */
	export let errorMessage;

	let datetime = dateType.startOf(new Date());
	$: year = datetime.getFullYear();
	$: month = datetime.getMonth() + 1;
	$: day = datetime.getDate();
	$: hour = datetime.getHours();
	$: minute = datetime.getMinutes();
	$: second = datetime.getSeconds();
	$: datetimeValue = formatDate(new Date(year, month - 1, day, hour, minute, second));

	let content = '';
	let tags = '';

	let submitting = false;
</script>

<form
	method="post"
	on:submit|preventDefault={async () => {
		try {
			submitting = true;
			await new Promise((resolve) => setTimeout(resolve, 1000));
			await handleOnSave(datetimeValue, content, tags);
		} finally {
			submitting = false;
		}
	}}
>
	{#if errorMessage}
		<p style="color: red">{errorMessage}</p>
	{/if}
	<label for="datetime">日時</label>
	<div class="inline datetime">
		<input name="datetime" bind:value={datetimeValue} type="hidden" />
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

	<label for="content">記事</label>
	<textarea required id="content" name="content" style="height:200px" bind:value={content} />

	<label for="message">タグ</label>
	<input required type="text" id="tags" name="tags" bind:value={tags} />

	<div class="inline">
		<button
			on:click|preventDefault={handleOnClickCancelButton}
			aria-disabled={submitting}
			disabled={submitting}>キャンセル</button
		>
		<button type="submit" aria-disabled={submitting} disabled={submitting}
			>{submitting ? '送信中' : '保存'}</button
		>
	</div>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
	}
	form > * {
		margin: 0.5rem 0;
	}
	.inline {
		display: flex;
		flex-direction: row;
	}
	.datetime > input {
		text-align: right;
	}
	form button {
		margin: 0.5rem 0;
	}
</style>
