<script lang="ts">
	import type { EventHandler } from 'svelte/elements';
	import Check from '../icons/CheckIcon.svelte';

	let {
		text = 'Confirm',
		type = 'submit',
		onclick = undefined,
		class: className = ''
	}: {
		text?: string;
		type?: 'button' | 'reset' | 'submit';
		onclick?: EventHandler;
		class?: string;
	} = $props();
</script>

<button class={className} {onclick} {type}>
	<div class="mx-auto flex w-min text-nowrap">
		<Check class="stroke-white" />
		{text}
	</div>
</button>
