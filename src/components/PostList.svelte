<script lang="ts">
	import type { Post } from '@prisma/client';
	import MiniPost from './MiniPost.svelte';

	let { posts }: { posts: Post[] } = $props();
</script>

<div class="mx-auto grid grid-cols-1 *:mx-2 *:max-w-full sm:grid-cols-2 md:grid-cols-3">
	{#each posts as post (post.id)}
		<MiniPost {post}></MiniPost>
	{:else}
		<p>Nothing found to list!</p>
	{/each}
</div>
