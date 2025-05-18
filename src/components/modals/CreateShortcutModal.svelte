<script lang="ts">
	import { enhance } from '$app/forms';
	import { CreateFormError } from '$lib';
	import type { ActionData } from '../../routes/blog/posts/[category]/[url]/$types';
	import BaseModal from './BaseModal.svelte';
	import { defaultCategories } from '$lib/defaultCategories';
	import { validateCreateFormClient, validateShortcutFormClient } from '$lib/formValidation';
	import { invalidateAll } from '$app/navigation';
	import { onMount } from 'svelte';

	let { showModal = $bindable(), form }: { showModal: boolean; form?: ActionData } = $props();

	let shortcutName = $state('');
	let completeUrl = $derived('kopymatic.com/quick/' + shortcutName);
	let completeFyiUrl = $derived('kopy.fyi/' + shortcutName);

	let error: CreateFormError | undefined = $state(form?.error);
	let success = $state(form?.success);

	onMount(() => {
		const interval = setInterval(() => {
			if (success) invalidateAll();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<BaseModal bind:showModal>
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
			{#if error === CreateFormError.invalidUrl || error === CreateFormError.missingUrl}
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
		</label>
		<button class="mt-10">Post!</button>
		{#if error === CreateFormError.databaseError}
			<p class="error">{error}</p>
		{/if}
	</form>
</BaseModal>

<style>
	input,
	button {
		@apply w-full;
	}
</style>
