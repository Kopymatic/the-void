<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<h2 class="mb-2">
	{`[${data.id}]`}
	<a href={`/posts/${data.category}/${data.url}`}>/posts/{data.category}/{data.url}</a>
</h2>
<p class="my-2">{data.description}</p>
<hr class="my-2" />
<SvelteMarkdown source={data.body}></SvelteMarkdown>
<hr class="my-2" />
