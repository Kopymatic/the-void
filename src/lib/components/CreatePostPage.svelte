<script lang="ts">
	import { enhance } from "$app/forms";
	import { CreateFormError } from "$lib";
	import type { ActionData } from "../../routes/posts/[category]/[url]/$types";;
	import { defaultCategories } from "$lib/defaultCategories";
	import { validateCreateFormClient } from "$lib/formValidation";
	import { invalidateAll } from "$app/navigation";
	import { onMount } from "svelte";
	import ConfirmButton from "$lib/components/buttons/ConfirmButton.svelte";

	let { form }: { form?: ActionData } = $props();

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

<form
		method="POST"
		action="/posts/create?/post"
		class="w-full flex flex-col hover-shrink-div group *:w-full generic-border-children *:mb-3"
		use:enhance={({ formData, cancel }) => {
			const validation = validateCreateFormClient(formData, cancel);
			if (validation.error) error = validation.error;
			else {
				return validation.submit;
			}
		}}
	>
  <div class="p-3">
    <p class="font-bold text-xl mb-2">Where do you want your post?</p>
    <label for="selectedCategory">
      Category
    </label>
    <select class="w-full" id="selectedCategory" name="selectedCategory" bind:value={selectedCategory}>
    {#each defaultCategories as defaultCategory (defaultCategory)}
      <option value={defaultCategory}>{defaultCategory}</option>
    {/each}
    </select>
    {#if selectedCategory === "custom"}
      <label for="customCategory">
        Custom Category
      </label>
      <input class="w-full" name="customCategory" id="customCategory" bind:value={customCategory} />
      {#if error === CreateFormError.invalidCategory || error === CreateFormError.missingCategory}
        <p class="error">{error}</p>
      {/if}
    {/if}
    <label class="" for="url">
      Desired URL for the post
    </label>
    <input class="w-full" id="url" name="url" type="text" required={true} bind:value={url} />
    {#if error === CreateFormError.invalidUrl || error === CreateFormError.missingUrl}
      <p class="error">{error}</p>
    {/if}
    <p class="font-bold text-xl my-4">Your post will be at {completeUrl}</p>
  </div>
  <div class="p-3">
    <p class="font-bold text-xl mb-2">Write your post.</p>
    <label for="description">
      Brief Description
    </label>
    <input class="w-full" name="description" id="description" type="text" maxlength={128} required={false} />
    <label for="body">
      Body
    </label>
    <textarea class="w-full h-64" id="body" name="body" required={true}></textarea>
    {#if error === CreateFormError.missingBody || error === CreateFormError.missingUrl}
      <p class="error">{error}</p>
    {/if}
    <div
      class="border-primary bg-secondary box-border flex max-h-min items-center rounded-md border-2 px-4 w-full mt-2  "
    >
    <input
      id="unlisted"
      type="checkbox"
      name="unlisted"
      class="text-accent focus:ring-accent h-4 w-4 rounded-sm"
    />
    <label for="unlisted" class="ms-2 w-full py-3">Unlisted</label>
    </div>
  </div>
  <div class="w-full p-3">
    <ConfirmButton type="submit" class="w-full" text="Post!"></ConfirmButton>
  </div>
  {#if error === CreateFormError.databaseError}
    <p class="error">{error}</p>
  {/if}
</form> 