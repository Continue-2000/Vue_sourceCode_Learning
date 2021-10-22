import vnode from "./vnode"
import createElement from "./createElement"
import patchVnode from "./patchVnode";
export default function patch(oldVnode, newVnode) {
    //1.先判断旧节点是虚拟节点还是DOM节点
    if (oldVnode.sel === '' || oldVnode.sel === undefined) {
        // 如果是DOM节点，则包装为虚拟节点
        console.log('是DOM节点，则包装为虚拟节点');
        oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
    }
    // 2.判断是否是同一节点
    if (oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel) {
        // 是同一节点则精细化比较
        console.log('是同一节点则精细化比较');
        patchVnode(oldVnode, newVnode)
    } else {
        // 不是同一节点则暴力插入新的，删除旧的
        console.log('不是同一节点则暴力插入新的，删除旧的');
        let newDOM = createElement(newVnode)
        //插入到老节点之前
        if (oldVnode.elm.parentNode && newDOM) {
            oldVnode.elm.parentNode.insertBefore(newDOM, oldVnode.elm)
        }
        //删除老节点
        oldVnode.elm.parentNode.removeChild(oldVnode.elm)
    }
}