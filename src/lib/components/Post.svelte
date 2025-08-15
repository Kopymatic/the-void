<script lang="ts">
	import { page } from "$app/stores";
	import type { Post } from "@prisma/client";
	import SvelteMarkdown from "svelte-markdown";
	import Article from "./Article.svelte";
	import type { SessionUser } from "$lib/server/types";
	import DeletePostModal from "./modals/DeletePostModal.svelte";
	import EditPostModal from "./modals/EditPostModal.svelte";
	import EditIcon from "./icons/EditIcon.svelte";
	import TrashIcon from "./icons/TrashIcon.svelte";
	import IconButton from "./buttons/IconButton.svelte";

	const user: SessionUser | undefined = $state($page.data.user);

	const { post, editable = true }: { post: Post; editable?: boolean } = $props();

	let showDeleteModal = $state(false);
	let showEditModal = $state(false);

	const updatedAtIsDifferent = post.updatedAt.getTime() != post.createdAt.getTime();

	const openShareMenu = () => {
		navigator.share({ url: $page.url.pathname });
	};
</script>

<svelte:head>
	<title>{`${post.category}/${post.url}`}</title>
	<meta name="description" content={post.description} />
	<meta name="og:title" content={`${post.category}/${post.url}`} />
	<meta name="og:site_name" content="Kopymatic.com" />
	<meta name="og:description" content={post.description} />
</svelte:head>

<Article>
	<div class=" flex content-center items-center justify-between">
		<h2 class="not-prose my-6 text-xl font-bold">
			<a href={`/posts/${post.category}/${post.url}`}>/posts/{post.category}/{post.url}</a>
			<br class="md:hidden" />
			{#if post.unlisted}
				<i class="text-secondary-text">(unlisted)</i>
			{/if}
		</h2>

		<div class="flex flex-col gap-1 md:flex-row">
			<IconButton
				onclick={openShareMenu}
				icon="share"
				class="group-hover:scale-90 hover:scale-110"
			/>
			{#if user?.isAdmin && editable}
				<button
					class="flex max-h-min flex-nowrap"
					onclick={() => {
						showEditModal = true;
					}}
				>
					<EditIcon /> Edit
				</button>
				<button
					class="bg-warn flex max-h-min flex-nowrap"
					onclick={() => {
						showDeleteModal = true;
					}}
				>
					<TrashIcon /> Delete
				</button>
			{/if}
		</div>
	</div>
	<p class="my-2">{post.description}</p>
	<p class="text-secondary-text my-2">
		{`[#${post.id}]`}
		{#if post.createdAt}
			- Created at {post.createdAt.toLocaleString("en-US", {
				dateStyle: "medium",
				timeStyle: "short"
			})}
		{/if}
		{#if post.createdAt && updatedAtIsDifferent}
			-
		{/if}
		{#if post.updatedAt && updatedAtIsDifferent}
			Updated at {post.updatedAt.toLocaleString("en-US", {
				dateStyle: "medium",
				timeStyle: "short"
			})}
		{/if}
	</p>
	<hr class="my-2" />
	<SvelteMarkdown source={post.body}></SvelteMarkdown>
	<hr class="my-2" />
</Article>

<DeletePostModal bind:showModal={showDeleteModal}></DeletePostModal>
<EditPostModal currentPost={post} bind:showModal={showEditModal}></EditPostModal>
