<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		prose,
		small,
		class: className = ''
	}: { children?: Snippet<[]>; prose?: boolean; small?: boolean; class?: string } = $props();
</script>

<div
	class:prose
	class:prose-sm={small}
	class:prose-invert={prose}
	class:not-prose={!prose}
	class={`border-primary bg-secondary hover:border-accent rounded-lg border-2 p-4 transition-all duration-300 ease-in-out ${className}`}
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
