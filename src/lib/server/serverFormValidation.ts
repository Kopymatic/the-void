import { categoryRegex, CreateFormError, urlRegex } from '$lib';

export const validateCreateFormServer = (formData: FormData) => {
	let url = formData.get('url')?.toString();
	let description = formData.get('description')?.toString();
	let body = formData.get('body')?.toString();
	let unlisted = formData.get('unlisted') ? true : false;

	let selectedCategory = formData.get('selectedCategory')?.toString();
	let customCategory = formData.get('customCategory')?.toString();
	let category = customCategory || selectedCategory;

	let data = {
		url,
		category,
		description,
		body,
		unlisted
	};

	// Filter out all the required params
	if (!url) return { status: 400, error: CreateFormError.missingUrl, data };
	if (!body) return { status: 400, error: CreateFormError.missingBody, data };
	if (!category) {
		return {
			status: 400,
			error: CreateFormError.missingCategory,
			data
		};
	}

	// filter out incorrect formatting
	if (!categoryRegex.test(category)) {
		return { status: 400, error: CreateFormError.invalidCategory, data };
	}
	if (!urlRegex.test(url)) {
		return { status: 400, error: CreateFormError.invalidUrl, data };
	}
	return { status: undefined, error: undefined, data };
};
