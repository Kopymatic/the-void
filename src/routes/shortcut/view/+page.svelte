<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const shortcuts = data.shortcuts;
</script>

<div class="mx-auto my-8 flex flex-col">
	{#each shortcuts as shortcut}
		<div class="my-2 text-center">
			{shortcut.shortcut}
			{'->'}
			{shortcut.redirectUrl}
		</div>
	{/each}
</div>
