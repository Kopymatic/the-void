// i feel like this is not the correct way to use an enum
export enum CreateFormError {
	missingUrl = 'Must fill in the URL field',
	missingBody = 'Must fill in the body field',
	missingCategory = 'Must fill in the category field',
	invalidCategory = 'Category format is invalid',
	invalidUrl = 'URL format is invalid',
	databaseError = 'Unknown error with the database.',
	internalError = 'Uh oh! Something went wrong on our end.'
}
export enum ShortcutFormError {
	missingName = 'Must fill in the name field',
	invalidName = 'Name format is invalid',

	missingDestination = 'Must fill in the destination field',
	invalidDestination = 'Destination format is invalid',

	databaseError = 'Unknown error with the database.',
	internalError = 'Uh oh! Something went wrong on our end.'
}

export const categoryRegex = /^[a-z\-0-9]+$/;
export const urlRegex = /^[a-z\-0-9]+$/;
export const httpRegex =
	/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
export const noProtoHttpRegex =
	/^[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;

export const simpleHash = (str: string) => {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash |= 0; // Convert to 32bit integer
	}
	return hash;
};
