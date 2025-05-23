<script lang="ts">
	import { beforeNavigate } from "$app/navigation";
	import { slogans } from "$lib/homepageSlogans";
	import { fade } from "svelte/transition";

	const textInterval = 2000;
	const fadeDuraction = Math.floor(textInterval * 0.4);

	let sloganQueue = slogans
		.slice(0) //duplicate (probably unnecessary)
		//3 lines of sorting nonsense
		.map((value) => ({ value, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map(({ value }) => value)
		//and then add an undefined every other item for easy animation
		.flatMap((item) => {
			return [item, undefined];
		});
	let sloganQueuePos = 0;

	let slogan = $state(sloganQueue[sloganQueuePos]);
	let interval = setInterval(() => {
		sloganQueuePos++;
		if (sloganQueuePos >= sloganQueue.length) sloganQueuePos = 0;
		slogan = sloganQueue[sloganQueuePos];
	}, textInterval);
	beforeNavigate(() => {
		clearInterval(interval);
	});
</script>

<div class="relative mx-auto h-12 w-full overflow-hidden bg-transparent text-center">
	{#key slogan}
		<!-- The tailwind classes below are a crime against humanity. I apologize. -->
		<span
			class="absolute top-[50%] left-[50%] w-full -translate-[50%] overflow-hidden"
			transition:fade={{ duration: fadeDuraction }}
		>
			{#if slogan}
				{slogan}
			{/if}
		</span>
	{/key}
</div>
