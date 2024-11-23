<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { CreateFormError } from '$lib';
	import Article from '../../components/Article.svelte';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
	let defaultCategories = data.defaultCategories;

	let selectedCategory: string = $state(defaultCategories[0]);
	let customCategory: string | undefined = $state(undefined);
	let finalCategory = $derived(customCategory || selectedCategory);
	let url = $state('');
	let completeUrl = $derived(finalCategory + '/' + url);
	let error: CreateFormError | undefined = $state(form?.error);

	const categoryRegex = /^[a-z\-0-9]+$/;
	const urlRegex = /^[a-z\-0-9]+$/;
</script>

<Article>
	<form
		method="POST"
		action="?/post"
		class=" w-full"
		use:enhance={({ formData, cancel }) => {
			let url = formData.get('url')?.toString();
			let selectedCategory = formData.get('selectedCategory')?.toString();
			let customCategory = formData.get('customCategory')?.toString();
			let body = formData.get('body')?.toString();
			let category = customCategory || selectedCategory;

			// Filter out all the required params
			if (!url) {
				error = CreateFormError.missingUrl;
				cancel();
				return;
			}
			if (!body) {
				error = CreateFormError.missingBody;
				cancel();
				return;
			}
			if (!category) {
				error = CreateFormError.missingCategory;
				cancel();
				return;
			}

			// filter out incorrect formatting
			if (!categoryRegex.test(category)) {
				error = CreateFormError.invalidCategory;
				cancel();
				return;
			}
			if (!urlRegex.test(url)) {
				error = CreateFormError.invalidUrl;
				cancel();
				return;
			}

			return async ({ result }) => {
				// `result` is an `ActionResult` object
				if (result.type === 'redirect') {
					goto(result.location);
				} else {
					await applyAction(result);
				}
			};
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
			<input name="description" type="text" maxlength={128} required={false} />
		</label>
		<br />
		<label>
			Body
			<br />
			<textarea name="body" required={true}></textarea>
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
			/>
			<label for="unlisted" class="ms-2 w-full py-4">Unlisted</label>
		</div>
		<br />
		<button>Post!</button>
		{#if error === CreateFormError.databaseError}
			<p class="error">{error}</p>
		{/if}
	</form>
</Article>

<style>
	label,
	input,
	br,
	textarea {
		@apply w-full;
	}
	.error {
		@apply m-0 p-0 text-sm text-error;
	}
</style>
