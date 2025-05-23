<script lang="ts">
	import { applyAction, enhance } from "$app/forms";
	import { goto, invalidateAll } from "$app/navigation";
	import type { ActionResult } from "@sveltejs/kit";
	import CancelButton from "../buttons/CancelButton.svelte";
	import TrashIcon from "../icons/TrashIcon.svelte";
	import BaseModal from "./BaseModal.svelte";

	let { showModal = $bindable(), name }: { showModal: boolean; name: string } = $props();
</script>

<BaseModal bind:showModal>
	<form
		method="POST"
		action={`/quick/${name}?/delete`}
		class=" w-full"
		use:enhance={() => {
			showModal = false;
			//This is jank, but it makes the page update after the form is done. Ill take it
			setTimeout(() => {
				invalidateAll();
			}, 1000);
			return async ({ result }: { result: ActionResult }) => {
				// `result` is an `ActionResult` object
				if (result.type === "redirect") {
					goto(result.location);
				} else {
					await applyAction(result);
				}
			};
		}}
	>
		<h2 class="my-2">Are you sure you want to <b>permanently</b> delete this shortcut?</h2>
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
