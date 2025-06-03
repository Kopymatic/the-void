<script>
	import CreateShortcutModal from "$lib/components/modals/CreateShortcutModal.svelte";

	import { page } from "$app/state";

	let urlParams = page.url.searchParams.get("link");
	let textParams = page.url.searchParams.get("text");
	let titleParams = page.url.searchParams.get("title");
</script>

{`Link: ${urlParams} - Text: ${textParams} - Title: ${titleParams}`}
<CreateShortcutModal showModal={true}></CreateShortcutModal>
