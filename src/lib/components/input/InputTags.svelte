<script>
	import { slide } from 'svelte/transition';
	import CircleButton from '$lib/components/button/CircleButton.svelte';

	/** @type {string[]} */
	export let selectableTags = [];

	let filteredSelectableTags = selectableTags;
	$: {
		inputValue;
		tags;
		filteredSelectableTags = selectableTags.filter((tag) => isMatch(tag));
	}

	/** @type {string[]} */
	export let tags = [];

	/** @type {string} */
	let inputValue = '';

	let focused = false;

	/**
	 * @param {string} tag
	 */
	function isMatch(tag) {
		if (tags.find((t) => t === tag)) {
			return false;
		}
		return (
			!inputValue ||
			inputValue.trim() === '' ||
			tag.toUpperCase().includes(inputValue.toUpperCase())
		);
	}

	/** @type {HTMLDivElement} */
	let container;

	/** @type {HTMLDivElement} */
	let input;

	/** @type {HTMLDivElement} */
	let selectableTagContainer;

	/**
	 * @param {any[]} array
	 * @returns {any[]}
	 */
	function unique(array) {
		return array.filter((x, i, self) => self.indexOf(x) === i);
	}

	let selectingIndex = -1;

	$: {
		focused;
		selectingIndex = -1;
	}

	function reset() {
		inputValue = '';
		selectingIndex = -1;
	}

	/** @param {Element} elm */
	function isChildrenOfContainer(elm) {
		if (elm === container) {
			return true;
		} else if (elm.parentElement) {
			return isChildrenOfContainer(elm.parentElement);
		} else {
			return false;
		}
	}
</script>

<svelte:body
	on:click={(e) => {
		if (!(e.target instanceof Element)) return;

		/** @type {Element}*/
		const elm = e.target;

		if (isChildrenOfContainer(elm)) {
			focused = true;
		} else {
			focused = false;
		}
	}}
/>

<div class="container" bind:this={container}>
	<div class="input-area" class:focused>
		<!-- inputed tags -->
		{#each tags as tag (tag)}
			<div class="selected-tag" transition:slide={{ axis: 'x' }}>
				{tag}
				<div class="delete-tag">
					<CircleButton
						on:click={() => {
							tags = tags.filter((t) => t !== tag);
						}}
					>
						✕
					</CircleButton>
				</div>
			</div>
		{/each}

		<!-- input -->
		<input
			type="text"
			bind:this={input}
			bind:value={inputValue}
			on:focus={() => (focused = true)}
			on:blur={(e) => {
				if (!!inputValue && inputValue.trim() !== '') {
					tags = [...tags, inputValue];
				}
				reset();
				if (e.relatedTarget) {
					focused = false;
				} else {
					focused = true;
				}
			}}
			on:keypress={(e) => {
				if (e.key === 'Enter') {
					if (selectingIndex >= 0 && selectingIndex < filteredSelectableTags.length) {
						tags = unique([...tags, filteredSelectableTags[selectingIndex]]);
						reset();
						e.preventDefault();
					} else if (inputValue && inputValue.trim() !== '') {
						tags = unique([...tags, inputValue]);
						reset();
						e.preventDefault();
					}
				}
			}}
			on:keydown={(e) => {
				if (e.key === 'Backspace' && inputValue === '') {
					tags = tags.slice(0, tags.length - 1);
					reset();
				} else if (e.key === 'ArrowUp') {
					selectingIndex = Math.max(selectingIndex - 1, -1);
				} else if (e.key === 'ArrowDown') {
					selectingIndex = Math.min(selectingIndex + 1, filteredSelectableTags.length - 1);
				}
			}}
		/>
	</div>

	<!-- selectable tags -->
	{#key inputValue}
		{#if (inputValue !== undefined && inputValue !== '') || focused}
			<div class="selectable-tag-container" bind:this={selectableTagContainer}>
				{#each filteredSelectableTags as tag, i (tag)}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<div
						class="selectable-tag"
						class:selecting={selectingIndex === i}
						on:click={() => {
							tags = [...tags, tag];
							reset();
						}}
						transition:slide
					>
						{tag}
					</div>
				{/each}
			</div>
		{/if}
	{/key}
</div>

<style>
	.container {
		position: relative;
	}
	.input-area {
		border: var(--basic-border);
		border-radius: var(--basic-border-radius);
		min-height: 2.75rem;
		padding: var(--basic-border-radius);
		display: flex;
		flex-wrap: wrap;
		row-gap: 0.25rem;
	}
	.selected-tag {
		display: flex;
		font-size: 0.8rem;
		padding: 0.25rem;
		margin: 0 0.25rem;
		background-color: var(--secondary-color);
		color: var(--secondary-font-color);
		border-radius: var(--basic-border-radius);
		border: var(--basic-border);
		overflow: hidden;
		text-wrap: nowrap;
	}
	.delete-tag {
		display: inline-block;
		margin-left: 0.25rem;
		width: 1.25rem;
		height: 1.25rem;
		font-size: 0.75rem;
		box-sizing: border-box;
		opacity: 0.3;
	}
	.delete-tag:hover {
		opacity: 1;
	}
	input {
		font-size: 0.8rem;
		border: none;
		box-sizing: border-box;
		flex-grow: 1;
		height: 1.75rem;
	}
	input:focus {
		outline: none;
	}
	.selectable-tag-container {
		position: absolute;
		background-color: white;
		border-left: solid 1px #0005;
		border-right: solid 1px #0005;
		left: var(--basic-border-radius);
		width: calc(100% - var(--basic-border-radius) * 2);
		overflow-y: scroll;
		box-sizing: border-box;
		box-shadow: 0 0 20px -10px rgba(0, 0, 0, 0.8);
		border-radius: 0 0 var(--basic-border-radius) var(--basic-border-radius);
	}
	.selectable-tag {
		display: block;
		padding: 0.25rem;
		border-bottom: 1px solid #0005;
		cursor: pointer;
	}
	.selectable-tag:hover {
		background-color: var(--secondary-color);
	}
	.selecting {
		background-color: var(--secondary-color);
	}
	.focused {
		border: var(--focused-border);
	}
</style>
