import { env } from '$env/dynamic/private';

const correctPassword = env.TOP_SECRET_PASSWORD;

export let checkPassword = (password: string) => {
	if (correctPassword && password === correctPassword) {
		return true;
	}
	return false;
};
