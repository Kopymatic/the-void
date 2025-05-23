<script lang="ts">
	import type { Snippet } from "svelte";
	import { fade } from "svelte/transition";

	let {
		showModal = $bindable(),
		hideWhenUnfocused = true,
		children
	}: {
		showModal: boolean;
		hideWhenUnfocused?: boolean;
		children: Snippet<[]>;
	} = $props();

	let dialog: HTMLDialogElement | undefined = $state();

	$effect(() => {
		dialog?.showModal();
		// if (showModal) dialog?.showModal();
		// else dialog?.close();
	});
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
{#if showModal}
	<dialog
		in:fade={{ duration: 500, delay: 0 }}
		out:fade={{ duration: 500, delay: 0 }}
		bind:this={dialog}
		onclose={() => (showModal = false)}
		onclick={(e) => {
			if (e.target === dialog && hideWhenUnfocused) showModal = false;
		}}
		class="border-primary bg-secondary-background z-30 w-full self-center justify-self-center rounded-lg border-4 p-0 text-white backdrop:bg-black/50 backdrop:backdrop-blur-sm md:max-w-3xl"
	>
		<div class="p-4">
			{@render children()}
		</div>
	</dialog>
{/if}
