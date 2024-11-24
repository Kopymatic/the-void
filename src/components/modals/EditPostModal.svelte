<script lang="ts">
	import { enhance } from '$app/forms';
	import { CreateFormError } from '$lib';
	import type { ActionData } from '../../routes/posts/[category]/[url]/$types';
	import BaseModal from './BaseModal.svelte';
	import { defaultCategories } from '$lib/defaultCategories';
	import { validateCreateFormClient } from '$lib/formValidation';
	import type { Post } from '@prisma/client';
	import { invalidate, invalidateAll } from '$app/navigation';
	import { onMount } from 'svelte';

	let {
		currentPost,
		showModal = $bindable(),
		form
	}: { showModal: boolean; form?: ActionData; currentPost: Post } = $props();

	// let category: string | undefined = $state(undefined);
	// let url = $state('');

	let { body, category, url, description, unlisted } = $state(currentPost);
	let selectedCategory = $state(defaultCategories[0]);
	let customCategory: string | undefined = $state();
	let finalCategory = $derived(customCategory || selectedCategory);

	if (defaultCategories.includes(category)) selectedCategory = category;
	else {
		selectedCategory = 'custom';
		customCategory = category;
	}

	let completeUrl = $derived(finalCategory + '/' + url);
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

	// $effect(() => {
	// 	console.log(success);
	// 	if (success) invalidateAll();
	// });
</script>

<BaseModal bind:showModal>
	<form
		method="POST"
		action="?/edit"
		class="w-full"
		use:enhance={({ formData, cancel }) => {
			const validation = validateCreateFormClient(formData, cancel);
			if (validation.error) error = validation.error;
			else {
				showModal = false;
				return validation.submit;
			}
		}}
	>
		<label>
			Category
			<br />
			<select name="selectedCategory" bind:value={selectedCategory}>
				{#each defaultCategories as defaultCategory}
					<option value={defaultCategory}>{defaultCategory}</option>
				{/each}
			</select>
		</label>
		<br />
		{#if selectedCategory === 'custom'}
			<label>
				Custom Category
				<br />
				<input name="customCategory" bind:value={customCategory} />
				{#if error === CreateFormError.invalidCategory || error === CreateFormError.missingCategory}
					<p class="error">{error}</p>
				{/if}
			</label>
			<br />
		{/if}
		<label>
			Desired URL for the post
			<br />
			<input name="url" type="text" required={true} bind:value={url} />
			{#if error === CreateFormError.invalidUrl || error === CreateFormError.missingUrl}
				<p class="error">{error}</p>
			{/if}
		</label>
		<p>your post will be at {completeUrl}</p>
		<label>
			Brief Description
			<br />
			<input
				name="description"
				type="text"
				maxlength={128}
				required={false}
				bind:value={description}
			/>
		</label>
		<br />
		<label>
			Body
			<br />
			<textarea name="body" required={true} bind:value={body}></textarea>
			{#if error === CreateFormError.missingBody || error === CreateFormError.missingUrl}
				<p class="error">{error}</p>
			{/if}
		</label>
		<br />
		<br />
		<div
			class="box-border flex max-h-min items-center rounded-md border-2 border-primary bg-secondary px-4 md:w-1/3"
		>
			<input
				id="unlisted"
				type="checkbox"
				name="unlisted"
				class="h-4 w-4 rounded text-accent focus:ring-accent"
				bind:checked={unlisted}
			/>
			<label for="unlisted" class="ms-2 w-full py-4">Unlisted</label>
		</div>
		<br />
		<button type="submit">Post!</button>
		{#if error === CreateFormError.databaseError}
			<p class="error">{error}</p>
		{/if}
	</form>
</BaseModal>

<style>
	input,
	textarea,
	button {
		@apply w-full;
	}
</style>
