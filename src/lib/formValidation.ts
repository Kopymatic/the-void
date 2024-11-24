import { applyAction } from '$app/forms';
import { categoryRegex, CreateFormError, urlRegex } from '$lib';
import { goto } from '$app/navigation';
import type { ActionResult } from '@sveltejs/kit';

export const validateCreateFormClient = (formData: FormData, cancel: () => void) => {
	let url = formData.get('url')?.toString();
	let selectedCategory = formData.get('selectedCategory')?.toString();
	let customCategory = formData.get('customCategory')?.toString();
	let body = formData.get('body')?.toString();
	let category = customCategory || selectedCategory;

	// Filter out all the required params
	if (!url) {
		cancel();
		return { error: CreateFormError.missingUrl };
	}
	if (!body) {
		cancel();
		return { error: CreateFormError.missingBody };
	}
	if (!category) {
		cancel();
		return { error: CreateFormError.missingCategory };
	}

	// filter out incorrect formatting
	if (!categoryRegex.test(category)) {
		cancel();
		return { error: CreateFormError.invalidCategory };
	}
	if (!urlRegex.test(url)) {
		cancel();
		return { error: CreateFormError.invalidUrl };
	}

	return {
		submit: async ({ result }: { result: ActionResult }) => {
			// `result` is an `ActionResult` object
			if (result.type === 'redirect') {
				goto(result.location);
			} else {
				await applyAction(result);
			}
		}
	};
};
