<script lang="ts">
	import { enhance } from "$app/forms";
	import { CreateFormError } from "$lib";
	import type { ActionData } from "../../../routes/posts/[category]/[url]/$types";
	import BaseModal from "./BaseModal.svelte";
	import { defaultCategories } from "$lib/defaultCategories";
	import { validateCreateFormClient } from "$lib/formValidation";
	import { invalidateAll } from "$app/navigation";
	import { onMount } from "svelte";
	import CancelButton from "../buttons/CancelButton.svelte";
	import ConfirmButton from "../buttons/ConfirmButton.svelte";

	let { showModal = $bindable(), form }: { showModal: boolean; form?: ActionData } = $props();

	let selectedCategory: string = $state(defaultCategories[6]);
	let customCategory: string | undefined = $state(undefined);
	const finalCategory = $derived(customCategory || selectedCategory);
	let url = $state("");
	const completeUrl = $derived(finalCategory + "/" + url);

	let error: CreateFormError | undefined = $state(form?.error);
	const success = $state(form?.message);

	onMount(() => {
		const interval = setInterval(() => {
			if (success) invalidateAll();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<BaseModal hideWhenUnfocused={false} bind:showModal>
	<form
		method="POST"
		action="/posts/create?/post"
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
				{#each defaultCategories as defaultCategory (defaultCategory)}
					<option value={defaultCategory}>{defaultCategory}</option>
				{/each}
			</select>
		</label>
		<br />
		{#if selectedCategory === "custom"}
			<label>
				Custom Category
				<br />
				<input class="w-full" name="customCategory" bind:value={customCategory} />
				{#if error === CreateFormError.invalidCategory || error === CreateFormError.missingCategory}
					<p class="error">{error}</p>
				{/if}
			</label>
			<br />
		{/if}
		<label>
			Desired URL for the post
			<br />
			<input class="w-full" name="url" type="text" required={true} bind:value={url} />
			{#if error === CreateFormError.invalidUrl || error === CreateFormError.missingUrl}
				<p class="error">{error}</p>
			{/if}
		</label>
		<p>your post will be at {completeUrl}</p>
		<label>
			Brief Description
			<br />
			<input class="w-full" name="description" type="text" maxlength={128} required={false} />
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
			class="border-primary bg-secondary box-border flex max-h-min items-center rounded-md border-2 px-4 md:w-1/3"
		>
			<input
				id="unlisted"
				type="checkbox"
				name="unlisted"
				class="text-accent focus:ring-accent h-4 w-4 rounded-sm"
			/>
			<label for="unlisted" class="ms-2 w-full py-4">Unlisted</label>
		</div>
		<br />
		<div class="flex flex-auto gap-2">
			<ConfirmButton type="submit" class="w-full" text="Post!"></ConfirmButton>
			<CancelButton
				class="w-full"
				onclick={() => {
					showModal = false;
				}}
			></CancelButton>
		</div>
		{#if error === CreateFormError.databaseError}
			<p class="error">{error}</p>
		{/if}
	</form>
</BaseModal>

<style>
	input,
	textarea {
		@apply w-full;
	}
</style>
