import { isAdmin } from "$lib/server/isAdmin";
import type { LayoutServerLoad } from "./$types";
import packagejson from "../../package.json";

export const load: LayoutServerLoad = async (event) => {
	const session = await event.locals.auth();
	const userIsAdmin = isAdmin(session?.user?.id);
	const user = { ...session?.user, isAdmin: userIsAdmin };

	// const gitHash = execSync("git rev-parse --short HEAD").toString().trim();
	const packageVersion = packagejson.version;
	const commit = process.env.GIT_COMMIT ? process.env.GIT_COMMIT : undefined;
	const versions = { git: commit, package: packageVersion };

	return {
		user,
		session,
		versions
	};
};
