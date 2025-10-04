import { applyAction } from "$app/forms";
import {
	categoryRegex,
	CreateFormError,
	httpRegex,
	ShortcutFormError,
	internalUrlRegex
} from "$lib";
import { goto } from "$app/navigation";
import type { ActionResult } from "@sveltejs/kit";

export const validateCreateFormClient = (formData: FormData, cancel: () => void) => {
	const url = formData.get("url")?.toString();
	const selectedCategory = formData.get("selectedCategory")?.toString();
	const customCategory = formData.get("customCategory")?.toString();
	const body = formData.get("body")?.toString();
	const category = customCategory || selectedCategory;

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
	if (!internalUrlRegex.test(url)) {
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
	const shortcutName = formData.get("name")?.toString().trim();
	const destination = formData.get("destination")?.toString().trim();

	// Filter out all the required params
	if (!shortcutName) {
		cancel();
		return { error: ShortcutFormError.missingName };
	}
	if (!destination) {
		cancel();
		return { error: ShortcutFormError.missingDestination };
	}

	if (!internalUrlRegex.test(shortcutName)) {
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
