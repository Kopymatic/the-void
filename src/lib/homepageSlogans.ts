export const slogans = [
	"my little nightmare",
	"a silly little place for a silly little person to share their silly little thoughts",
	"you're cool",
	"you're swagalicious",
	"FunnymanV69 when ",
	"thanks Mom & Dad <3",
	"Now with 0% AI!",
	"No bad code here officer.",
	"Debugging CSS hurts my entire being",
	"Made with Sveltekit <3",
	"Made with TailwindCSS <3",
	"Made with Prisma <3",
	"Made with Love <3",
	"hey future me let me know how Doom: The Dark Ages is",
	"The light inside has broken but I still work",
	"Millenials are killing the doorbell industry by texting 'here'",
	"https://kopymatic.com/mike",
	"im 20 years old and i've already wasted my entire life",
	"auth sucks",
	"hey past me Doom: the dark ages was pretty awesome",
	"now with shortcuts",
	"i have lost countless hours of my life to docker",
	"can someone explain six seven to me"
];

export const getRandomSlogan = () => {
	return slogans[Math.floor(Math.random() * slogans.length)];
};
