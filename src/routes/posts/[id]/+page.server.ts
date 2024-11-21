import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/database/database';

export const load: PageServerLoad = async ({ params }) => {
	let id = parseInt(params.id);
	console.log(`Getting posts/${id}`);
	const post = await prisma.post.findFirst({ where: { id: id, unlisted: false } });

	//if post is unlisted, dont load, so people cant find unlisted through id-spamming
	if (post && !post.unlisted) {
		return { post };
	}

	error(404, 'Not found');
};
