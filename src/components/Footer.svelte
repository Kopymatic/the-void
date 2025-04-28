<script lang="ts">
	import { page } from '$app/stores';
	import type { SessionUser } from '$lib/server/types';
	import FunnyText from './FunnyText.svelte';
	import CreatePostModal from './modals/CreatePostModal.svelte';
	let session = $page.data.session;
	let user: SessionUser | undefined = $state($page.data.user);
	let versions: {
		git: string;
		package: string;
	} = $state($page.data.versions);

	let showCreateModal = $state(false);
</script>

<footer class="mx-auto w-full justify-items-center text-center">
	{#if session && user}
		you're signed in as {user?.name} - <a href="/login">log out</a> <br />
		{#if user?.isAdmin}
			<button
				class="text-accent inline cursor-pointer border-0 bg-transparent p-0"
				onclick={() => {
					showCreateModal = true;
				}}>create a post</button
			>
			- <a href="/blog/list/all">list all posts</a>
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
<CreatePostModal bind:showModal={showCreateModal}></CreatePostModal>
