import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../../routes/shortcut/view/$types";

export const load: PageServerLoad = async () => {
	redirect(302, "/");
};
