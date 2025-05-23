import { applyAction } from "$app/forms";
import { categoryRegex, CreateFormError, httpRegex, ShortcutFormError, urlRegex } from "$lib";
import { goto } from "$app/navigation";
import type { ActionResult } from "@sveltejs/kit";

export const validateCreateFormClient = (formData: FormData, cancel: () => void) => {
	let url = formData.get("url")?.toString();
	let selectedCategory = formData.get("selectedCategory")?.toString();
	let customCategory = formData.get("customCategory")?.toString();
	let body = formData.get("body")?.toString();
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
			if (result.type === "redirect") {
				goto(result.location);
			} else {
				await applyAction(result);
			}
		}
	};
};

export const validateShortcutFormClient = (
	formData: FormData,
	cancel: () => void
): {
	error?: ShortcutFormError;
	submit?: ({ result }: { result: ActionResult }) => Promise<void>;
} => {
	let shortcutName = formData.get("name")?.toString().trim();
	let destination = formData.get("destination")?.toString().trim();

	// Filter out all the required params
	if (!shortcutName) {
		cancel();
		return { error: ShortcutFormError.missingName };
	}
	if (!destination) {
		cancel();
		return { error: ShortcutFormError.missingDestination };
	}

	if (!urlRegex.test(shortcutName)) {
		cancel();
		return { error: ShortcutFormError.invalidName };
	}
	if (!httpRegex.test(destination)) {
		cancel();
		return { error: ShortcutFormError.invalidDestination };
	}

	return {
		submit: async ({ result }: { result: ActionResult }) => {
			// `result` is an `ActionResult` object
			if (result.type === "redirect") {
				goto(result.location);
			} else {
				await applyAction(result);
			}
		}
	};
};
