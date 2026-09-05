<script lang="ts">
	import type { Snippet } from "svelte";
	import type { EventHandler } from "svelte/elements";
	import IconButton from "./buttons/IconButton.svelte";
	import "../../app.css";

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
<div
	class:prose
	class:prose-sm={small}
	class:prose-invert={prose}
	class:not-prose={!prose}
	class:collapsed
	class:holepunch
	class="box"
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

<style>
	@reference "tailwindcss";
	* {
		@apply box-border;
	}
	.collapsed {
		@apply h-20 overflow-hidden;
	}

	/* https://ibelick.com/blog/create-animated-gradient-borders-with-css */

	/* https://codepen.io/thebabydino/pen/jENvVvg */

	.box {
		border: 4px solid #f00505;
		padding: 1rem;
		border-radius: 12px;

		--list: var(--color-darker-accent), var(--color-darker-accent);
		--grad: linear-gradient(-30deg, var(--list));

		position: relative;
		isolation: isolate;
		background: var(--color-secondary-background);
		transition: background-color 200ms ease;
	}

	.box::before {
		content: "";
		position: absolute;
		inset: 0;
		z-index: -1;
		background: var(--grad);
		filter: blur(1em);

		opacity: 0;
		transition: opacity 400ms ease;

		will-change: opacity;
	}

	.box:hover {
		background: transparent;
	}

	.box:hover::before {
		opacity: 1;
	}

	.box.holepunch {
		--list: var(--color-primary), var(--color-primary);
		background: var(--color-primary-background);
	}

	.box.holepunch:hover {
		background: transparent;
	}

	/* @keyframes fade {
		from {
			--fader: 0.1em;
		}
		to {
			--fader: 2em;
		}
	}

	@property --fader {
		syntax: "<length>";
		initial-value: 0.1em;
		inherits: false; 
	}*/

	/* @keyframes rotate {
		to {
			--angle: 100%;
		}
	}

	@property --angle {
		syntax: "<percentage>";
		initial-value: 1%;
		inherits: false;
	} */
</style>
