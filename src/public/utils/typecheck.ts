function objStr(obj: any) {
    return Object.prototype.toString.call(obj);
}
function isArray(obj: any) {
    const str = objStr(obj);
    return str === '[object Array]';
}
export default {
    isArray
}