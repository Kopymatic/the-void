<script lang="ts">
	import type { Post } from "@prisma/client";
	import MiniPost from "./MiniPost.svelte";
	import Article from "./Article.svelte";

	const { posts }: { posts: Post[] } = $props();
</script>

<Article>
	<div class="mx-auto grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
		{#each posts as post (post.id)}
			<MiniPost {post}></MiniPost>
		{:else}
			<p>Nothing found to list!</p>
		{/each}
	</div>
</Article>
