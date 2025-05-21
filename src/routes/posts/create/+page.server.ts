import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { prisma } from '$lib/server/database/database';
import type { PageServerLoad } from './$types';
import { CreateFormError } from '$lib';
import { defaultCategories } from '$lib/defaultCategories';
import { validateCreateFormServer } from '$lib/server/serverFormValidation';
import { isAdmin } from '$lib/server/isAdmin';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth();
	if (session && isAdmin(session.user?.id)) {
		return {
			defaultCategories
		};
	}
	error(401);
};

export const actions = {
	post: async ({ request, locals }) => {
		const session = await locals.auth();
		if (!session || !isAdmin(session.user?.id)) {
			error(401);
		}
		console.log('recieved post request');
		let formData = await request.formData();

		const result = validateCreateFormServer(formData);
		if (result.status || result.error) {
			fail(result.status, {
				error: result.error,
				reconstructedData: result.data
			});
		}

		const { body, category, description, unlisted, url } = result.data;
		if (!url || !body) {
			console.log('The server validation function fucked up');
			fail(500, {
				error: CreateFormError.internalError
			});
			return;
		}

		const post = await prisma.post.create({
			data: { body, url, category, description, unlisted: unlisted }
		});
		if (!post) {
			return fail(500, {
				error: CreateFormError.databaseError,
				message: 'Unknown error with the database.'
			});
		}
		redirect(302, `/posts/${post.category}/${post.url}`);
	}
} satisfies Actions;
