<script lang="ts">
	import BaseModal from './BaseModal.svelte';

	let { showModal = $bindable() }: { showModal: boolean } = $props();
</script>

<BaseModal bind:showModal>
	<form method="POST" action="?/delete" class=" w-full">
		<h2 class="my-2">Are you sure you want to <b>permanently</b> delete this post?</h2>
		This cannot be undone.
		<hr />
		<div class="mt-4 flex">
			<button class="bg-warn border-0 border-transparent">Confirm Deletion</button>
			<button type="button" onclick={() => (showModal = false)}>Cancel</button>
		</div>
	</form>
</BaseModal>
