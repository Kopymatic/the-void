<script lang="ts">
	import type { Snippet } from "svelte";
	import "../app.css";
	import Footer from "$lib/components/Footer.svelte";
	import Header from "$lib/components/Header.svelte";
	const { children }: { children: Snippet<[]> } = $props();
</script>

<svelte:head>
	<title>Kopymatic</title>
	<meta name="description" content="Silly little thoughts from my silly little head" />
</svelte:head>

<div class="mx-auto box-border flex h-screen w-screen max-w-6xl flex-col">
	<Header></Header>
	<div class="flex-grow">
		{@render children()}
	</div>
	<Footer></Footer>
</div>
