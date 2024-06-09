<script>
	import { Level, getUnit } from '$lib/dateUtils';
	import { marked } from 'marked';
	import {
		Heading,
		Input,
		Label,
		Helper,
		Checkbox,
		Button,
		Select,
		Textarea,
		Toggle
	} from 'flowbite-svelte';
	import DateTimeInput from './DateTimeInput.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { superForm } from 'sveltekit-superforms';

	export let data;

	const { form, errors, enhance } = superForm(data.form, {
		applyAction: false,
		onResult: ({ result }) => {
			if (result.type === 'redirect') {
				goto(result.location);
			}
		}
	});

	const unit = getUnit($form.unitLevel);

	const pageTitle = '追加';

	const defaultLevel = unit.level;

	/** @type {Level[keyof Level]} */
	let unitLevel = defaultLevel;

	/** @type {Date=} */
	let startDate = $form.startDate;

	let isInputEndDatetime = false;

	/** @type {Date=} */
	let endDate = startDate;

	/** @type {string=}*/
	let tags;

	/** @type {string=}*/
	let content;

	let isPreview = false;
</script>

<svelte:head>
	<title
		>My Sirube
		{pageTitle}</title
	>
</svelte:head>

<Heading tag="h1" class="text-center">{pageTitle}</Heading>

<div class="mb-7 mt-7 flex flex-col items-start">
	<Button outline on:click={() => goto($page.url.pathname.replace('/add', ''))}>戻る</Button>
</div>

<form method="POST" use:enhance>
	<div>
		<Label for="unitLevel" class="mb-2">日時入力レベル</Label>
		<Select
			id="unitLevel"
			name="unitLevel"
			class="mb-6 w-36"
			placeholder=""
			required
			bind:value={unitLevel}
			items={[
				{ value: Level.ByYear, name: '年' },
				{ value: Level.ByMonth, name: '年月' },
				{ value: Level.ByDay, name: '年月日' },
				{ value: Level.ByHour, name: '年月日時' },
				{ value: Level.ByMinute, name: '年月日時分' },
				{ value: Level.BySecond, name: '年月日時分秒' }
			]}
		/>

		<DateTimeInput
			label="開始日時"
			id="startdate"
			name="startDate"
			bind:date={startDate}
			{unitLevel}
			errorMessage={$errors.startDate}
		/>

		<Checkbox class="mb-3 w-48" name="isInputEndDate" bind:checked={isInputEndDatetime}
			>終了日時を入力する</Checkbox
		>

		<DateTimeInput
			label="終了日時"
			id="endtdate"
			name="endDate"
			bind:date={endDate}
			{unitLevel}
			disabled={!isInputEndDatetime}
			errorMessage={$errors.endDate}
		/>

		<div class="mb-6">
			<Label for="tags" class="mb-2">タグ</Label>
			<Input
				type="text"
				id="tags"
				name="tags"
				aria-invalid={$errors.tags}
				aria-describedby="tags-desc tags-error"
				bind:value={tags}
				class={$errors.tags ? 'text-error bg-error border-error' : ''}
			/>
			<Helper id="tags-desc" class="text-sm">スペース区切りで5つまで入力できます。</Helper>
			{#if $errors.tags}
				<Helper id="tags-error" class="text-error text-sm">{$errors.tags}</Helper>
			{/if}
		</div>

		<div class="mb-6">
			<Label for="content" class="mb-2">コンテンツ</Label>
			{#key [isPreview]}
				<Toggle class="mb-2" bind:checked={isPreview}>プレビュー</Toggle>
				<div class="min-h-96">
					<Textarea
						id="content"
						name="content"
						required
						class={isPreview ? 'h-0 opacity-0' : 'h-96'}
						bind:value={content}
						{...{ readonly: isPreview ? 'true' : undefined }}
					></Textarea>
					<div class="markdown-preview {isPreview ? 'block' : 'hidden'}">
						<!--eslint-disable-next-line svelte/no-at-html-tags -->
						{@html marked(content ?? '')}
					</div>
				</div>
			{/key}
		</div>
	</div>
	<div class="flex flex-col items-start">
		<Button type="submit">登録する</Button>
	</div>
</form>
