<script lang="ts">
	import BaseModal from './BaseModal.svelte';

	let { showModal = $bindable() }: { showModal: boolean } = $props();
</script>

<BaseModal bind:showModal>
	<form method="POST" action="?/delete" class=" w-full">
		<h2 class="my-2">Are you sure you want to <b>permanently</b> delete this post?</h2>
		This cannot be undone.
		<hr />
		<button class="border-0 border-transparent bg-warn-red">Confirm Deletion</button>
		<button type="button" onclick={() => (showModal = false)}>Cancel</button>
	</form>
</BaseModal>
