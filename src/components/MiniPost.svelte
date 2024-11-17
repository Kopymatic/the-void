<script lang="ts">
	import type { Post } from '@prisma/client';
	import SvelteMarkdown from 'svelte-markdown';
	import MiniPost from './MiniPost.svelte';
	import ContentBox from './ContentBox.svelte';

	let { post, className }: { post: Post; className?: string } = $props();

	let { category, url, description, author, body, createdAt, id } = post;

	let fullUrl = category && url ? `/posts/${category}/${url}` : undefined;
</script>

<ContentBox url={`/posts/${category}/${url}`}>
	<b>{`[${id}] `}<a href={fullUrl}>{category}/{url}</a></b>
	<p class="line-clamp-1">{description}</p>
	<div class="line-clamp-3">
		<SvelteMarkdown source={post.body}></SvelteMarkdown>
	</div>
</ContentBox>

<style>
	p {
		@apply my-1;
	}
</style>
