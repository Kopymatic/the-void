<script lang="ts">
	import type { Snippet } from "svelte";
	import type { MouseEventHandler } from "svelte/elements";
	import IconButton from "./buttons/IconButton.svelte";

	let {
		children,
		prose = false,
		small,
		class: className = "",
		onclick,
		holepunch = false,
		collapsible = false,
		startCollapsed = false,
		clickToCollapse = false
	}: {
		children?: Snippet<[]>;
		prose?: boolean;
		small?: boolean;
		class?: string;
		onclick?: MouseEventHandler<HTMLDivElement> | null | undefined;
		holepunch?: boolean;
		collapsible?: boolean;
		startCollapsed?: boolean;
		clickToCollapse?: boolean;
	} = $props();

	// svelte-ignore state_referenced_locally
	let collapsed = $state(startCollapsed);

	let collapseFunc = () => {
		collapsed = !collapsed;
	};

	// svelte-ignore state_referenced_locally
	if (clickToCollapse && collapsible) {
		onclick = collapseFunc;
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class:prose
	class:prose-sm={small || collapsed}
	class:prose-invert={prose}
	class:not-prose={!prose}
	class={`border-primary ${holepunch ? "bg-primary-background" : "bg-secondary"} ${collapsed ? "line-clamp-1" : ""} hover:border-accent relative rounded-lg border-2 px-4 py-2  transition-all duration-300 ease-in-out ${className}`}
	{onclick}
>
	{#if collapsible}
		<IconButton class="absolute top-2 right-2" icon={collapsed ? "down" : "up"} />
	{/if}
	{#if children}
		{@render children()}
	{/if}
</div>

<style>
	* {
		@apply box-border;
	}
</style>
