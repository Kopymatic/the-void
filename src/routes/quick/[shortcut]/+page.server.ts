import { prisma } from '$lib/server/database/database';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { isAdmin } from '$lib/server/isAdmin';
import { validateShortcutCreateFormServer } from '$lib/server/serverFormValidation';
import { ShortcutFormError } from '$lib';

export const load: PageServerLoad = async ({ params }) => {
	let shortcut = params.shortcut;
	console.log(`Getting quick/${shortcut}`);
	const shortcutEntry = await prisma.shortcut.findFirst({ where: { shortcut: shortcut } });

	if (shortcutEntry) {
		redirect(302, shortcutEntry?.redirectUrl!!);
	}

	error(404, 'Not found');
};

export const actions = {
	delete: async ({ locals, params }) => {
		const session = await locals.auth();
		if (!session || !isAdmin(session.user?.id)) {
			error(401);
		}

		let shortcut = params.shortcut;
		console.log('Delete shortcut request received for ' + shortcut);

		if (!shortcut) error(400, 'Invalid request');

		const toDelete = await prisma.shortcut.findFirst({ where: { shortcut: shortcut } });

		if (!toDelete) error(404, 'Not found');

		const deleted = await prisma.shortcut
			.delete({ where: { id: toDelete.id } })
			.catch((e) => {
				console.error(e);
				error(500, 'Database error');
			})
			.then(() => {
				redirect(302, '/shortcut/view');
			});
	},
	edit: async ({ request, params, locals }) => {
		const session = await locals.auth();
		if (!session || !isAdmin(session.user?.id)) {
			error(401);
		}

		let shortcut = params.shortcut;
		console.log('Edit shortcut request received for ' + shortcut);
		if (!shortcut) error(400, 'Invalid request');

		let formData = await request.formData();
		const result = validateShortcutCreateFormServer(formData);
		if (result.status || result.error) {
			fail(result.status, {
				error: result.error,
				reconstructedData: result.data
			});
			return;
		}

		const { shortcutName, destination } = result.data;
		if (!shortcutName || !destination) {
			console.log('The server validation function fucked up');
			fail(500, {
				error: ShortcutFormError.internalError
			});
			return;
		}

		const toEdit = await prisma.shortcut.findFirst({
			where: { shortcut: shortcut }
		});
		if (!toEdit) error(404, 'Not found');

		const newShortcut = await prisma.shortcut.update({
			where: { id: toEdit.id },
			data: { shortcut: shortcutName, redirectUrl: destination }
		});

		if (!newShortcut) {
			return fail(500, {
				error: ShortcutFormError.databaseError,
				message: 'Unknown Error with the database'
			});
		}

		redirect(303, '/shortcut/view');
	}
} satisfies Actions;
