function objStr(obj: any) {
    return Object.prototype.toString.call(obj);
}
function isArray(obj: any) {
    return objStr(obj) === '[object Array]';
}
function isFunction(fn: any){
    return objStr(fn) === '[object Function]';
}
export default {
    isArray,
    isFunction
}