<script lang="ts">
	import type { Post } from "@prisma/client";
	import MiniPost from "./MiniPost.svelte";
	import Article from "./Article.svelte";

	const { posts }: { posts: Post[] } = $props();
</script>

<Article>
	<div
		class="group mx-auto grid grid-cols-1 gap-2 *:mx-auto *:box-border *:group-hover:scale-95 *:group-hover:opacity-90 *:hover:z-10 *:hover:scale-105 *:hover:opacity-100 sm:grid-cols-2 xl:grid-cols-3"
	>
		{#each posts as post (post.id)}
			<MiniPost {post}></MiniPost>
		{:else}
			<p>Nothing found to list!</p>
		{/each}
	</div>
</Article>
