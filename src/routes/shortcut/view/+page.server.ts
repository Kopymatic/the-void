import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { prisma } from "$lib/server/database/database";
import { isAdmin } from "$lib/server/isAdmin";

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth();
	if (!session || !isAdmin(session.user?.id)) error(401);

	const shortcuts = await prisma.shortcut.findMany();
	if (shortcuts) return { shortcuts: shortcuts };

	error(404, "Not found");
};
