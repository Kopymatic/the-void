<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fade } from 'svelte/transition';

	let {
		showModal = $bindable(),
		children
	}: {
		showModal: boolean;
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
		in:fade={{ duration: 100, delay: 0 }}
		out:fade={{ duration: 100, delay: 0 }}
		bind:this={dialog}
		onclose={() => (showModal = false)}
		onclick={(e) => {
			if (e.target === dialog) showModal = false;
		}}
		class=""
	>
		<div class="p-4">
			{@render children()}
		</div>
	</dialog>
{/if}

<style>
	dialog {
		@apply w-full rounded-lg border-4 border-primary bg-secondary-bg p-0 text-white backdrop-blur-xl backdrop:bg-black/50 md:max-w-3xl;
		/* transition-all duration-1000 open:h-min */
	}
	/* dialog {
		max-width: 32em;
		border-radius: 0.2em;
		border: none;
		padding: 0;
	} */
	/* dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	} */
	/* dialog > div {
		padding: 1em;
	} */
	/* dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	} */
	/* @keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	} */
	/* dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	} */
	/* @keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	} */
	/* button {
		display: block;
	} */
</style>
