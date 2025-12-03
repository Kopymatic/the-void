<script lang="ts">
	import { page } from "$app/state";
	import type { SessionUser } from "$lib/server/types";
	import FunnyText from "./FunnyText.svelte";
	import CreateShortcutModal from "./modals/CreateShortcutModal.svelte";
	const session = page.data.session;
	const user: SessionUser | undefined = $state(page.data.user);
	const versions: {
		git: string;
		package: string;
	} = $state(page.data.versions);

	let showShortcutModal = $state(false);
	const today = new Date();
</script>

<footer class="mx-auto w-full justify-items-center text-center">
	{#if session && user}
		you're signed in as {user?.name} - <a href="/login">log out</a> <br />
		{#if user?.isAdmin}
    	<a href="/posts/create">create a post</a> - <a href="/posts/all">list all posts</a>
			<br />
			<button
				class="text-accent inline cursor-pointer border-0 bg-transparent p-0"
				onclick={() => {
					showShortcutModal = true;
				}}>create a shortcut</button
			>
			- <a href="/shortcut/view">list all shortcuts</a>
		{/if}
	{/if}
	<br />
	<a class="my-2 py-0" href="/">take me home</a>
	<FunnyText></FunnyText>
	<p class="text-secondary-text">&copy; {today.getFullYear()} Kopymatic. All rights reserved.</p>
	<p class="text-secondary-text text-sm">
		<a class="text-inherit" href="/login">v</a>{`${versions.package}`}
		{#if versions.git}- commit
			<a target="_blank" href={`https://github.com/Kopymatic/the-void/commit/${versions.git}`}
				>{`${versions.git}`}</a
			>
		{/if}
	</p>
</footer>
<CreateShortcutModal bind:showModal={showShortcutModal}></CreateShortcutModal>
