<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<title>The Void</title>
	<meta name="description" content="Silly little thoughts from my silly little head" />
</svelte:head>

<div class="prose prose-invert">{@render children()}</div>
