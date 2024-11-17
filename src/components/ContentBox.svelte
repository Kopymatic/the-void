<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children, url }: { children?: Snippet<[]>; url?: string } = $props();
</script>

<div class="border-primary bg-secondary m-2 min-h-min min-w-min rounded-lg border-2 p-4">
	{#if children}
		{@render children()}
	{/if}
</div>

<style>
	* {
		@apply box-border;
	}
</style>
