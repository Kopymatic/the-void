<script lang="ts">
	import type { PageData } from './$types';
	import MiniPost from '../../components/MiniPost.svelte';
	import PostList from '../../components/PostList.svelte';

	let { data }: { data: PageData } = $props();
	const posts = data.posts;
</script>

<PostList {posts}></PostList>
