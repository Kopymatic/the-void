import { error, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/database/database';
import { env } from '$env/dynamic/private';
import TodoistProvider from '@auth/sveltekit/providers/todoist';

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
	delete: async ({ request, locals, params }) => {
		const session = await locals.auth();
		if (!session || session.user?.id !== env.ADMIN_DISCORD_ID) {
			error(401);
		}

		console.log('recieved delete request');

		const category = params.category;
		const url = params.url;

		if (!category || !url) error(400, 'Invalid request');

		const toDelete = await prisma.post.findFirst({ where: { category, url } });

		if (!toDelete) error(404, 'Not found');

		const deleted = await prisma.post
			.delete({ where: { id: toDelete.id } })
			.catch((e) => {
				error(500, 'Database error');
			})
			.then(() => {
				redirect(302, '/');
			});
	}
} satisfies Actions;
