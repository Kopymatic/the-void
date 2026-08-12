<script lang="ts">
	import type { EventHandler } from "svelte/elements";
	import IconButton from "./IconButton.svelte";
	import type { ButtonIcons } from "$lib";

	const {
		text,
		type = "button",
		icon,
		onclick = undefined,
		class: className = ""
	}: {
		text?: string;
		type?: "button" | "reset" | "submit";
		icon?: ButtonIcons;
		onclick?: EventHandler;
		class?: string;
	} = $props();
</script>

<IconButton {type} {text} {onclick} {icon} class={`${className} bg-success`} />
