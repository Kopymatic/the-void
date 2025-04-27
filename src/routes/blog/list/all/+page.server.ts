import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/database/database';
import { env } from '$env/dynamic/private';

export const load: PageServerLoad = async ({ params, locals }) => {
	const session = await locals.auth();
	if (!session || session.user?.id !== env.ADMIN_DISCORD_ID) error(401);

	const posts = await prisma.post.findMany();
	if (posts) return { posts: posts };

	error(404, 'Not found');
};
