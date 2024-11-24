import { isAdmin } from '$lib/server/isAdmin';
import type { LayoutServerLoad } from './$types';
import packagejson from '../../package.json';
import { execSync } from 'child_process';

export const load: LayoutServerLoad = async (event) => {
	const session = await event.locals.auth();
	const userIsAdmin = isAdmin(session?.user?.id);
	const user = { ...session?.user, isAdmin: userIsAdmin };

	let gitHash = execSync('git rev-parse --short HEAD').toString().trim();
	const packageVersion = packagejson.version;
	const versions = { git: gitHash, package: packageVersion };

	return {
		user,
		session,
		versions
	};
};
