const ap = (window as any).ap;
const my = (window as any).my;

let token = '';
export function setToken(value: string) {
    token = value;
}
export function getToken() {
    return token;
}
let isFirstFromNative = true;
export function setIsFirstFromNative(value: boolean) {
    isFirstFromNative = false
}
export function getIsFirstFromNative() {
    return isFirstFromNative;
}

let domain = process.env.API || 'https://gateway-dev.shulidata.com/common/pointcenter';
console.log(domain)
export default {
    domain,
    // domain: 'https://gateway-test.shulidata.com/common/pointcenter',
    // domain: 'https://gateway.shulidata.com/common/pointcenter',
    ap,
    my,
    token,
    isFirstFromNative
}