<script module lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	export type Props = {} & HTMLAttributes<HTMLElement>;
</script>

<script lang="ts">
	let { ...others }: Props = $props();
</script>

<!-- 最上部までスクロールするボタン-->
<button
	class="scroll-top"
	onclick={() => {
		window.scrollTo({
			top: 0,
			behavior: 'instant'
		});
	}}
	title="最上部までスクロールする"
	{...others}
>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
		<path d="M12 2l-10 10h6v8h8v-8h6z" fill="white" />
	</svg>
</button>

<style>
	@keyframes scroll-anim-for-scroll-top {
		0% {
			top: -5rem;
		}
		1% {
			top: 2rem;
		}
		100% {
			top: 2rem;
		}
	}
	.scroll-top {
		position: fixed;
		top: -5rem;
		right: 2rem;
		background-color: dodgerblue;
		color: white;
		border: none;
		border-radius: 50%;
		width: 4rem;
		height: 4rem;
		cursor: pointer;
		animation: scroll-anim-for-scroll-top linear;
		animation-timeline: scroll();
		opacity: 0.5;
	}
	.scroll-top:hover {
		opacity: 1;
	}
</style>
