<script lang="ts">
	import ContentBox from "$lib/components/ContentBox.svelte";

	/* eslint-disable svelte/no-useless-mustaches */
	/* eslint-disable svelte/require-each-key */
	let facePassed = $state(0);
	let faceTotal = $state(undefined);
	let tracesFound = $state(0);
	let tracesRemoved = $state(undefined);

	let updateSources = $state("");
	let updateSourceArr = $derived(updateSources.split(","));
	let updateSourceTotal = $derived(updateSourceArr.length);

	let removedApps = $state("");
	let removedAppsArr = $derived(removedApps.split(","));
	let removedAppTotal = $derived(removedAppsArr.length);

	let tempFiles = $state("");

	let installedApps = $state("");
	let installedAppsArr = $derived(installedApps.split(","));
	let installedAppTotal = $derived(installedAppsArr.length);

	let installedExtensions = $state("");
	let installedExtensionsArr = $derived(installedExtensions.split(","));
	let installedExtensionTotal = $derived(installedExtensionsArr.length);

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
		<div>
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
			Scanned Browsers?
			<input type="checkbox" placeholder="Edge, Google Chrome" bind:checked={scannedBrowsers} />
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
			Removed
			{#each removedAppsArr as app, i}
				{#if i + 1 === removedAppTotal && removedAppTotal >= 2}
					{` and ${app}, `}
				{:else if removedAppTotal == 2 && i + 1 == 1}
					{` ${app}`}
				{:else}
					{` ${app},`}
				{/if}
			{/each} as {removedAppTotal > 1 ? "these are" : "it is"} often unwanted.
		{/if}
		{#if scannedBrowsers}
			Cleared any suspicious settings in the browsers.
		{/if}
		<br /><br />
		{#if faceTotal}
			{facePassed} of our {faceTotal} hardware tests passed.
		{:else if facePassed}
			All {facePassed} hardware tests passed.
		{:else}
			All hardware tests passed.
		{/if}
		Ran Windows tune-ups and fixes. Cleared {#if tempFiles}
			{tempFiles} of
		{/if} temporary files
		{#if restorePoint}
			Created a restore point.
		{/if}
		{#if cleaned && dusted}
			Cleaned the device inside and out.
		{:else if dusted}
			Dusted the internals of the device.
		{:else if cleaned}
			Physically cleaned the device.
		{/if}
		<br /><br />
		{#if installedApps}
			Installed {#each installedAppsArr as app, i}
				{#if i + 1 === installedAppTotal && installedAppTotal >= 2}
					{` and ${app}, `}
				{:else if installedAppTotal == 2 && i + 1 == 1}
					{` ${app}`}
				{:else}
					{` ${app},`}
				{/if}
			{/each}.
			<br /><br />
		{/if}
		{#if installedExtensions}
			Added {#each installedExtensionsArr as app, i}
				{#if i + 1 === installedExtensionTotal && installedExtensionTotal >= 2}
					{` and ${app}, `}
				{:else if installedExtensionTotal == 2 && i + 1 == 1}
					{` ${app}`}
				{:else}
					{` ${app},`}
				{/if}
			{/each} to the browsers.
			<br /><br />
		{/if}
		Ran all available updates{#if updateSources}
			{" "}
			through Windows{#each updateSourceArr as source, i}
				{#if i + 1 === updateSourceTotal}
					{`${updateSourceTotal > 1 ? "," : "	"} and ${source}. `}
				{:else}
					{`, ${source}`}
				{/if}
			{/each}
		{:else}
			.
		{/if}
		<br /><br />
		{#if supportIcon}
			Added a Geek Squad support icon to the desktop.
			<br /><br />
		{/if}
		{#if missionComplete}
			Mission Complete!
		{/if}
		{#if initials}
			- {initials}
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
