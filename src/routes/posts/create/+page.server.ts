import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { prisma } from '$lib/server/database/database';
import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';
import { CreateFormError } from '$lib';
import { defaultCategories } from '$lib/defaultCategories.json';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth();
	if (session && session.user?.id === env.ADMIN_DISCORD_ID) {
		return {
			defaultCategories
		};
	}
	error(401);
};

export const actions = {
	post: async ({ request }) => {
		console.log('recieved post request');
		let formData = await request.formData();
		let url = formData.get('url')?.toString();
		let description = formData.get('description')?.toString();
		let body = formData.get('body')?.toString();
		let selectedCategory = formData.get('selectedCategory')?.toString();
		let customCategory = formData.get('customCategory')?.toString();
		let category = customCategory || selectedCategory;

		let reconstructedData = {
			url,
			category,
			description,
			body
		};

		// Filter out all the required params
		if (!url)
			return fail(400, {
				error: CreateFormError.missingUrl,
				message: 'Must fill in the URL',
				reconstructedData
			});
		if (!body)
			return fail(400, {
				error: CreateFormError.missingBody,
				message: 'Must fill in the body',
				reconstructedData
			});
		if (!category) {
			return fail(400, {
				error: CreateFormError.missingCategory,
				message: 'Must fill in the category',
				reconstructedData
			});
		}

		// filter out incorrect formatting
		if (!categoryRegex.test(category)) {
			return fail(400, {
				error: CreateFormError.invalidCategory,
				message: 'Category has invalid format',
				reconstructedData
			});
		}
		if (!urlRegex.test(url)) {
			return fail(400, {
				error: CreateFormError.invalidUrl,
				reconstructedData
			});
		}

		const post = await prisma.post.create({ data: { body, url, category, description } });
		if (!post) {
			return fail(500, {
				error: CreateFormError.databaseError,
				message: 'Unknown error with the database.'
			});
		}
		redirect(302, `/posts/${post.category}/${post.url}`);
	}
} satisfies Actions;

//TODO: come up with better regexes
// currently they're both too restrictive. Maybe allow numbers?
const categoryRegex = /^[a-z\-0-9]+$/;
const urlRegex = /^[a-z\-0-9]+$/;
