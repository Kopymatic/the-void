<script lang="ts">
	import { enhance } from '$app/forms';
	import { ShortcutFormError } from '$lib';
	import BaseModal from './BaseModal.svelte';
	import { validateShortcutFormClient } from '$lib/formValidation';
	import { invalidateAll } from '$app/navigation';
	import { onMount } from 'svelte';
	import ConfirmButton from '../buttons/ConfirmButton.svelte';
	import CancelButton from '../buttons/CancelButton.svelte';

	let { showModal = $bindable() }: { showModal: boolean } = $props();

	let shortcutName = $state('');
	let completeUrl = $derived('kopymatic.com/quick/' + shortcutName);
	let completeFyiUrl = $derived('kopy.fyi/' + shortcutName);

	let error: ShortcutFormError | undefined = $state(undefined);
</script>

<BaseModal hideWhenUnfocused={false} bind:showModal>
	<form
		method="POST"
		action="/shortcut/create?/post"
		class="w-full"
		use:enhance={({ formData, cancel }) => {
			const validation = validateShortcutFormClient(formData, cancel);
			if (validation.error) error = validation.error;
			else {
				showModal = false;
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
			/>
			{#if error === ShortcutFormError.invalidDestination || error === ShortcutFormError.missingDestination}
				<p class="error">{error}</p>
			{/if}
		</label>
		<div class="mt-5 flex flex-auto gap-2">
			<ConfirmButton class="w-full" text="Create Shortcut"></ConfirmButton>
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
