<script lang="ts">
	import Article from "$lib/components/Article.svelte";
	import StoryBox from "$lib/components/StoryBox.svelte";
</script>

<div class="flex h-full flex-col">
	<Article>
		<h3 class="mx-auto mt-4 mb-4 text-center">Welcome to my site!</h3>
		<p class="mb-4 text-center"><a href="/posts">look through the void blog</a></p>

		<div
			class="group mx-auto flex flex-col gap-2 px-4 *:box-border *:group-hover:scale-95 *:group-hover:opacity-75 *:hover:z-10 *:hover:scale-105 *:hover:opacity-100"
		>
			<StoryBox collapsedText="About me: ..." titleText="Hello! About me:">
				<p>
					Hello! My name is Kopymatic, or Kopy for short. I've been propgramming for about 5 years,
					making various projects (which I'll cover in the following cards)
				</p>
			</StoryBox>
			<StoryBox collapsedText="Languages: ..." titleText="I've learned several languages!">
				<p>
					I started out with Java, and quickly moved to Kotlin and then kept learning from there.
					Currently I'm fluent in Typescript (and JS), HTML, CSS, and I'm always trying to learn new
					languages.
				</p>
			</StoryBox>
			<StoryBox collapsedText="Frameworks: ..." titleText="And Web Frameworks too">
				<p>
					I've dabbled in React and Vue, but I've really found enjoyment in Svelte and SvelteKit. I
					use other tools as well, like TailwindCSS, Vite, Prisma + Postgres for my DB, and Docker.
				</p>
			</StoryBox>
			<StoryBox collapsedText="Funnyman: ..." titleText="My Discord Bot, Funnyman">
				<p>
					5 years ago, I made a discord bot for fun. I didnt expect it to be one of my favorite (and
					longest running) projects. Currently on hiatus until I am 100% invested and know how to
					make it work with Discord's new Application Commands system.
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
		</div>
	</Article>
</div>
