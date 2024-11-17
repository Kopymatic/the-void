import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/database/database';

export const load: PageServerLoad = async ({ params }) => {
	let category = params.category;
	let url = params.url;
	console.log(`Getting posts/${category}/${url}`);
	const post = await prisma.post.findFirst({ where: { category: category, url: url } });

	console.log(post);

	if (post) {
		return post;
	}

	error(404, 'Not found');
};
