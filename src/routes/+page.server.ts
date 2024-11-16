import type { LayoutServerLoad } from './$types';
import { slogans } from '$lib/homepageSlogans.json';

export const load: LayoutServerLoad = async (event) => {
	return { slogans };
};
