<script>
	import { DynamicScroll } from 'svelte-dynamic-scroll';

	let summaries = [
		'1',
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
		'10',
		'11',
		'12',
		'13',
		'14',
		'15',
		'16',
		'17',
		'18',
		'19',
		'20',
		'21',
		'22',
		'23',
		'24',
		'25',
		'26',
		'27',
		'28',
		'29',
		'30'
	];

	/**
	 *
	 * @param {string} lastValue
	 */
	function nextChunk(lastValue) {
		if (lastValue) return [];
		return summaries;
	}
</script>

<div class="app">
	<div class="summaries">
		<DynamicScroll {nextChunk} let:value>
			{@const _value = /** @type string */ (value)}
			<div class="loading" slot="loading">loading...</div>
			<div class="row">
				{_value}
			</div>
		</DynamicScroll>
	</div>
	<div class="end" />
</div>

<style>
	.app {
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
	}
	.summaries {
		height: 100%;
		width: 100%;
		background-color: rgb(239, 168, 151, 0.8);
		overflow-y: hidden;
	}
	.row {
		border: none;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		height: 100px;
		width: 100%;
		overflow: hidden;
		padding: 20px;
		box-sizing: border-box;
		display: flex;
	}
	.loading {
		text-align: center;
		background-color: rgba(0, 0, 0, 0.5);
	}
</style>
