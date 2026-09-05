<script>
	import DestructiveButton from "$lib/components/buttons/DestructiveButton.svelte";
	import IconButton from "$lib/components/buttons/IconButton.svelte";
	import LinkButton from "$lib/components/buttons/LinkButton.svelte";
	import PositiveButton from "$lib/components/buttons/PositiveButton.svelte";
	import PrimaryButton from "$lib/components/buttons/PrimaryButton.svelte";
	import SecondaryButton from "$lib/components/buttons/SecondaryButton.svelte";
	import ContentBox from "$lib/components/ContentBox.svelte";
	import CancelIcon from "$lib/components/icons/CancelIcon.svelte";
	import CheckIcon from "$lib/components/icons/CheckIcon.svelte";
	import DownIcon from "$lib/components/icons/DownIcon.svelte";
	import EditIcon from "$lib/components/icons/EditIcon.svelte";
	import ExternalLinkIcon from "$lib/components/icons/ExternalLinkIcon.svelte";
	import HelpIcon from "$lib/components/icons/HelpIcon.svelte";
	import ShareIcon from "$lib/components/icons/ShareIcon.svelte";
	import TrashIcon from "$lib/components/icons/TrashIcon.svelte";
	import UpIcon from "$lib/components/icons/UpIcon.svelte";
</script>

<div class="grid grid-cols-2 gap-1">
	<IconButton icon="check" text="IconButton" />
	<LinkButton link="https://github.com/Kopymatic" text="LinkButton" />
	<PrimaryButton text="PrimaryButton" />
	<SecondaryButton icon="cancel" text="SecondaryButton" />
	<PositiveButton text="PositiveButton" />
	<DestructiveButton text="DestructiveButton" />
</div>
<br />
<div class="flex gap-1">
	<CheckIcon />
	<CancelIcon />
	<EditIcon />
	<ExternalLinkIcon />
	<HelpIcon />
	<ShareIcon />
	<TrashIcon />
	<UpIcon />
	<DownIcon />
</div>
<br />
<div class="grid grid-cols-2 gap-4">
	<ContentBox prose><h1>Hello! (regular)</h1></ContentBox>
	<ContentBox prose holepunch><h1>Hello! (holepunch)</h1></ContentBox>
	<ContentBox prose collapsible>
		<h1>Hello! (regular)</h1>
		<br />
		But collapsible!
	</ContentBox>
	<ContentBox prose collapsible holepunch>
		<h1>Hello! (holepunch)</h1>
		<br />
		But collapsible!
	</ContentBox>
	<ContentBox prose startCollapsed collapsible>
		<h1>Hello! (regular)</h1>
		<br />
		But collapsible and started collapsed!
	</ContentBox>
	<ContentBox prose collapsible startCollapsed holepunch>
		<h1>Hello! (holepunch)</h1>
		<br />
		But collapsible and started collapsed!
	</ContentBox>
</div>
