<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet<[]> } = $props();
</script>

<div class="mx-auto px-2 sm:max-w-3xl sm:px-0">{@render children()}</div>
