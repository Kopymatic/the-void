<script lang="ts">
	import type { Shortcut } from '@prisma/client';
	import ContentBox from './ContentBox.svelte';
	import IconButton from './buttons/IconButton.svelte';
	import DeleteShortcutModal from './modals/DeleteShortcutModal.svelte';
	import EditShortcutModal from './modals/EditShortcutModal.svelte';

	let { shortcut }: { shortcut: Shortcut } = $props();
	let name = shortcut.shortcut;
	let destination = shortcut.redirectUrl;

	const url = new URL(destination);
	const destinationTrimmed = `${url.host}${url.pathname}`;

	let showDeleteModal = $state(false);
	let showEditModal = $state(false);
</script>

<ContentBox
	prose
	class="mx-auto flex flex-row place-content-between duration-50 group-hover/list:scale-99 hover:scale-102 "
>
	<span title={destination} class="max-w-full overflow-hidden overflow-ellipsis">
		{`${name} -> `}
		<a target="_blank" rel="noopener noreferrer" href={destination}>{destinationTrimmed}</a>
	</span>
	<span class="group flex flex-nowrap gap-1">
		<IconButton
			onclick={() => (showEditModal = true)}
			icon="edit"
			class="group-hover:scale-90 hover:scale-110"
		/>
		<IconButton
			onclick={() => (showDeleteModal = true)}
			icon="trash"
			class="group-hover:scale-90 hover:scale-110"
		/>
	</span>
</ContentBox>

<DeleteShortcutModal name={shortcut.shortcut} bind:showModal={showDeleteModal} />
<EditShortcutModal {shortcut} bind:showModal={showEditModal} currentName={shortcut.shortcut} />
