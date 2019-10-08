let token = '';
export function setToken(value: string) {
    token = value;
}
export function getToken() {
    return token;
}

let domain = process.env.API || '';
export default {
    domain,
    token,
}