<script lang="ts">
	import { enhance } from '$app/forms';
	import BaseModal from './BaseModal.svelte';

	let { showModal = $bindable() }: { showModal: boolean } = $props();

	const deletePost = () => {};

	let dialog: HTMLDialogElement | undefined = $state(); // HTMLDialogElement
</script>

<BaseModal bind:showModal>
	<form method="POST" action="?/delete" class=" w-full">
		<h2 class="my-2">Are you sure you want to <b>permanently</b> delete this post?</h2>
		This cannot be undone.
		<hr />
		<button type="button" onclick={() => (showModal = false)}>Cancel</button>
	</form>
</BaseModal>
