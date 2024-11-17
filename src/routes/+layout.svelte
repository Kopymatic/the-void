<script lang="ts">
	import type { Snippet } from 'svelte';
	import '../app.css';
	import type { PageData } from './$types';
	let { children, data }: { children: Snippet<[]>; data: PageData } = $props();
</script>

<svelte:head>
	<title>The Void</title>
	<meta name="description" content="Silly little thoughts from my silly little head" />
</svelte:head>

<div class="prose prose-invert min-w-full">
	{@render children()}
	<br />
	<footer>
		{#if data.session?.user}
			You're signed in as {data.user.name}.
			{#if data.user.isAdmin}
				Create a post <a href="/create">here</a>.
			{/if}
		{/if}
		<br />
		<a class="my-2 py-0" href="/">take me home</a>
	</footer>
</div>
