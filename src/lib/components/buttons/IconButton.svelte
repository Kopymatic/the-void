<script lang="ts">
	import type { EventHandler } from "svelte/elements";
	import EditIcon from "../icons/EditIcon.svelte";
	import CancelIcon from "../icons/CancelIcon.svelte";
	import CheckIcon from "../icons/CheckIcon.svelte";
	import TrashIcon from "../icons/TrashIcon.svelte";
	import HelpIcon from "../icons/HelpIcon.svelte";
	import ShareIcon from "../icons/ShareIcon.svelte";
	import UpIcon from "../icons/UpIcon.svelte";
	import DownIcon from "../icons/DownIcon.svelte";
	import type { Snippet } from "svelte";
	import type { ButtonIcons } from "$lib";
	import ExternalLinkIcon from "../icons/ExternalLinkIcon.svelte";

	const {
		text,
		type = "button",
		icon,
		onclick = undefined,
		class: className = "",
		children
	}: {
		text?: string;
		type?: "button" | "reset" | "submit";
		icon?: ButtonIcons;
		onclick?: EventHandler;
		class?: string;
		children?: Snippet<[]>;
	} = $props();

	const iconOnly = () => !text;
</script>

<button
	class={`hover:border-accent group/icon transition-all duration-300 ease-in-out ${className}`}
	{onclick}
	{type}
	name={type}
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
		{:else if icon === "help"}
			<HelpIcon />
		{:else if icon === "share"}
			<ShareIcon />
		{:else if icon === "up"}
			<UpIcon />
		{:else if icon === "down"}
			<DownIcon />
		{:else if icon === "externalLink"}
			<ExternalLinkIcon />
		{/if}
		<span class:hidden={iconOnly()}>
			{#if children}
				{@render children()}
			{:else}
				{text}
			{/if}
		</span>
	</div>
</button>
