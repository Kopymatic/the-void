<script lang="ts">
	import { page } from '$app/stores';
	import type { SessionUser } from '$lib/server/types';
	let session = $page.data.session;
	let user: SessionUser | undefined = $state($page.data.user);
	let versions: {
		git: string;
		package: string;
	} = $state($page.data.versions);
</script>

<footer class="mx-auto w-full justify-items-center text-center">
	<div>
		{#if session && user}
			You're signed in as {user?.name}.
			{#if user?.isAdmin}
				<br /> <a href="/create">Create a post.</a>
				<br /> <a href="/list/all">List all posts</a>
				<br /> <a href="/login">Log out</a>
			{/if}
		{/if}
		<br />
		<a class="my-2 py-0" href="/">take me home</a>
		<p class="text-sm text-secondary-text">
			Running V{`${versions.package}`} - Commit
			<a target="_blank" href={`https://github.com/Kopymatic/the-void/commit/${versions.git}`}
				>{`${versions.git}`}</a
			>
		</p>
	</div>
</footer>
