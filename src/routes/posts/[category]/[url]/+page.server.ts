import { error, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/database/database';
import { env } from '$env/dynamic/private';

export const load: PageServerLoad = async ({ params }) => {
	let category = params.category;
	let url = params.url;
	console.log(`Getting posts/${category}/${url}`);
	const post = await prisma.post.findFirst({ where: { category: category, url: url } });

	if (post) {
		return { post };
	}

	error(404, 'Not found');
};
export const actions = {
	delete: async ({ request, locals, route }) => {
		const session = await locals.auth();
		if (!session || session.user?.id !== env.ADMIN_DISCORD_ID) {
			error(401);
		}

		console.log('recieved delete request');
	}
} satisfies Actions;
