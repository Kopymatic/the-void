<script lang="ts">
	import type { Snippet } from "svelte";

	const { children }: { children: Snippet<[]> } = $props();
</script>

<article class="prose prose-invert mx-auto w-full max-w-none px-2 sm:px-0 lg:w-4xl">
	{@render children()}
</article>
