import { checkPassword } from '$lib/server/passwordChecker';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { Prisma } from '@prisma/client';
import { prisma } from '$lib/server/database/database';

export const actions = {
	post: async ({ request }) => {
		let formData = await request.formData();
		let url = formData.get('url')?.toString();
		let category = formData.get('category')?.toString();
		let description = formData.get('description')?.toString();
		let body = formData.get('body')?.toString();
		let password = formData.get('password')?.toString();

		// Filter out incorrect passwords
		if (!password || !checkPassword(password)) {
			return fail(401, { error: true, passwordIncorrect: true, message: 'Incorrect password' });
		}

		// Filter out all the required params
		if (!url)
			return fail(400, { error: true, missing: true, message: 'Must fill in the URL field' });
		if (!body)
			return fail(400, { error: true, missing: true, message: 'Must fill in the body field' });

		// filter out incorrect formatting
		if (category && !categoryRegex.test(category)) {
			return fail(400, { error: true, invalid: true, message: 'Category has invalid format' });
		}
		if (!urlRegex.test(url)) {
			return fail(400, { error: true, invalid: true, message: 'Url has invalid format' });
		}

		const post = await prisma.post.create({ data: { body, url, category, description } });
		if (!post) {
			return fail(500, {
				error: true,
				postCreate: true,
				message: 'Unknown error with the database.'
			});
		}

		console.log(post);
		redirect(302, `/posts/${post.id}`);
	}
} satisfies Actions;

const categoryRegex = /^\S*$/;
const urlRegex = /^[a-z]*$/;
