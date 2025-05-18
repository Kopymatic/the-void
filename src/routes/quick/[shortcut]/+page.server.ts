import { prisma } from '$lib/server/database/database';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	let shortcut = params.shortcut;
	console.log(`Getting quick/${shortcut}`);
	const shortcutEntry = await prisma.shortcut.findFirst({ where: { shortcut: shortcut } });

	if (shortcutEntry) {
		redirect(302, shortcutEntry?.redirectUrl!!);
	}

	error(404, 'Not found');
};
