<script lang="ts">
	import { page } from "$app/state";
	let path = $derived(page.url);
	let showVoidHeader = $derived(path.pathname.startsWith("/posts"));
</script>

<header class="mx-auto w-full pt-2 text-center">
	<div>
		<a
			class="font-rock-salt text-kopymatic hover:text-kopymatic mx-auto text-4xl no-underline"
			href="/">Kopymatic</a
		>
	</div>
	{#if showVoidHeader}
		<div class="px-4">
			<a class="font-gaegu mx-auto w-1/3 text-3xl text-white no-underline" href="/posts/"
				>the void</a
			>
		</div>
	{/if}
</header>
