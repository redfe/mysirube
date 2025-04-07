<script module lang="ts">
	import type { ColorName } from '$lib/colors';
	import { getColorSettings, type ColorSettings } from '$lib/repository';

	export type Props = {
		selectableColors: string[];
		selectedColors: string[];
		defaultColor: string;
		filter: () => void;
		type?: 'main' | 'sub';
	};
	let loadColorSetting: Promise<ColorSettings | undefined> = getColorSettings();
</script>

<script lang="ts">
	let {
		selectableColors = $bindable(),
		selectedColors = $bindable(),
		defaultColor,
		filter,
		type = 'main'
	}: Props = $props();

	function description(color: ColorName, colorSetting?: ColorSettings) {
		return colorSetting?.[type][color].description;
	}
</script>

{#await loadColorSetting then colorSetting}
	<fieldset class="colorSelector">
		<legend>色フィルター</legend>
		{#each selectableColors as color (color)}
			<label class="color">
				<input
					type="checkbox"
					bind:group={selectedColors}
					value={color}
					onchange={() => filter()}
				/>
				<div
					aria-label={description((color as ColorName) ?? defaultColor, colorSetting)}
					title={description((color as ColorName) ?? defaultColor, colorSetting)}
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
{/await}

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
			border: solid 1px rgba(0, 0, 0, 0.5);
			box-sizing: border-box;
			margin-right: 0.25rem;
			transition: padding 0.25s;

			input {
				display: none;
			}
			div {
				border: 1px solid rgba(0, 0, 0, 0.5);
				width: 100%;
				height: 100%;
				box-sizing: border-box;
			}
		}
		.color:has(input:checked) {
			border-bottom: 3px solid blue;
			padding: 2px;
		}
	}
</style>
