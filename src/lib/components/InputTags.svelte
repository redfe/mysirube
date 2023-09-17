<script>
	import { slide } from 'svelte/transition';

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
	let inputValue;

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
</script>

<svelte:body
	on:click={(e) => {
		if (e.target !== container && e.target !== input) {
			focused = false;
		}
	}}
/>

<div class="container" bind:this={container}>
	<div class="input-area">
		{#each tags as tag (tag)}
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div class="selected-tag" transition:slide={{ axis: 'x' }}>
				{tag}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div
					class="delete-tag"
					on:click={() => {
						tags = tags.filter((t) => t !== tag);
					}}
				>
					✕
				</div>
			</div>
		{/each}
		<input
			type="text"
			bind:this={input}
			bind:value={inputValue}
			on:focus={() => (focused = true)}
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
	{#key inputValue}
		{#if (inputValue !== undefined && inputValue !== '') || focused}
			<div class="selectable-tag-container">
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
		border: solid 1px;
		border-radius: 5px;
		height: 1.85rem;
		padding: 5px;
		display: flex;
	}
	.selected-tag {
		display: inline-block;
		font-size: 0.8rem;
		padding: 0.25rem;
		margin: 0 0.25rem;
		background-color: #ccc;
		border-radius: 5px;
		overflow: hidden;
	}
	.delete-tag {
		display: inline-block;
		margin-left: 0.25rem;
		cursor: pointer;
		color: #0005;
		width: 1.25rem;
		height: 1.25rem;
		padding: 0 0.25rem;
		font-size: 0.75rem;
		border: solid 1px #0005;
		border-radius: 50%;
		text-align: center;
		box-sizing: border-box;
	}
	input {
		font-size: 0.8rem;
		border: none;
		box-sizing: border-box;
		flex-grow: 1;
		height: 100%;
	}
	input:focus {
		outline: none;
	}
	.selectable-tag-container {
		position: absolute;
		background-color: white;
		border-left: solid 1px #000a;
		border-right: solid 1px #000a;
		left: 5px;
		width: calc(100% - 10px);
		overflow-y: scroll;
	}
	.selectable-tag {
		display: block;
		padding: 0.25rem;
		border-bottom: 1px solid #000a;
		cursor: pointer;
	}
	.selecting {
		background-color: #ccc;
	}
</style>
