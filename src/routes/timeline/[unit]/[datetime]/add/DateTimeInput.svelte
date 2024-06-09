<script>
	import { twMerge } from 'tailwind-merge';
	import { Helper, Input, Select } from 'flowbite-svelte';
	import { Level, getUnit, isEmpty, toJSDate, toNumber } from '$lib/dateUtils';

	/** @type {string} */
	export let label;

	/** @type {string} */
	export let id;

	/** @type {string} */
	export let name;

	/** @type {Date=} */
	export let date = undefined;

	/** @type {number|string=} */
	let year = date?.getFullYear();

	/** @type {number|string=} */
	let month = (date?.getMonth() ?? 0) + 1;

	/** @type {number|string=} */
	let day = date?.getDate();

	/** @type {number|string=} */
	let hour = date?.getHours();

	/** @type {number|string=} */
	let minute = date?.getMinutes();

	/** @type {number|string=} */
	let second = date?.getSeconds();

	/** @type {boolean=} */
	export let disabled = false;

	/** @type {string[]=} */
	export let errorMessage = undefined;

	/** @typedef {Level[keyof Level]} LevelValue */
	/** @type {LevelValue} */
	export let unitLevel;

	const defaultClass = 'mb-6 border p-5';

	$: isInvalid = !!errorMessage;

	/** @type {string} */
	let thisClass = defaultClass;
	$: thisClass = twMerge(defaultClass, $$props.clas, isInvalid ? 'border-error bg-error' : '');

	/**
	 * @param {number} start
	 * @param {number} end
	 */
	const range = (start, end) => Array.from({ length: end - start + 1 }, (_, i) => start + i);

	$: {
		year, month, day, hour, minute, second;
		if (!isEmpty(year)) {
			date = getUnit(unitLevel).startOf(
				toJSDate({
					year: toNumber(year),
					month: toNumber(month) ?? 1,
					day: toNumber(day) ?? 1,
					hour: toNumber(hour) ?? 0,
					minute: toNumber(minute) ?? 0,
					second: toNumber(second) ?? 0
				})
			);
		} else {
			date = undefined;
		}
	}

	let ariaAttrs = { 'aria-describedby': `${id}-error`, 'aria-invalid': isInvalid };
</script>

<fieldset {id} class={thisClass} {...ariaAttrs}>
	<legend class="pl-2 pr-2 {isInvalid ? 'text-error bg-white' : ''}" {...ariaAttrs}
		>{label}
	</legend>
	<input type="hidden" {name} bind:value={date} {disabled} />
	<div>
		<div>
			<Input
				id="{id}-year"
				aria-label="年"
				type="number"
				class="w-28"
				min="-99999999"
				max="99999999"
				disabled={disabled || unitLevel < Level.ByYear}
				bind:value={year}
				required={!disabled}
				{...ariaAttrs}
			/>
			<p>年</p>
		</div>
		<div>
			<Select
				id="{id}-month"
				aria-label="月"
				class="w-20"
				placeholder=""
				disabled={disabled || unitLevel < Level.ByMonth}
				bind:value={month}
				items={[...range(1, 12).map((v) => ({ value: v, name: v }))]}
				{...ariaAttrs}
			/>
			<p>月</p>
		</div>
		<div>
			<Select
				id="{id}-day"
				aria-label="日"
				class="w-20"
				placeholder=""
				disabled={disabled || unitLevel < Level.ByDay}
				bind:value={day}
				items={[...range(1, 31).map((v) => ({ value: v, name: v }))]}
				{...ariaAttrs}
			/>
			<p>日</p>
		</div>
		<div>
			<Select
				id="{id}-hour"
				aria-label="時"
				class="w-20"
				placeholder=""
				disabled={disabled || unitLevel < Level.ByHour}
				bind:value={hour}
				items={[...range(0, 23).map((v) => ({ value: v, name: v }))]}
				{...ariaAttrs}
			/>
			<p>時</p>
		</div>
		<div>
			<Select
				id="{id}-minute"
				aria-label="分"
				class="w-20"
				placeholder=""
				disabled={disabled || unitLevel < Level.ByMinute}
				bind:value={minute}
				items={[...range(0, 59).map((v) => ({ value: v, name: v }))]}
				{...ariaAttrs}
			/>
			<p>分</p>
		</div>
		<div>
			<Select
				id="{id}-second"
				aria-label="秒"
				class="w-20"
				placeholder=""
				disabled={disabled || unitLevel < Level.BySecond}
				bind:value={second}
				items={[...range(0, 59).map((v) => ({ value: v, name: v }))]}
				{...ariaAttrs}
			/>
			<p>秒</p>
		</div>
	</div>
	{#if errorMessage}<Helper id="{id}-error" class="text-error mt-2">{errorMessage}</Helper>{/if}
</fieldset>

<style lang="postcss">
	fieldset > div {
		@apply flex flex-col gap-2 md:flex-row;
	}
	fieldset > div > div {
		@apply flex flex-row;
	}
	fieldset > div > div > p {
		@apply ml-1 mt-2;
	}
</style>
