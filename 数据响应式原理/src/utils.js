export const def = function (data, key, value, enumerable) {
    Object.defineProperty(data, key, {
        value,
        enumerable,
        writable: true,
        configurable: true
    })
}