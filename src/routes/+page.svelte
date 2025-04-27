<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import Article from '../components/Article.svelte';
	import { getRandomSlogan } from '$lib/homepageSlogans';

	let slogan: string = $state(getRandomSlogan());

	let interval = setInterval(() => {
		slogan = getRandomSlogan();
	}, 10000);

	beforeNavigate(() => {
		clearInterval(interval);
	});
</script>

<Article>
	<h3 class="mt-2">welcome</h3>
	<p>
		{#if slogan}
			{slogan}
		{:else}
			a silly litle place for my silly little thoughts
		{/if}
	</p>

	<p><a href="/blog/list">search through the void</a></p>
</Article>
