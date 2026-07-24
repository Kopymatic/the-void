<script lang="ts">
	/* eslint-disable svelte/require-each-key */
	let facePassed = $state(0);
	let faceTotal = $state(undefined);
	let tracesFound = $state(0);
	let tracesRemoved = $state(undefined);
	let updateSources = $state("");
</script>

<div class="flex flex-col">
	<div class="flex">
		<label>
			FACE passed<br />
			<input type="number" placeholder="e.g. 32" bind:value={facePassed} />
		</label>
		<label>
			FACE total<br />
			<input type="number" placeholder="e.g. 32" bind:value={faceTotal} />
		</label>
	</div>
	<div class="flex">
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
		Started out by running hardware diagnostics, {#if faceTotal}
			with {facePassed} of our {faceTotal} tests passing.
		{:else if facePassed}
			with all {facePassed} {`test${facePassed > 1 ? "s" : ""}`} passing.
		{:else}
			with all tests passing.
		{/if}
		<br /><br />
		We then ran antivirus scans which {#if !tracesFound}
			came back clean.
		{:else if tracesFound === tracesRemoved || !tracesRemoved}
			found and removed {tracesFound} {`trace${tracesFound > 1 ? "s" : ""}`} of malware.
		{:else}
			found {tracesFound}, of which {tracesRemoved} were removed.
		{/if}
		<br /><br />
		We ensured all available updates were run through Windows Update, the Microsoft Store,{#if updateSources}
			{#each updateSources.split(",") as updateSource}
				{" " + updateSource},
			{/each}
		{/if} and the Windows Package Manager.
	</div>
</div>

<style>
	br {
		display: block;
		content: "";
		margin-top: 6rem;
	}
</style>
