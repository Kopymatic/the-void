// i feel like this is not the correct way to use an enum
export enum CreateFormError {
	missingUrl = 'Must fill in the URL field',
	missingBody = 'Must fill in the body field',
	missingCategory = 'Must fill in the category field',
	invalidCategory = 'Category format is invalid',
	invalidUrl = 'URL format is invalid',
	databaseError = 'Unknown error with the database.'
}
