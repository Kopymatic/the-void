import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { prisma } from "$lib/server/database/database";

export const load: PageServerLoad = async () => {
	const posts = await prisma.post.findMany({ where: { unlisted: false } });
	if (posts) {
		//Mapping the posts so we can remove unnecessary data and double check that they're not unlisted
		const mappedPosts = posts.map((post) => {
			if (post.unlisted) return;

			return post;
		});

		//There is probably a better way to map and filter the posts at the same time
		//but this is quick and easy for now
		const filteredPosts = mappedPosts.filter((post) => !!post);

		const sortedPosts = filteredPosts.sort((postA, postB) => {
			return postB.createdAt.getTime() - postA.createdAt.getTime();
		});

		return { posts: sortedPosts };
	}

	error(404, "Not found");
};
