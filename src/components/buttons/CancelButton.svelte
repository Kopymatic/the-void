<script lang="ts">
	import type { EventHandler } from 'svelte/elements';
	import CancelIcon from '../icons/CancelIcon.svelte';

	let {
		text = 'Cancel',
		type = 'reset',
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
		<CancelIcon class="stroke-white" />
		{text}
	</div>
</button>
