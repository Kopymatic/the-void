<script lang="ts">
	import type { EventHandler } from "svelte/elements";
	import Check from "../icons/CheckIcon.svelte";

	const {
		text = "Confirm",
		type = "submit",
		onclick = undefined,
		iconOnly = false,
		class: className = ""
	}: {
		text?: string;
		type?: "button" | "reset" | "submit";
		onclick?: EventHandler;
		iconOnly?: boolean;
		class?: string;
	} = $props();
</script>

<button class={className} {onclick} {type}>
	<div class="mx-auto flex w-min text-nowrap">
		<Check class="stroke-white" />
		<span class:hidden={iconOnly}>{text}</span>
	</div>
</button>
