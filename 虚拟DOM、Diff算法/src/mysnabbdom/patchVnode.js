/**
 * 功能：同一节点进行比较
 */
import createElement from "./createElement";
import updateChildren from "./updateChildren";
export default function (oldVnode, newVnode) {
    //2.1先判断新旧节点是否是同一对象,是则返回
    if (oldVnode === newVnode) return
    //2.2判断新节点是否有文字和子节点
    if (newVnode.text != undefined && (newVnode.children === undefined || newVnode.children.length === 0)) {
        //新节点有文字没有子节点
        console.log('新节点有文字没有子节点');
        oldVnode.elm.innerText = newVnode.text;
    } else if (newVnode.children.length > 0) {
        //新节点有子节点
        console.log('新节点有子节点');
        //判断旧节点是否有文字与子节点
        if (oldVnode.text != undefined && (oldVnode.children === undefined || oldVnode.children.length === 0)) {
            console.log('旧节点有文字但没有子节点');
            //删除原文字
            oldVnode.elm.innerText = ''
            //添加新节点的子节点
            for (let i = 0; i < newVnode.children.length; i++) {
                let ch = newVnode.children[i]
                oldVnode.elm.appendChild(createElement(ch))
            }
        } else if (oldVnode.children.length > 0) {
            //旧节点也有子节点，进行新旧子节点比对
            console.log('旧节点有子节点');
            updateChildren(oldVnode.elm, oldVnode.children, newVnode.children)
        }
    }
}