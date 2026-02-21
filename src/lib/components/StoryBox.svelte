<script lang="ts">
	import type { Snippet } from "svelte";
	import IconButton from "./buttons/IconButton.svelte";

	const {
		children,
		collapsedText = "",
		titleText = "",
		startCollapsed = false,
		class: className = "",
		holepunch = false
	}: {
		children?: Snippet<[]>;
		titleText: string;
		collapsedText?: string;
		startCollapsed?: boolean;
		class?: string;
		holepunch?: boolean;
	} = $props();

	let collapsed = $state(startCollapsed);

	let collapseFunc = () => {
		collapsed = !collapsed;
	};
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class={`border-primary ${holepunch ? "bg-primary-background" : "bg-secondary"} hover:border-accent relative rounded-lg border-2 p-4 transition-all duration-300 ease-in-out ${className} ${collapsed ? "line-clamp-1" : ""}`}
>
	<div class="flex flex-row justify-between *:align-middle" onclick={collapseFunc}>
		{#if collapsed}
			<p class="text-2xl font-bold">{collapsedText ? collapsedText : titleText}</p>
		{:else}
			<h1 class="mt-2 text-2xl">{titleText}</h1>
		{/if}
		<IconButton class="my-auto border-0 bg-transparent" icon={collapsed ? "down" : "up"} />
	</div>
	{#if children && !collapsed}
		{@render children()}
	{/if}
</div>
