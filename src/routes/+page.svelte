<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import Article from '../components/Article.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let slogan: string = $state(data.slogans[0]);

	const randomizeSlogan = () => {
		if (Math.random() >= 0.7) {
			slogan = data.slogans[Math.floor(Math.random() * data.slogans.length)];
		}
	};

	randomizeSlogan();
	let interval = setInterval(randomizeSlogan, 5000);

	beforeNavigate(() => {
		clearInterval(interval);
	});
</script>

<Article>
	<h3>welcome to the void</h3>
	<p>
		{#if slogan}
			{slogan}
		{:else}
			a silly litle place for my silly little thoughts
		{/if}
	</p>

	<p><a href="/list">search through the void</a></p>
</Article>
