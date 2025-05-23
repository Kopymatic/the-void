import { env } from "$env/dynamic/private";

export const isAdmin = (id: string | undefined) => {
	if (id && id === env.ADMIN_DISCORD_ID) {
		return true;
	}
	return false;
};
