<script lang="ts">
	import ContentBox from "$lib/components/ContentBox.svelte";

	/* eslint-disable svelte/no-useless-mustaches */
	/* eslint-disable svelte/require-each-key */
	let facePassed = $state(0);
	let faceTotal = $state(undefined);
	let tracesFound = $state(0);
	let tracesRemoved = $state(undefined);
	let updateSources = $state("");

	let removedApps = $state("");
	let removedAppsArr = $derived(removedApps.split(","));
	let removedAppTotal = $derived(removedAppsArr.length);

	let scannedBrowsers = $state("");
	let scannedBrowsersArr = $derived(scannedBrowsers.split(","));
	let scannedBrowsersTotal = $derived(scannedBrowsersArr.length);

	let tempFiles = $state("");

	let cleaned = $state(false);
	let dusted = $state(false);
	let restorePoint = $state(false);
	let supportIcon = $state(false);
	let missionComplete = $state(false);
	let initials = $state("");
</script>

<br />
<div class="hover-shrink-div group flex flex-col gap-2 *:w-full">
	<ContentBox prose holepunch collapsible>
		<h2>Virus and PUPs</h2>
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
		<div class="flex flex-col gap-2 md:flex-row">
			<div>
				Removed apps? <br />
				<input
					type="text"
					placeholder="Wave Browser, Shift Browser, Driver Support One, etc."
					bind:value={removedApps}
				/>
			</div>
			<div>
				Scanned Browsers? <br />
				<input type="text" placeholder="Edge, Google Chrome" bind:value={scannedBrowsers} />
			</div>
		</div>
	</ContentBox>

	<ContentBox prose holepunch collapsible>
		<h2>Diagnostics/Optimizations</h2>
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
				placeholder="HP Support Assist, Lenovo Vantage, Nvidia, AMD, etc."
				bind:value={updateSources}
			/>
		</div>
	</ContentBox>
	<ContentBox prose holepunch collapsible>
		<h2>Extra</h2>
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
		<div>
			Initials? <br />
			<input type="text" placeholder="JD" bind:value={initials} />
		</div>
	</ContentBox>
</div>
<br />
<div class="prose prose-invert mx-auto max-w-xl">
	<h2>Output</h2>
	<div>
		Ran antivirus scans which {#if !tracesFound}
			came back clear.
		{:else if tracesFound === tracesRemoved || !tracesRemoved}
			removed {tracesFound} {`trace${tracesFound > 1 ? "s" : ""}`} of malware.
		{:else}
			found {tracesFound} traces, of which {tracesRemoved} were removed.
		{/if}
		{#if removedApps}
			We removed
			{#each removedAppsArr as app, i}
				{#if i + 1 === removedAppTotal && removedAppTotal >= 2}
					{` and ${app}, `}
				{:else if removedAppTotal == 2 && i + 1 == 1}
					{` ${app}`}
				{:else}
					{` ${app},`}
				{/if}
			{/each} as {removedAppTotal > 1 ? "these are" : "it is"} often malicious and unwanted.
		{/if}
		{#if scannedBrowsers}
			Removed any suspicious permissions or extensions from {#each scannedBrowsersArr as browser, i}
				{#if i + 1 === scannedBrowsersTotal && scannedBrowsersTotal >= 2}
					{` and ${browser}`}
				{:else if scannedBrowsersTotal == 2 && i + 1 == 1}
					{` ${browser}`}
				{:else}
					{` ${browser}${scannedBrowsersTotal > 1 ? "," : ""}`}
				{/if}
			{/each}.
		{/if}
		<br /><br />
		Ran hardware diagnostics, {#if faceTotal}
			with {facePassed} out of {faceTotal} tests passing.
		{:else if facePassed}
			with all {facePassed} of our {`test${facePassed > 1 ? "s" : ""}`} passing.
		{:else}
			with all tests passing.
		{/if}
		Also ran Windows optimizations and fixes. Cleared any temporary files{#if tempFiles}
			, freeing {tempFiles} of disk space.
		{:else}
			.
		{/if}
		{#if restorePoint}
			Created a Windows restore point in case of any future corruption.
		{/if}
		{#if cleaned && dusted}
			Dusted the internals and cleaned the device.
		{:else if dusted}
			Dusted the internals of the device.
		{:else if cleaned}
			Physically cleaned the device.
		{/if}
		<br /><br />
		Ensured all available updates were run through Windows Update, the Microsoft Store,{#if updateSources}
			{#each updateSources.split(",") as updateSource}
				{" " + updateSource},
			{/each}
		{/if} and the Winget Package Manager.
		<br /><br />
		{#if supportIcon}
			Added a Geek Squad support icon to the device's desktop.
		{/if}
		<br /><br />
		{#if missionComplete}
			Mission Complete!
		{/if}
		{#if initials}
			- {initials}
		{/if}
	</div>
</div>

<style>
	@reference base
	br {
		display: block;
		content: "";
		margin-top: 6rem;
	}
</style>
