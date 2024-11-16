<script lang="ts">
	import '../app.css';
	let { children, data } = $props();
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
			You're signed in as {data.session.user.name}
		{/if}
		<br />
		<a class="my-2 py-0" href="/">take me home</a>
	</footer>
</div>
