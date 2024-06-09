<script>
	import { page } from '$app/stores';
	import { Heading, Button } from 'flowbite-svelte';
	import { goto } from '$app/navigation';

	const pageTitle = '追加成功';
</script>

<svelte:head>
	<title
		>My Sirube
		{pageTitle}</title
	>
</svelte:head>

<Heading tag="h1" class="text-center">{pageTitle}</Heading>

<div class="mb-7 mt-7 flex flex-col items-start">
	<Button outline on:click={() => goto($page.url.pathname.replace('/add/success', ''))}>戻る</Button
	>
</div>
