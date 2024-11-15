<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<h2 class="mb-2">
	<a href={`/posts/${data.category}/${data.url}`}>/posts/{data.category}/{data.url}</a>
</h2>
<p class="my-2">{data.description}</p>
<hr class="my-2" />
<SvelteMarkdown source={data.body}></SvelteMarkdown>
<hr class="my-2" />
<footer>
	<p class="my-2 py-0">
		you're viewing post id <a href={`/posts/${data.id}`}>{data.id}</a>
	</p>
	<a class="my-2 py-0" href="/">take me home</a>
</footer>
