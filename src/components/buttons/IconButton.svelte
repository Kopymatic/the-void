<script lang="ts">
	import type { EventHandler } from "svelte/elements";
	import EditIcon from "../icons/EditIcon.svelte";
	import CancelIcon from "../icons/CancelIcon.svelte";
	import CheckIcon from "../icons/CheckIcon.svelte";
	import TrashIcon from "../icons/TrashIcon.svelte";

	const {
		text,
		type = "button",
		icon,
		onclick = undefined,
		class: className = ""
	}: {
		text?: string;
		type?: "button" | "reset" | "submit";
		icon: "edit" | "cancel" | "check" | "trash";
		onclick?: EventHandler;
		class?: string;
	} = $props();

	const iconOnly = !text;
</script>

<button
	class={`hover:border-accent group/icon transition-all duration-300 ease-in-out ${className}`}
	{onclick}
	{type}
>
	<div class="mx-auto flex w-min text-nowrap">
		{#if icon === "edit"}
			<EditIcon />
		{:else if icon === "cancel"}
			<CancelIcon />
		{:else if icon === "check"}
			<CheckIcon />
		{:else if icon === "trash"}
			<TrashIcon class="group-hover/icon:stroke-warn" />
		{/if}
		<span class:hidden={iconOnly}>{text}</span>
	</div>
</button>
