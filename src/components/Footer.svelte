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
			you're signed in as {user?.name} - <a href="/login">log out</a> <br />
			{#if user?.isAdmin}
				<a href="/blog/create">create a post</a> - <a href="/blog/list/all">list all posts</a>
			{/if}
		{/if}
		<br />
		<a class="my-2 py-0" href="/">take me home</a>
		<p class="text-secondary-text text-sm">
			v{`${versions.package}`} - commit
			<a target="_blank" href={`https://github.com/Kopymatic/the-void/commit/${versions.git}`}
				>{`${versions.git}`}</a
			>
		</p>
	</div>
</footer>
