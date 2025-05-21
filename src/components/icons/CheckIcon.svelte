<script lang="ts">
	// thank you reddit
	// https://www.reddit.com/r/sveltejs/comments/1dodc08/comment/la8za5c/
	let { class: className = '' }: { class?: string } = $props();
</script>

<xml version="1.0"
	><svg
		class={className}
		fill="none"
		height="24"
		stroke="currentColor"
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke-width="2"
		viewBox="0 0 24 24"
		width="24"
		xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12" /></svg
	>
</xml>
