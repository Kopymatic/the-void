import type { DiscordUser } from '$lib/server/types';
import { SvelteKitAuth } from '@auth/sveltekit';
import Discord from '@auth/sveltekit/providers/discord';

export const { handle, signIn, signOut } = SvelteKitAuth({
	providers: [
		Discord({
			authorization: { params: { scope: 'identify guilds email' } }
		})
	],
	callbacks: {
		jwt({ token, profile }) {
			if (profile) {
				// User is available during sign-in
				token.id = profile.id;
			}
			return token;
		},
		session({ session, token }) {
			session.user.id = token.id as string;
			return session;
		}
	}
});
