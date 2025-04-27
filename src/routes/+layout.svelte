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

<div class="prose prose-invert mx-auto box-border w-screen max-w-6xl md:w-2/3">
	<Header></Header>
	{@render children()}
	<Footer></Footer>
</div>
