<script lang="ts">
	import type { Snippet } from "svelte";
	import type { MouseEventHandler } from "svelte/elements";

	const {
		children,
		prose,
		small,
		class: className = "",
		onclick
	}: {
		children?: Snippet<[]>;
		prose?: boolean;
		small?: boolean;
		class?: string;
		onclick?: MouseEventHandler<HTMLDivElement> | null | undefined;
	} = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class:prose
	class:prose-sm={small}
	class:prose-invert={prose}
	class:not-prose={!prose}
	class={`border-primary bg-secondary hover:border-accent rounded-lg border-2 p-4 transition-all duration-300 ease-in-out ${className}`}
	{onclick}
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
