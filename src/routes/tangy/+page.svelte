<script lang="ts">
	import { joinWithGrammar } from "$lib";
	import ContentBox from "$lib/components/ContentBox.svelte";

	let facePassed = $state(0);
	let faceTotal = $state(undefined);
	let tracesFound = $state(0);
	let tracesRemoved = $state(undefined);

	let updateSources = $state("");
	let updateSourceArr = $derived(updateSources.split(","));

	let removedApps = $state("");
	let removedAppsArr = $derived(removedApps.split(","));
	let removedAppTotal = $derived(removedAppsArr.length);

	let tempFiles = $state("");

	let installedApps = $state("");
	let installedAppsArr = $derived(installedApps.split(","));

	let installedExtensions = $state("");
	let installedExtensionsArr = $derived(installedExtensions.split(","));

	let scannedBrowsers = $state(false);
	let cleaned = $state(false);
	let dusted = $state(false);
	let restorePoint = $state(false);
	let supportIcon = $state(false);
	let missionComplete = $state(false);
	let initials = $state("");
</script>

<br />
<div
	class="hover-shrink-div group flex flex-col flex-wrap items-stretch gap-2 *:w-full *:flex-1 md:flex-row md:*:min-w-sm"
>
	<ContentBox prose holepunch collapsible>
		<h3>Virus and PUPs</h3>
		<div class="flex flex-col gap-2 md:flex-row">
			<div>
				Traces found <br />
				<input type="number" placeholder="e.g. 3" bind:value={tracesFound} />
			</div>
			<div>
				Traces removed <br />
				<input type="number" placeholder="e.g. 2" bind:value={tracesRemoved} />
			</div>
		</div>
		<div class="items-center text-center">
			Removed apps? <br />
			<input
				type="text"
				class="w-full"
				placeholder="Wave Browser, Shift Browser, Driver Support One, etc."
				bind:value={removedApps}
			/>
		</div>
		<br />
		<div>
			<input type="checkbox" placeholder="Edge, Google Chrome" bind:checked={scannedBrowsers} />
			Scanned Browsers?
		</div>
	</ContentBox>

	<ContentBox prose holepunch collapsible>
		<h3 class="m-0 p-0">Diagnostics/Optimizations</h3>
		<div class="flex flex-col gap-2 md:flex-row">
			<div>
				FACE passed<br />
				<input type="number" placeholder="e.g. 32" bind:value={facePassed} />
			</div>
			<div>
				FACE total<br />
				<input type="number" placeholder="e.g. 32" bind:value={faceTotal} />
			</div>
		</div>
		<div>
			Temp Files<br />
			<input type="string" placeholder="e.g. 120MB" bind:value={tempFiles} />
		</div>
		<div>
			Alternate Update Sources? <br />
			<input
				type="text"
				class="w-full"
				placeholder="HP Support Assist, Lenovo Vantage, Nvidia, AMD, etc."
				bind:value={updateSources}
			/>
		</div>
	</ContentBox>

	<ContentBox prose holepunch collapsible>
		<h3 class="m-0 p-0">Data transfer</h3>
		wip, take notes so i can make this :p
	</ContentBox>

	<ContentBox prose holepunch collapsible>
		<h3 class="m-0 p-0">Installs</h3>
		<div>
			Installed apps? <br />
			<input
				type="text"
				placeholder="Google Chrome, Acrobat, etc."
				class="w-full"
				bind:value={installedApps}
			/>
		</div>
		<div>
			Installed extensions? <br />
			<input
				type="text"
				placeholder="Ublock Origin,etc."
				class="w-full"
				bind:value={installedExtensions}
			/>
		</div>
	</ContentBox>

	<ContentBox prose holepunch collapsible>
		<h3 class="m-0 p-0">Extra</h3>
		<div class="grid grid-cols-1 md:grid-cols-2">
			<div>
				<input type="checkbox" bind:checked={cleaned} />
				Cleaned?
			</div>
			<div>
				<input type="checkbox" bind:checked={dusted} />
				Dusted Internals?
			</div>
			<div>
				<input type="checkbox" bind:checked={restorePoint} />
				Restore Point?
			</div>
			<div>
				<input type="checkbox" bind:checked={supportIcon} />
				Added a support icon?
			</div>
			<div>
				<input type="checkbox" bind:checked={missionComplete} />
				Mission Complete?
			</div>
		</div>
		<div>
			Initials? <br />
			<input type="text" placeholder="JD" bind:value={initials} />
		</div>
	</ContentBox>
</div>
<br />
<div class="prose prose-invert mx-auto max-w-xl">
	<h3 class="m-0 p-0">Output</h3>
	<div>
		Ran virus scans which {#if !tracesFound}
			came back clear.
		{:else if tracesFound === tracesRemoved || !tracesRemoved}
			removed {tracesFound} {`trace${tracesFound > 1 ? "s" : ""}`} of malware.
		{:else}
			removed {tracesRemoved} traces of the {tracesFound} found.
		{/if}
		{#if removedApps}
			Removed {joinWithGrammar(removedAppsArr)}, as {removedAppTotal > 1 ? "these are" : "it is"} often
			unwanted.
		{/if}
		{#if scannedBrowsers}
			Cleared any suspicious settings in the browsers.
		{/if}
		<br /><br />
		{#if faceTotal}
			{facePassed} of our {faceTotal} hardware tests passed.
		{:else if facePassed}
			All {facePassed} of our hardware tests passed.
		{:else}
			All of our hardware tests passed.
		{/if}
		Ran Windows tune-ups and fixes. Cleared {#if tempFiles}
			{tempFiles} of
		{/if} temporary files.
		{#if restorePoint}
			Created a restore point.
		{/if}
		{#if cleaned && dusted}
			Cleaned the device inside and out.
			<br /><br />
		{:else if dusted}
			Dusted the internals of the device.
			<br /><br />
		{:else if cleaned}
			Physically cleaned the device.
			<br /><br />
		{/if}
		{#if installedApps}
			Installed {joinWithGrammar(installedAppsArr)}.
			<br /><br />
		{/if}
		{#if installedExtensions}
			Added {joinWithGrammar(installedExtensionsArr)} to the browsers.
			<br /><br />
		{/if}
		Ran all available updates through {joinWithGrammar(["Windows"].concat(updateSourceArr).flat())}.
		<br /><br />
		{#if supportIcon}
			Added a Geek Squad support icon to the desktop.
			<br /><br />
		{/if}
		{#if missionComplete}
			Mission Complete!
		{/if}
		{#if initials}
			-{initials}
		{/if}
	</div>
</div>

<style>
	@reference "tailwindcss";
	br {
		display: block;
		content: "";
		margin-top: 6rem;
	}

	h3 {
		@apply my-2 p-0;
	}
</style>
