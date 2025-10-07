<script lang="ts">
	import type { Snippet } from "svelte";

	const { children }: { children: Snippet<[]> } = $props();
</script>

<div class="prose prose-invert mx-auto w-full px-2 sm:px-0 md:w-xl">{@render children()}</div>
