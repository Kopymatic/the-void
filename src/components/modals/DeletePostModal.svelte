<script lang="ts">
	import CancelButton from '../buttons/CancelButton.svelte';
	import TrashIcon from '../icons/TrashIcon.svelte';
	import BaseModal from './BaseModal.svelte';

	let { showModal = $bindable() }: { showModal: boolean } = $props();
</script>

<BaseModal bind:showModal>
	<form method="POST" action="?/delete" class=" w-full">
		<h2 class="my-2">Are you sure you want to <b>permanently</b> delete this post?</h2>
		This cannot be undone.
		<hr />
		<div class="mt-4 flex flex-col gap-2 md:flex-row">
			<button class="bg-warn flex w-full flex-nowrap border-0 border-transparent text-center">
				<TrashIcon class="mr-1" /> Confirm Deletion
			</button>
			<CancelButton type="button" onclick={() => (showModal = false)} />
		</div>
	</form>
</BaseModal>
