import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/database/database';
import { CreateFormError } from '$lib';
import { validateCreateFormServer } from '$lib/server/serverFormValidation';
import { isAdmin } from '$lib/server/isAdmin';

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
	delete: async ({ locals, params }) => {
		const session = await locals.auth();
		if (!session || !isAdmin(session.user?.id)) {
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
				redirect(302, '/posts');
			});
	},
	edit: async ({ request, params, locals }) => {
		const session = await locals.auth();
		if (!session || !isAdmin(session.user?.id)) {
			error(401);
		}

		console.log('recieved edit request');
		let formData = await request.formData();

		const result = validateCreateFormServer(formData);
		if (result.status || result.error) {
			fail(result.status, {
				error: result.error,
				reconstructedData: result.data
			});
			return;
		}

		const { body, category, description, unlisted, url } = result.data;
		if (!url || !body) {
			console.log('The server validation function fucked up');
			fail(500, {
				error: CreateFormError.internalError
			});
			return;
		}
		const currentCategory = params.category;
		const currentUrl = params.url;

		if (!currentCategory || !currentUrl) error(400, 'Invalid request');

		const toEdit = await prisma.post.findFirst({
			where: { category: currentCategory, url: currentUrl }
		});
		if (!toEdit) error(404, 'Not found');

		const newPost = await prisma.post.update({
			where: { id: toEdit.id },
			data: { body, url, category, description, unlisted }
		});
		if (!newPost) {
			return fail(500, {
				error: CreateFormError.databaseError,
				message: 'Unknown error with the database.'
			});
		}

		redirect(302, `/posts/${newPost.category}/${newPost.url}`);
	}
} satisfies Actions;
