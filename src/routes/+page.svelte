<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let slogan: string = $state(data.slogans[0]);

	const randomizeSlogan = () => {
		if (Math.random() >= 0.7) {
			slogan = data.slogans[Math.floor(Math.random() * data.slogans.length)];
		}
	};

	randomizeSlogan();
	setInterval(randomizeSlogan, 5000);
</script>

<h3>welcome to the void</h3>
<p>
	{#if slogan}
		{slogan}
	{:else}
		a silly litle place for my silly little thoughts
	{/if}
</p>
