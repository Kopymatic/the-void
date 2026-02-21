<script lang="ts">
	import Article from "$lib/components/Article.svelte";
	import StoryBox from "$lib/components/StoryBox.svelte";
</script>

<div class="flex h-full flex-col">
	<Article>
		<h3 class="mx-auto mt-4 mb-4 text-center">
			Heyo! welcome to <span class="font-rock-salt">Kopymatic.com</span>
		</h3>

		<div
			class="group mx-auto flex flex-col gap-2 px-4 *:box-border *:group-hover:scale-95 *:group-hover:opacity-75 *:hover:z-10 *:hover:scale-105 *:hover:opacity-100"
		>
			<StoryBox collapsedText="About me: ..." titleText="About me:">
				<p>
					My name is Connor, or Kopymatic on the internet. I've been programming for about 5 years,
					making a bunch of projects (which I'll cover in the following cards)
				</p>
			</StoryBox>
			<StoryBox collapsedText="Languages: ..." titleText="I speak a bunch of languages!">
				<p>
					Well.. programming languages at least. I started out with Java, and quickly moved to
					Kotlin and then kept learning from there. Currently I'm using in Typescript (and JS),
					HTML, CSS, and I'm always trying to learn new languages.
				</p>
			</StoryBox>
			<StoryBox collapsedText="Frameworks: ..." titleText="And Web Frameworks too">
				<p>
					I've dabbled in React and Vue, but I've really found enjoyment in <a
						href="https://svelte.dev/">Svelte and SvelteKit</a
					>. I use other tools as well, like TailwindCSS, Vite, Prisma + Postgres for my DB, and
					Docker.
				</p>
			</StoryBox>

			<StoryBox collapsedText="The Void: ..." titleText="The Void (you are here!)">
				<p>
					What started as a silly little blogging site made in SvelteKit, has since turned into my
					main page. I've been working on it since November 2024 to make it my own toolkit. <a
						href="/posts">search through the void blog</a
					>
				</p>
			</StoryBox>
			<StoryBox collapsedText="kopy.fyi: ..." titleText="My link shortener, kopy.fyi">
				<p>
					Most recently, I made a personal link shortener, kopy.fyi. Currently its only for me to
					use but having a way to make a shortened url that I can easily type in is amazing. Check
					out <a href="https://kopy.fyi/cool-url" target="_blank">kopy.fyi/cool-url</a>
				</p>
			</StoryBox>
			<StoryBox
				collapsedText="Other projects: ..."
				titleText="Some other projects I've worked on!"
				startCollapsed
			>
				<p>
					<a href="/projects">Check out some of my other projects</a>
				</p>
			</StoryBox>
			<StoryBox
				collapsedText="Cool people: ..."
				titleText="Some cool people/projects you should check out!"
			>
				<ul class="">
					<li><a target="_blank" href="https://tboogle.com/">The Boogle Box (tboogle)</a></li>
					<li><a target="_blank" href="https://alekeagle.com/">Alek Eagle (dad bot guy)</a></li>
					<li><a target="_blank" href="https://cobalt.tools/">Cobalt (media downloader)</a></li>
					<li>uh hey later me add some more cool people</li>
				</ul>
			</StoryBox>
		</div>
	</Article>
</div>
