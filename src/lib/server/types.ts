import type { User } from "@auth/sveltekit";

// to be honest i wrote this code for a different project
// ... about 6 months ago... lets hope it works
type Overwrite<T, U> = Omit<T, keyof U> & U;

export type DiscordUser = Omit<
	Overwrite<
		User,
		{
			discordId: string;
			username: string;
			avatar: string | null;
			avatarUrl: string | null;
			discriminator: string | null;
			banner: string | null;
			accentColor: number | null;
			displayName: string | null;
			email: string;
		}
	>,
	"image" | "name" | "id"
>;

export type SessionUser = {
	isAdmin: boolean;
	id?: string;
	name?: string | null;
	email?: string | null;
	image?: string | null;
};
