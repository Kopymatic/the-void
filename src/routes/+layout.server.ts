import { isAdmin } from '$lib/server/isAdmin';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const session = await event.locals.auth();
	const userIsAdmin = isAdmin(session?.user?.id);
	return {
		user: { ...session?.user, isAdmin: userIsAdmin },
		session
	};
};
