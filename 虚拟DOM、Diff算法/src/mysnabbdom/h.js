import vnode from "./vnode";
export default function h(sel, data, c) {
    if (arguments.length != 3) {
        throw new Error('对不起,这是低配版的h函数，只支持三个参数的形式')
    } else {
        if (typeof sel != 'string') {
            throw new TypeError('第一个参数sel应为string类型')
        }
        if (typeof data != 'object' || data === null || Array.isArray(data)) {
            throw new TypeError('第二个参数data应为object类型')
        } else {
            if (typeof c === 'string' || typeof c === 'number') {
                return vnode(sel, data, undefined, c, undefined)
            }
            if (Array.isArray(c)) {
                let children = [];
                for (let i = 0; i < c.length; i++) {
                    if (!(typeof c[i] === 'object' && c[i].hasOwnProperty('sel'))) {
                        throw new TypeError('第三个参数作为数组传入其子元素应为h函数')
                    } else {
                        children.push(c[i])
                    }
                }
                return vnode(sel, data, children, undefined, undefined)
            } else if (typeof c === 'object' && c[i].hasOwnProperty('sel')) {
                return vnode(sel, data, [c], undefined, undefined)
            } else {
                return new TypeError('第三个参数类型错误')
            }
        }
    }
}