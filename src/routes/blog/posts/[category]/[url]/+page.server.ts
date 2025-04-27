import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/database/database';
import { env } from '$env/dynamic/private';
import { CreateFormError } from '$lib';
import { validateCreateFormServer } from '$lib/server/serverFormValidation';

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
				redirect(302, '/blog/list');
			});
	},
	edit: async ({ request, params }) => {
		console.log('recieved edit request');
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
		const currentCategory = params.category;
		const currentUrl = params.url;

		if (!currentCategory || !currentUrl) error(400, 'Invalid request');

		const toEdit = await prisma.post.findFirst({
			where: { category: currentCategory, url: currentUrl }
		});
		if (!toEdit) error(404, 'Not found');

		const post = await prisma.post.update({
			where: { id: toEdit.id },
			data: { body, url, category, description, unlisted }
		});
		if (!post) {
			return fail(500, {
				error: CreateFormError.databaseError,
				message: 'Unknown error with the database.'
			});
		}

		const previousFullUrl = toEdit.category + '/' + toEdit.url;
		const newFullUrl = post.category + '/' + post.url;

		if (previousFullUrl === newFullUrl) {
			return { success: true };
		} else redirect(302, `/posts/${post.category}/${post.url}`);
	}
} satisfies Actions;
