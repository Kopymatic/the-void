<script lang="ts">
	import type { Post } from "@prisma/client";
	import SvelteMarkdown from "svelte-markdown";
	import ContentBox from "./ContentBox.svelte";

	const { post }: { post: Post } = $props();

	const { category, url, description } = post;

	const fullUrl = category && url ? `/posts/${category}/${url}` : undefined;
</script>

<ContentBox prose small>
	<div class="flex flex-row justify-between *:my-auto *:h-full">
		<b class="text-center align-middle"><a href={fullUrl}>{category}/{url}</a></b>
		<p class="text-secondary-text text-center">
			{post.createdAt.toLocaleString("en-US", {
				dateStyle: "short"
			})}
		</p>
	</div>
	{#if post.unlisted}
		<i class="text-secondary-text">(unlisted)</i>
	{/if}
	<p class="line-clamp-1 text-lg font-bold">{description}</p>
	<div class="not-prose line-clamp-3">
		<SvelteMarkdown source={post.body}></SvelteMarkdown>
	</div>
</ContentBox>
