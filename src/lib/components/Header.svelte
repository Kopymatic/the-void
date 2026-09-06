<header class="mx-auto pt-2 text-center">
	<div>
		<a class="logo glow-text mx-auto text-4xl no-underline" href="/">Kopymatic</a>
	</div>
	<div class="flex justify-between pt-3">
		<a href="/projects">projects</a>
		<a href="/">home</a>
		<a href="/posts">blog</a>
	</div>
</header>

<style>
	.logo {
		font-family: var(--font-rock-salt), cursive;
		background: linear-gradient(15deg, var(--color-kopymatic) 30%, var(--color-accent));
		background-clip: text;
		color: transparent;
	}
	.glow-text {
		--grad: linear-gradient(var(--angle), var(--color-kopymatic) 30%, var(--color-accent));

		background-image: var(--grad);
		color: transparent;
		background-clip: text;

		position: relative;

		&::before {
			content: "";
			position: absolute;
			inset: 0;
			z-index: -1;
			background: var(--grad);
			filter: blur(1em);

			opacity: 0;
			transition: all 400ms ease;

			will-change: opacity;
		}
		&:hover::before {
			opacity: 0.5;
		}
		&:hover {
			transition: all 400ms ease;
			animation: 2s rotate linear infinite;
		}
	}

	@keyframes rotate {
		to {
			--angle: 360deg;
		}
	}

	@property --angle {
		syntax: "<angle>";
		initial-value: 0deg;
		inherits: false;
	}
</style>
