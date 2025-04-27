<script lang="ts">
	import type { Snippet } from 'svelte';
	import '../app.css';
	import type { PageData } from './$types';
	import Footer from '../components/Footer.svelte';
	import Header from '../components/Header.svelte';
	let { children }: { children: Snippet<[]> } = $props();
</script>

<svelte:head>
	<title>The Void</title>
	<meta name="description" content="Silly little thoughts from my silly little head" />
</svelte:head>

<div class="mx-auto box-border flex h-screen w-screen max-w-6xl flex-col md:w-2/3">
	<Header></Header>
	<div class="prose prose-invert flex-grow">
		{@render children()}
	</div>
	<Footer></Footer>
</div>
