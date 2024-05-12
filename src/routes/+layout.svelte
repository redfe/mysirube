<script>
	import {
		Footer,
		FooterCopyright,
		NavBrand,
		NavHamburger,
		NavLi,
		NavUl,
		Navbar
	} from 'flowbite-svelte';
	import '../app.css';
	import './style.css';
</script>

<div class="root">
	<Navbar let:NavContainer class="bg-primary-400 text-primary-50">
		<NavContainer>
			<NavBrand href="/">
				<span class="self-center whitespace-nowrap text-xl font-semibold">MyShirube</span>
			</NavBrand>
			<NavHamburger />
			<NavUl>
				<NavLi href="/" class="md:text-primary-50">Home</NavLi>
			</NavUl>
		</NavContainer>
	</Navbar>
	<main class="p-5">
		<slot />
	</main>
	<Footer>
		<FooterCopyright href="/" by="MyShirube" year={2024} />
	</Footer>
</div>
