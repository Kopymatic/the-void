<script lang="ts">
	import type { EventHandler } from "svelte/elements";
	import EditIcon from "../icons/EditIcon.svelte";

	let {
		text = "Edit",
		type = "button",
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
		<EditIcon class="max-h-full stroke-white" />
		<span class:hidden={iconOnly}>{text}</span>
	</div>
</button>
