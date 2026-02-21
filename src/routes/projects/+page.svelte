<script>
	import Article from "$lib/components/Article.svelte";
	import StoryBox from "$lib/components/StoryBox.svelte";
</script>

<div class="flex h-full flex-col pt-3">
	<Article>
		<div
			class="group mx-auto flex flex-col gap-2 px-4 *:box-border *:group-hover:scale-95 *:group-hover:opacity-75 *:hover:z-10 *:hover:scale-105 *:hover:opacity-100"
		>
			<StoryBox titleText="The Void">
				<p>
					What started as a silly little blogging site made in SvelteKit, has since turned into my
					main website. I've been working on it since November 2024 to make it my own toolkit and
					portfolio. <a href="/posts">check out the blog</a>, although its a tad neglected.
					<StoryBox titleText="Tech details:" holepunch startCollapsed>
						Made in Svelte and SveleteKit, with TailwindCSS for styling. I also used this project to
						learn Docker and Docker Compose. Prisma ORM for database management, and Postgresql for
						the database itself (though it originally started with SQLite). <a
							href="https://pyro.host/vps"
							target="_blank">Pyro VPS</a
						>
						for hosting and Nginx for routing.
						<a href="https://github.com/Kopymatic/the-void" target="_blank">Github source code</a>
					</StoryBox>
				</p>
			</StoryBox>
			<StoryBox titleText="My link shortener, kopy.fyi">
				<p>
					Most recently, I made a personal link shortener, kopy.fyi. Currently its only for me to
					use but having a way to make a shortened url that I can easily type in is amazing. Check
					out <a href="https://kopy.fyi/cool-url" target="_blank">kopy.fyi/cool-url</a>
					<StoryBox titleText="Tech details:" holepunch startCollapsed>
						Based off the same tech and repository as The Void.
						<a href="https://github.com/Kopymatic/the-void" target="_blank">Github source code</a>
					</StoryBox>
				</p>
			</StoryBox>
			<StoryBox titleText="My Discord Bot, Funnyman">
				<p>
					On November 16th 2020, I started a discord bot for fun. I didnt expect it to be one of my
					favorite (and longest running) projects. Currently on hiatus until I am 100% invested and
					know how to make it work with Discord's new Application Commands system.
				</p>
				<div class="*:my-2">
					<StoryBox titleText="V1" holepunch startCollapsed>
						<p>
							V1 was started in Java before I even knew what a for loop was. Before I understood
							.gitignore so I committed my discord tokens (I've changed them since). This is easily
							one of the most important projects to me because it taught me so much about software
							development in general. The mistakes I made are critical to how I do things to this
							day. I used text files instead of a database, which is a large part of what led me to
							make V2. <a href="https://github.com/Kopymatic/FunnymanV1" target="_blank"
								>Github source code</a
							>
						</p>
					</StoryBox>
					<StoryBox titleText="V2" holepunch startCollapsed>
						<p>
							V2 was started due to the amount of technical debt that had built up with V1. The lack
							of knowledge when V1 was started led to some very poor decisions in terms of
							longevity. So V2 was born as a ground-up rewrite in Kotlin, with a proper Postgres
							database. This one had the most features out of all the Funnyman versions I ever
							worked on. I was just throwing ideas at a wall and seeing what stuck. This was during
							an era where the bot was in constant use by me and my friends, so investing the time
							into stupid features was worth it. Ultimately I lost interest and Discord announced
							the move to Application (slash) Commands. Those combined with me realizing the
							difficulty of hosting Kotlin code led to me to make V3 and beyond. <a
								href="https://github.com/Kopymatic/FunnymanV2"
								target="_blank">Github source code</a
							>
						</p>
					</StoryBox>
					<StoryBox titleText="V3+" holepunch startCollapsed>
						<p>
							I started making V3 several years ago to work with Discord's slash commands. But some
							of the features that the bot needed either weren't supported by Discord or by the
							libraries I was using. Ultimately I've cycled between Typescript, Kotlin, and others
							trying to get things to a state where I'm happy. I've finally got a prototype to a
							place where I'm somewhat happy but I'm deciding where to go next.
						</p>
					</StoryBox>
				</div>
			</StoryBox>
		</div>
	</Article>
</div>
