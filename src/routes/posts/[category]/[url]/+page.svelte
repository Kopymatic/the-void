<script lang="ts">
	import type { PageData } from "./$types";
	import Post from "$lib/components/Post.svelte";

	const { data }: { data: PageData } = $props();
</script>

<Post post={data.post}></Post>
