<script lang="ts">
	import type { Snippet } from "svelte";

	const { children, class: className = "" }: { children: Snippet<[]>; class?: string } = $props();
</script>

<article
	class={`prose prose-invert mx-auto w-full max-w-screen  px-2 sm:px-0 lg:w-4xl ${className}`}
>
	{@render children()}
</article>
