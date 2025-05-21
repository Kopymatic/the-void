<script lang="ts">
	import type { Post } from '@prisma/client';
	import SvelteMarkdown from 'svelte-markdown';
	import ContentBox from './ContentBox.svelte';

	let { post }: { post: Post } = $props();

	let { category, url, description, author, body, createdAt, id } = post;

	let fullUrl = category && url ? `/posts/${category}/${url}` : undefined;
</script>

<ContentBox prose small>
	<b><a href={fullUrl}>{category}/{url}</a></b>
	{#if post.unlisted}
		<i class="text-secondary-text">(unlisted)</i>
	{/if}
	<p class="line-clamp-1 text-lg font-bold">{description}</p>
	<div class="not-prose line-clamp-3">
		<SvelteMarkdown source={post.body}></SvelteMarkdown>
	</div>
</ContentBox>
