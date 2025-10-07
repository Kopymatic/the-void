<script lang="ts">
	import type { Snippet } from "svelte";
	import IconButton from "./buttons/IconButton.svelte";

	const {
		children,
		collapsedText = "",
		titleText = "",
		class: className = ""
	}: {
		children?: Snippet<[]>;
		titleText: string;
		collapsedText: string;
		class?: string;
	} = $props();

	let collapsed = $state(false);
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class={`border-primary bg-secondary hover:border-accent relative rounded-lg border-2 p-4 transition-all duration-300 ease-in-out ${className} ${collapsed ? "line-clamp-1" : ""}`}
	onclick={() => {
		collapsed = !collapsed;
	}}
>
	<IconButton
		class="absolute top-0.5 right-0.5 border-0 bg-transparent"
		icon={collapsed ? "down" : "up"}
	/>
	{#if collapsed}
		<p class="text-2xl font-bold">{collapsedText}</p>
	{:else}
		<h1 class="mt-2 text-2xl">{titleText}</h1>
		{#if children}
			{@render children()}
		{/if}
	{/if}
</div>
