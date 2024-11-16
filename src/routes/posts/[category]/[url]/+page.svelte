<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<head>
	<meta name="og:title" content={`${data.category}/${data.url}`} />
	<meta name="og:site_name" content="the void" />
	<meta name="og:description" content={data.description} />
</head>

<h2 class="mb-2">
	{`[${data.id}]`}
	<a href={`/posts/${data.category}/${data.url}`}>/posts/{data.category}/{data.url}</a>
</h2>
<p class="my-2">{data.description}</p>
<hr class="my-2" />
<SvelteMarkdown source={data.body}></SvelteMarkdown>
<hr class="my-2" />
