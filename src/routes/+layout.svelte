<script lang="ts">
	import type { Snippet } from "svelte";
	import "../app.css";
	import Footer from "$lib/components/Footer.svelte";
	import Header from "$lib/components/Header.svelte";
	import { pwaInfo } from "virtual:pwa-info";
	const { children }: { children: Snippet<[]> } = $props();

	let webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : "";
</script>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html webManifestLink}
	<title>Kopymatic</title>
	<meta name="description" content="Silly little thoughts from my silly little head" />
</svelte:head>

<div class="mx-auto box-border flex h-screen w-[97vw] max-w-6xl flex-col">
	<Header></Header>
	<div class="grow">
		{@render children()}
	</div>
	<Footer></Footer>
</div>
