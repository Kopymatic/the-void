import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/database/database';

export const load: PageServerLoad = async ({ params }) => {
	let id = parseInt(params.id);
	console.log('Id is ' + id);
	const post = await prisma.post.findFirst({ where: { id: id } });

	if (post) {
		return post;
	}

	error(404, 'Not found');
};
