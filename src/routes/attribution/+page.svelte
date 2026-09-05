<script lang="ts">
	import SvelteMarkdown from "@humanspeak/svelte-markdown";
	import { page } from "$app/state";

	let attributionUrl = `${page.url.origin}/attribution.md`;
	let attributionBlob = await (await fetch(attributionUrl)).blob();
	let attribution = await attributionBlob.text();
</script>

<SvelteMarkdown source={attribution}></SvelteMarkdown>
<br />
<p>
	Plus all the dependencies in <a
		href="https://github.com/Kopymatic/the-void/blob/main/package.json">package.json</a
	>
</p>
