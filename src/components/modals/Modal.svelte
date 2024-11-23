<script lang="ts">
	import type { Snippet } from 'svelte';
	import BaseModal from './BaseModal.svelte';

	let {
		showModal = $bindable(),
		header,
		children,
		buttons
	}: {
		showModal: boolean;
		header: Snippet<[]>;
		children: Snippet<[]>;
		buttons: Snippet<[]>;
	} = $props();

	let dialog: HTMLDialogElement | undefined = $state(); // HTMLDialogElement

	$effect(() => {
		if (showModal) dialog?.showModal();
	});
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<BaseModal bind:showModal>
	{@render header()}
	<hr />
	{@render children()}
	<hr />
	<!-- svelte-ignore a11y_autofocus -->
	<button autofocus onclick={() => dialog?.close()}>Cancel</button>
	{@render buttons()}
</BaseModal>
