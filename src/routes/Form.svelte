<script>
	import BasicButton from '$lib/components/button/BasicButton.svelte';
	import InputDatetime from '$lib/components/input/InputDatetime.svelte';
	import InputTags from '$lib/components/input/InputTags.svelte';
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

	let content = '';

	const selectableTags = [
		'日記',
		'文学',
		'小説',
		'漫画',
		'アニメ',
		'ゲーム',
		'プログラミング',
		'映画',
		'音楽',
		'スポーツ',
		'メモ'
	];
	/** @type {string[]} */
	let tags = [];

	let submitting = false;

	let isValidDatetime = true;

	$: isValid = isValidDatetime;
</script>

<form
	method="post"
	on:submit|preventDefault={async () => {
		try {
			submitting = true;
			await new Promise((resolve) => setTimeout(resolve, 1000));
			await handleOnSave(formatDate(datetime), content, tags.join(' '));
		} finally {
			submitting = false;
		}
	}}
>
	{#if errorMessage}
		<p style="color: red">{errorMessage}</p>
	{/if}

	<label for="datetime"
		>日時
		{#if !isValidDatetime}
			<span class="error">不正な日時です</span>
		{/if}
	</label>
	<InputDatetime bind:value={datetime} bind:isValid={isValidDatetime} />

	<label for="message">タグ</label>
	<InputTags {selectableTags} bind:tags />

	<label for="content">記事</label>
	<textarea required id="content" name="content" style="height:200px" bind:value={content} />

	<div class="inline buttons">
		<BasicButton
			on:click={(e) => {
				e.preventDefault();
				handleOnClickCancelButton();
			}}
			aria-disabled={submitting || !isValid}
			disabled={submitting || !isValid}>キャンセル</BasicButton
		>
		<BasicButton
			type="submit"
			kind="primary"
			aria-disabled={submitting || !isValid}
			disabled={submitting || !isValid}>{submitting ? '送信中' : '保存'}</BasicButton
		>
	</div>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		overflow-y: visible;
	}
	form > * {
		margin: 0.5rem 0;
	}
	.inline {
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
	}
	form .buttons :global(button) {
		margin: 0.5rem 0;
		height: 2rem;
		width: 6rem;
	}
	.error {
		color: red;
	}
</style>
