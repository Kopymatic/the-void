<script lang="ts">
	let face = $state("");
	let tracesFound = $state(0);
	let tracesRemoved = $state(0);
</script>

<div class="flex flex-col">
	<label>
		FACE <br />
		<input type="text" placeholder="32/32" bind:value={face} />
	</label>
	<label>
		Traces found <br />
		<input type="number" placeholder="3" bind:value={tracesFound} />
	</label>
	<label>
		Traces removed <br />
		<input type="number" placeholder="2" bind:value={tracesRemoved} />
	</label>
</div>

<h2>Output</h2>
<div>
	Started out by running hardware diagnostics, {face.replace("/", " of ")} tests passed.
	<br />
	We then ran antivirus scans, which {#if tracesFound === tracesRemoved}
		found and removed {tracesRemoved} traces of viruses.
	{:else}
		found {tracesFound}, of which {tracesRemoved} were removed.
	{/if}
</div>
