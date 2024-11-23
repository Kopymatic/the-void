<script lang="ts">
	import { page } from '$app/stores';
	import type { Post } from '@prisma/client';
	import SvelteMarkdown from 'svelte-markdown';
	import Article from './Article.svelte';
	import Modal from './modals/BaseModal.svelte';
	import type { SessionUser } from '$lib/server/types';
	import DeletePostModal from './modals/DeletePostModal.svelte';

	let user: SessionUser | undefined = $state($page.data.user);

	let { post }: { post: Post } = $props();

	let showDeleteModal = $state(false);

	const deletePost = () => {};
</script>

<svelte:head>
	<title>{`${post.category}/${post.url}`}</title>
	<meta name="description" content={post.description} />
	<meta name="og:title" content={`${post.category}/${post.url}`} />
	<meta name="og:site_name" content="the void" />
	<meta name="og:description" content={post.description} />
</svelte:head>

<Article>
	<div class="my-4 flex items-center justify-between *:self-center">
		<h2 class="my-auto text-center">
			{`[${post.id}]`}
			<a href={`/posts/${post.category}/${post.url}`}>/posts/{post.category}/{post.url}</a>
			{#if post.unlisted}
				<i class="text-secondary-text">(unlisted)</i>
			{/if}
		</h2>
		{#if user?.isAdmin}
			<div>
				<button class="max-h-min"> Edit </button>
				<button
					class="hover:bg-warn-red max-h-min duration-300"
					onclick={() => {
						showDeleteModal = true;
					}}
				>
					Delete
				</button>
			</div>
		{/if}
	</div>
	<p class="my-2">{post.description}</p>
	<p class="my-2 text-secondary-text">
		{#if post.createdAt}
			Created at {post.createdAt.toLocaleString()}
		{/if}
		{#if post.createdAt && post.updatedAt}
			-
		{/if}
		{#if post.updatedAt}
			Updated at {post.updatedAt.toLocaleString()}
		{/if}
	</p>
	<hr class="my-2" />
	<SvelteMarkdown source={post.body}></SvelteMarkdown>
	<hr class="my-2" />
</Article>

<DeletePostModal bind:showModal={showDeleteModal}></DeletePostModal>
