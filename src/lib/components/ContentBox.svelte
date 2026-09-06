<script lang="ts">
	import type { Snippet } from "svelte";
	import type { EventHandler } from "svelte/elements";
	import IconButton from "./buttons/IconButton.svelte";

	let {
		children,
		prose = false,
		small,
		class: className = "",
		onclick,
		holepunch = false,
		collapsible = false,
		startCollapsed = false
	}: {
		children?: Snippet<[]>;
		prose?: boolean;
		small?: boolean;
		class?: string;
		onclick?: EventHandler | undefined;
		holepunch?: boolean;
		collapsible?: boolean;
		startCollapsed?: boolean;
	} = $props();

	// svelte-ignore state_referenced_locally
	let collapsed = $state(startCollapsed);

	let collapseFunc = () => {
		collapsed = !collapsed;
	};
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class:holepunch class="box glow glow-border">
	<div
		class:prose
		class:prose-sm={small}
		class:prose-invert={prose}
		class:not-prose={!prose}
		class:collapsed
		// class={`box border-primary ${holepunch ? "bg-primary-background" : "bg-secondary"} hover:border-accent relative rounded-lg border-2 px-3 py-2 transition-all duration-300 ease-in-out ${className}`}
		{onclick}
	>
		{#if collapsible}
			<IconButton
				class="absolute top-2 right-2"
				icon={collapsed ? "down" : "up"}
				onclick={collapseFunc}
			/>
		{/if}
		{#if children}
			{@render children()}
		{/if}
	</div>
</div>

<style>
	@reference "tailwindcss";
	/* https://ibelick.com/blog/create-animated-gradient-borders-with-css */
	/* https://codepen.io/thebabydino/pen/jENvVvg */
	* {
		box-sizing: border-box;
	}
	.collapsed {
		height: 4rem;
		overflow: hidden;
	}

	.box {
		padding: 1rem;
		border: 4px solid var(--color-primary);
		border-radius: var(--border-radius);
	}

	.box.holepunch {
		background:
	/* I'm not sure why this has to be a gradient to work.. */
			linear-gradient(var(--color-primary-background), var(--color-primary-background)) padding-box,
			var(--grad) border-box;
	}
</style>
