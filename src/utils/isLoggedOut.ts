export function isLoggedOut(userObj: object) {
	return JSON.stringify(userObj) === '{}'
}
