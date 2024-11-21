<script lang="ts">
	import type { Snippet } from 'svelte';
	import '../app.css';
	import type { PageData } from './$types';
	import Footer from '../components/Footer.svelte';
	let { children, data }: { children: Snippet<[]>; data: PageData } = $props();
</script>

<svelte:head>
	<title>The Void</title>
	<meta name="description" content="Silly little thoughts from my silly little head" />
</svelte:head>

<div class="prose prose-invert min-w-full">
	{@render children()}
	<Footer></Footer>
</div>
