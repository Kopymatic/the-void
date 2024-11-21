<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children, prose, small }: { children?: Snippet<[]>; prose?: boolean; small?: boolean } =
		$props();
</script>

<div
	class:prose
	class:prose-sm={small}
	class:prose-invert={prose}
	class:not-prose={!prose}
	class="my-2 min-h-min min-w-min rounded-lg border-2 border-primary bg-secondary p-4 hover:border-accent"
>
	{#if children}
		{@render children()}
	{/if}
</div>

<style>
	* {
		@apply box-border;
	}
</style>
