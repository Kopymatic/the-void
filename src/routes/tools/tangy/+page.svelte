<script lang="ts">
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
	let tempFiles = $state("");
</script>

<div class="prose prose-invert flex flex-col">
	<h3>Virus and PUPs</h3>
	<div class="flex gap-2">
		<label>
			Traces found <br />
			<input type="number" placeholder="e.g. 3" bind:value={tracesFound} />
		</label>
		<label>
			Traces removed <br />
			<input type="number" placeholder="e.g. 2" bind:value={tracesRemoved} />
		</label>
	</div>
	<label>
		Removed apps? <br />
		<input
			type="text"
			placeholder="Wave Browser, Shift Browser, Driver Support One, etc."
			bind:value={removedApps}
		/>
	</label>

	<h3>Diagnostics/Optimizations</h3>
	<div class="flex gap-2">
		<label>
			FACE passed<br />
			<input type="number" placeholder="e.g. 32" bind:value={facePassed} />
		</label>
		<label>
			FACE total<br />
			<input type="number" placeholder="e.g. 32" bind:value={faceTotal} />
		</label>
	</div>
	<label>
		Temp Files<br />
		<input type="string" placeholder="e.g. 120MB" bind:value={tempFiles} />
	</label>
	<label>
		Alternate Update Sources? <br />
		<input
			type="text"
			placeholder="HP Support Assist, Lenovo Vantage, Nvidia, AMD, etc."
			bind:value={updateSources}
		/>
	</label>
</div>
<br />
<div class="prose prose-invert">
	<h1>Output</h1>
	<div>
		Ran antivirus scans which {#if !tracesFound}
			came back clean.
		{:else if tracesFound === tracesRemoved || !tracesRemoved}
			found and removed {tracesFound} {`trace${tracesFound > 1 ? "s" : ""}`} of malware.
		{:else}
			found {tracesFound} traces, of which {tracesRemoved} were removed.
		{/if}
		{#if removedApps}
			During the scans, we manually removed
			{#each removedAppsArr as app, i}
				{#if i + 1 === removedAppTotal && removedAppTotal >= 2}
					{` and ${app}, `}
				{:else}
					{` ${app},`}
				{/if}
			{/each} as {removedAppTotal > 1 ? "these are" : "it is"} usually malicious or unwanted.
		{/if}
		<br /><br />
		Ran hardware diagnostics, {#if faceTotal}
			with {facePassed} of our {faceTotal} tests passing.
		{:else if facePassed}
			with all {facePassed} of our {`test${facePassed > 1 ? "s" : ""}`} passing.
		{:else}
			with all tests passing.
		{/if}
		Also ran Windows optimizations, ensuring the system is running its best. Cleared any temporary files{#if tempFiles}
			, freeing {tempFiles} of disk space.
		{:else}
			{" "} as well.
		{/if}
		<br /><br />
		Ensured all available updates were run through Windows Update, the Microsoft Store,{#if updateSources}
			{#each updateSources.split(",") as updateSource}
				{" " + updateSource},
			{/each}
		{/if} and the Winget Package Manager.
	</div>
</div>

<style>
	br {
		display: block;
		content: "";
		margin-top: 6rem;
	}
</style>
