<script lang="ts">
	import type { EventHandler } from 'svelte/elements';
	import CancelIcon from '../icons/CancelIcon.svelte';

	let {
		text = 'Cancel',
		type = 'reset',
		onclick = undefined,
		iconOnly = false,
		class: className = ''
	}: {
		text?: string;
		type?: 'button' | 'reset' | 'submit';
		onclick?: EventHandler;
		iconOnly?: boolean;
		class?: string;
	} = $props();
</script>

<button class={className} {onclick} {type}>
	<div class="mx-auto flex w-min text-nowrap">
		<CancelIcon class="stroke-white" />
		<span class:hidden={iconOnly}>{text}</span>
	</div>
</button>
