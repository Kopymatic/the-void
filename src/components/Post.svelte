<script lang="ts">
	import type { Post } from '@prisma/client';
	import SvelteMarkdown from 'svelte-markdown';

	let { post }: { post: Post } = $props();
</script>

<svelte:head>
	<title>{`${post.category}/${post.url}`}</title>
	<meta name="description" content={post.description} />
	<meta name="og:title" content={`${post.category}/${post.url}`} />
	<meta name="og:site_name" content="the void" />
	<meta name="og:description" content={post.description} />
</svelte:head>

<h2 class="mb-2">
	{`[${post.id}]`}
	<a href={`/posts/${post.category}/${post.url}`}>/posts/{post.category}/{post.url}</a>
	{#if post.unlisted}
		<i class="text-gray-500">(unlisted)</i>
	{/if}
</h2>
<p class="my-2">{post.description}</p>
<p class="my-2 text-gray-400">
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
