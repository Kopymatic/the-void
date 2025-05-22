<script lang="ts">
	import { page } from '$app/state';
	import type { SessionUser } from '$lib/server/types';
	import FunnyText from './FunnyText.svelte';
	import CreatePostModal from './modals/CreatePostModal.svelte';
	import CreateShortcutModal from './modals/CreateShortcutModal.svelte';
	let session = page.data.session;
	let user: SessionUser | undefined = $state(page.data.user);
	let versions: {
		git: string;
		package: string;
	} = $state(page.data.versions);

	let showPostModal = $state(false);
	let showShortcutModal = $state(false);
</script>

<footer class="mx-auto w-full justify-items-center text-center">
	{#if session && user}
		you're signed in as {user?.name} - <a href="/login">log out</a> <br />
		{#if user?.isAdmin}
			<button
				class="text-accent inline cursor-pointer border-0 bg-transparent p-0"
				onclick={() => {
					showPostModal = true;
				}}>create a post</button
			>
			- <a href="/posts/all">list all posts</a>
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
	<p class="text-secondary-text text-sm">
		v{`${versions.package}`} - commit
		<a target="_blank" href={`https://github.com/Kopymatic/the-void/commit/${versions.git}`}
			>{`${versions.git}`}</a
		>
	</p>
</footer>
<CreatePostModal bind:showModal={showPostModal}></CreatePostModal>
<CreateShortcutModal bind:showModal={showShortcutModal}></CreateShortcutModal>
