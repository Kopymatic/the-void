<script lang="ts">
	import type { Snippet } from "svelte";

	let { children }: { children: Snippet<[]> } = $props();
</script>

<div class="prose prose-invert mx-auto px-2 sm:px-0 md:w-xl">{@render children()}</div>
