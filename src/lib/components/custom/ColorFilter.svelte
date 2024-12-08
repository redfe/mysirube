<script module lang="ts">
	export type Props = {
		selectableColors: string[];
		selectedColors: string[];
		defaultColor: string;
		filter: () => void;
	};
</script>

<script lang="ts">
	let {
		selectableColors = $bindable(),
		selectedColors = $bindable(),
		defaultColor,
		filter
	}: Props = $props();
</script>

<fieldset class="colorSelector">
	<legend>色フィルター</legend>
	{#each selectableColors as color (color)}
		<label class="color">
			<input type="checkbox" bind:group={selectedColors} value={color} onchange={() => filter()} />
			<div
				aria-label={color ? color : defaultColor}
				style:background-color={color ? color : defaultColor}
				tabindex="0"
				role="checkbox"
				aria-checked={selectedColors.includes(color)}
				onkeypress={(e) => {
					const target = e.target as HTMLElement;
					if (e.key === ' ' || e.key === 'Enter') {
						target.parentElement?.querySelector('input')?.click();
					}
				}}
			></div>
		</label>
	{/each}
</fieldset>

<style>
	.colorSelector {
		line-height: 3.25rem;
		display: flex;
		align-items: center;
		padding: 0;
		border: none;
		legend {
			font-size: 0rem;
			line-height: 0;
		}
		.color {
			padding: 4px;
			opacity: 0.7;
			width: 1.5rem;
			height: 1.5rem;
			display: inline-block;
			border: solid 1px rgba(0, 0, 0, 0.7);
			box-sizing: border-box;
			margin-right: 0.5rem;
			transition: padding 0.25s;

			input {
				display: none;
			}
			div {
				width: 100%;
				height: 100%;
			}
		}
		.color:has(input:checked) {
			border-bottom: 3px solid blue;
			padding: 2px;
		}
	}
</style>
