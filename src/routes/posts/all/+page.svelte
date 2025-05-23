<script lang="ts">
	import type { PageData } from "./$types";
	import PostList from "../../../components/PostList.svelte";

	const { data }: { data: PageData } = $props();
	const posts = data.posts;
</script>

<PostList {posts}></PostList>
