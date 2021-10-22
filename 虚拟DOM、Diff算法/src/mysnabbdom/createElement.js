export default function createElement(vnode) {
    //创建节点
    let domNode = document.createElement(vnode.sel)
    // 观察是否有文本还是子节点
    if (vnode.text !== '' && (vnode.children === undefined || vnode.children.length === 0)) {
        // 有文本
        domNode.innerText = vnode.text;
    } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
        let parentvNode = domNode;
        //有子节点
        for (let i = 0; i < vnode.children.length; i++) {
            let ch = vnode.children[i];
            let childDOM = createElement(ch)
            parentvNode.appendChild(childDOM)
        }
    }
    vnode.elm = domNode;
    return vnode.elm
}