<script lang="ts">
	import { enhance } from "$app/forms";
	import { ShortcutFormError } from "$lib";
	import BaseModal from "./BaseModal.svelte";
	import { validateShortcutFormClient } from "$lib/formValidation";
	import ConfirmButton from "../buttons/ConfirmButton.svelte";
	import CancelButton from "../buttons/CancelButton.svelte";
	import type { Shortcut } from "@prisma/client";
	import { invalidateAll } from "$app/navigation";

	let {
		showModal = $bindable(),
		shortcut,
		currentName
	}: { showModal: boolean; shortcut: Shortcut; currentName: string } = $props();

	let shortcutName = $state(shortcut.shortcut);
	let completeUrl = $derived("kopymatic.com/quick/" + shortcutName);
	let completeFyiUrl = $derived("kopy.fyi/" + shortcutName);
	let redirectUrl = $state(shortcut.redirectUrl);

	let error: ShortcutFormError | undefined = $state(undefined);
</script>

<BaseModal hideWhenUnfocused={false} bind:showModal>
	<form
		method="POST"
		action={`/quick/${currentName}?/edit`}
		class="w-full"
		use:enhance={({ formData, cancel }) => {
			const validation = validateShortcutFormClient(formData, cancel);
			if (validation.error) error = validation.error;
			else {
				showModal = false;
				//This is jank, but it makes the page update after the form is done. Ill take it
				setTimeout(() => {
					invalidateAll();
				}, 1000);
				return validation.submit;
			}
		}}
	>
		<label>
			Shortcut Name
			<br />
			<input
				class="w-full"
				name="name"
				type="text"
				required={true}
				maxlength={64}
				bind:value={shortcutName}
			/>
			{#if error === ShortcutFormError.invalidName || error === ShortcutFormError.missingName}
				<p class="error">{error}</p>
			{/if}
		</label>
		<p class="text-secondary-text">
			Your shortcut will be at {completeUrl} <br />and {completeFyiUrl}
		</p>
		<br />
		<label>
			Destination URL
			<br />
			<input
				class="w-full"
				name="destination"
				type="text"
				placeholder="https://www.example.com/"
				required={true}
				bind:value={redirectUrl}
			/>
			{#if error === ShortcutFormError.invalidDestination || error === ShortcutFormError.missingDestination}
				<p class="error">{error}</p>
			{/if}
		</label>
		<div class="mt-5 flex flex-auto gap-2">
			<ConfirmButton class="w-full" text="Confirm Edit"></ConfirmButton>
			<CancelButton
				class="w-full"
				onclick={() => {
					showModal = false;
				}}
			></CancelButton>
		</div>
		{#if error === ShortcutFormError.databaseError}
			<p class="error">{error}</p>
		{/if}
	</form>
</BaseModal>

<style>
	input {
		@apply w-full;
	}
</style>
