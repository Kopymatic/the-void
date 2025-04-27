<script lang="ts">
	import type { PageData } from './$types';
	import Post from '../../../../components/Post.svelte';

	let { data }: { data: PageData } = $props();
</script>

<!-- todo: make it so you can edit posts at their id url -->
<Post editable={false} post={data.post}></Post>
