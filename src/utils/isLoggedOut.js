export function isLoggedOut(userObj) {
    return JSON.stringify(userObj) === '{}'
}