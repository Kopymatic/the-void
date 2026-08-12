<script lang="ts">
	import { enhance } from "$app/forms";
	import { ShortcutFormError } from "$lib";
	import BaseModal from "./BaseModal.svelte";
	import { validateShortcutFormEnhanced } from "$lib/formValidation";
	import type { Shortcut } from "@prisma/client";
	import { invalidateAll } from "$app/navigation";
	import PrimaryButton from "../buttons/PrimaryButton.svelte";
	import SecondaryButton from "../buttons/SecondaryButton.svelte";

	let {
		showModal = $bindable(),
		shortcut,
		currentName
	}: { showModal: boolean; shortcut: Shortcut; currentName: string } = $props();

	let shortcutName = $state(shortcut.shortcut);
	let destination = $state(shortcut.redirectUrl);
	let aliases = $state(shortcut.aliases);

	const completeUrl = $derived("kopymatic.com/quick/" + shortcutName);
	const completeFyiUrl = $derived("kopy.fyi/" + shortcutName);
	const completeWtfUrl = $derived("heyso.wtf/" + shortcutName);

	const shortcutCheck = (nameCheck: string): string[] => {
		let addedAliases: string[] = [];

		let replaceBoth = nameCheck.replaceAll("_", "").replaceAll("-", "");
		if (replaceBoth !== nameCheck) addedAliases.push(replaceBoth);
		return addedAliases;
	};

	let aliasesInput: string = $state(aliases.join(","));
	let allAliases: string[] = $derived([
		...aliasesInput.split(",").flatMap((alias) => (alias ? [alias.trim().toLowerCase()] : [])), //mess is to remove the one array if the list is empty
		...shortcutCheck(shortcutName).flat()
	]);

	let error: ShortcutFormError | undefined = $state(undefined);

	const copyToClipboard = () => {
		navigator.clipboard.writeText(`https://${completeFyiUrl}`);
	};
</script>

<BaseModal hideWhenUnfocused={false} bind:showModal>
	<form
		method="POST"
		action={`/quick/${currentName}?/edit`}
		class="w-full"
		use:enhance={({ formData, cancel }) => {
			const validation = validateShortcutFormEnhanced(formData, cancel);
			if (validation.error) error = validation.error;
			else {
				showModal = false;
				//This is jank, but it makes the page update after the form is done. Ill take it
				setTimeout(() => {
					copyToClipboard();
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
			Your shortcut will be at {completeUrl},<br />
			{completeFyiUrl},<br /> and {completeWtfUrl}
		</p>
		<label>
			Any Aliases? (comma seperated)
			<br />
			<input
				class="w-full"
				name="aliasesInput"
				type="text"
				maxlength={128}
				bind:value={aliasesInput}
			/>
			<p class="text-secondary-text">
				{#if allAliases.length > 0}
					Your shortcut will have {allAliases.length} alias{allAliases.length > 1 ? "es" : ""}: {#each allAliases as alias, index (alias)}
						{alias}{allAliases.length - index !== 1 ? "," : ""}
					{/each}
				{/if}
			</p>
		</label>
		<label class="hidden">
			<input name="aliases" bind:value={allAliases} />
		</label>
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
				bind:value={destination}
			/>
			{#if error === ShortcutFormError.invalidDestination || error === ShortcutFormError.missingDestination}
				<p class="error">{error}</p>
			{/if}
		</label>
		<div class="mt-5 flex flex-auto gap-2">
			<PrimaryButton type="submit" icon="check" class="w-full" text="Confirm Edit" />
			<SecondaryButton
				icon="cancel"
				text="Cancel"
				class="w-full"
				onclick={() => {
					showModal = false;
				}}
			/>
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
