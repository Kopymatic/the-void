<script lang="ts">
	import { redirect } from "@sveltejs/kit";
	import IconButton from "./IconButton.svelte";

	const {
		text,
		type = "button",
		class: className = "",
		link
	}: {
		text?: string;
		type?: "button" | "reset" | "submit";
		class?: string;
		link: string;
	} = $props();

	const onclick = () => {
		redirect(302, link);
	};
</script>

<IconButton {type} {text} {onclick} icon="externalLink" class={`${className} bg-secondary`} />
