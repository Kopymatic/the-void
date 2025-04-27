import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/database/database';

export const load: PageServerLoad = async ({ params }) => {
	const posts = await prisma.post.findMany({ where: { unlisted: false } });
	if (posts) {
		//Mapping the posts so we can remove unnecessary data and double check that they're not unlisted
		const mappedPosts = posts.map((post) => {
			if (post.unlisted) return;

			//For now im not doing anything other than filter out unlisted posts to avoid type errors
			// const mapped = {
			// 	description: post.description,
			// 	body: post.body,
			// 	url: post.url,
			// 	author: post.author,
			// 	createdAt: post.createdAt,
			// 	updatedAt: post.updatedAt,
			// 	category: post.category,
			// 	unlisted: post.unlisted
			// };
			return post;
		});

		//There is probably a better way to map and filter the posts at the same time
		//but this is quick and easy for now
		const filteredPosts = mappedPosts.filter((post) => !!post);

		return { posts: filteredPosts };
	}

	error(404, 'Not found');
};
