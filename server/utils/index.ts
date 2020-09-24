export function isArray(target: any) {
    return Array.isArray(target);
}

export function isObject(target: any) {
    return Object.prototype.toString.call(target) === '[object Object]';
}
