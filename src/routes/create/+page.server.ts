import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { prisma } from '$lib/server/database/database';
import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';
import { CreateFormError } from '$lib';
import { defaultCategories } from '$lib/defaultCategories';
import { validateCreateFormServer } from '$lib/server/serverFormValidation';
import { sendPostToChannels } from '$lib/server/discordBot/bot';

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
		sendPostToChannels(post);
		redirect(302, `/posts/${post.category}/${post.url}`);
	}
} satisfies Actions;
