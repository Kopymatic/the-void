<script lang="ts">
	import type { PageData } from './$types';
	import Post from '../../../../components/Post.svelte';

	let { data }: { data: PageData } = $props();
</script>

<Post post={data.post}></Post>
