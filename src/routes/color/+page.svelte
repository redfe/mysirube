<script lang="ts">
	import { type ColorName } from '$lib/colors';
	import ColorSelect from '$lib/components/core/ColorSelect.svelte';
	import TextInput from '$lib/components/core/TextInput.svelte';
	import { getColorSettings, saveColorSettings, type ColorSettings } from '$lib/repository'; // IndexedDB 保存用関数をインポート

	let colorSettings: ColorSettings | undefined = $state();

	let mainColorName: ColorName = $state('white');
	let subColorName: ColorName = $state('white');

	async function load() {
		colorSettings = await getColorSettings();
	}

	function save() {
		if (!colorSettings) return;
		saveColorSettings(JSON.parse(JSON.stringify(colorSettings)));
	}
</script>

{#await load() then}
	{#if colorSettings}
		<ul>
			<li>
				<p>色</p>
				<ColorSelect label="色" bind:value={mainColorName} />
				<div>
					<TextInput
						label="色の説明"
						bind:value={colorSettings.main[mainColorName].description}
						oninput={save}
					/>
				</div>
			</li>
			<li>
				<p>補色</p>
				<ColorSelect label="補色" bind:value={subColorName} type="sub" />
				<div>
					<TextInput
						label="補色の説明"
						bind:value={colorSettings.sub[subColorName].description}
						oninput={save}
					/>
				</div>
			</li>
		</ul>
	{/if}
{/await}

<style>
	ul {
		margin: 0;
		padding: 0;
	}
	li {
		margin-top: 1rem;
		list-style: none;
		p {
			font-size: 1.5rem;
			font-weight: bold;
			margin: 0;
		}
		div {
			margin-top: 0.25rem;
		}
	}
	li :global(input) {
		width: 20rem;
	}
</style>
