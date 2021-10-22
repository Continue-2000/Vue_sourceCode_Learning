/**
 * 功能：都有子节点的新旧节点进行更新操作
 */
import createElement from "./createElement";
import patch from "./patch";
import patchVnode from "./patchVnode";

function sameNode(node1, node2) {
    return node1.key == node2.key && node1.sel === node2.sel
}

export default function (parentElm, oldCh, newCh) {
    console.log(oldCh, newCh);
    //旧前指标
    let oldStartIdx = 0;
    //新前指标
    let newStartIdx = 0;
    //旧后指标
    let oldEndIdx = oldCh.length - 1;
    //新后指标
    let newEndIdx = newCh.length - 1;
    //旧前节点
    let oldStartVnode = oldCh[oldStartIdx]
    //新前节点
    let newStartVnode = newCh[newStartIdx]
    //旧后节点
    let oldEndVnode = oldCh[oldEndIdx]
    //新后节点
    let newEndVnode = newCh[newEndIdx]
    let keyMap = null;
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        console.log('死循环啦！');
        if (oldStartVnode == undefined) {
            oldStartVnode = oldCh[++oldStartIdx]
        } else if (oldEndVnode == undefined) {
            oldEndVnode = oldCh[--oldEndIdx]
        }
        //旧前新前
        else if (sameNode(oldStartVnode, newStartVnode)) {
            console.log('1方法比较');
            patch(oldStartVnode, newStartVnode)
            oldStartVnode = oldCh[++oldStartIdx]
            newStartVnode = newCh[++newStartIdx]
        }
        //旧后新后
        else if (sameNode(oldEndVnode, newEndVnode)) {
            console.log('2方法比较');
            patch(oldEndVnode, newEndVnode)
            oldEndVnode = oldCh[--oldEndIdx]
            newEndVnode = newCh[--newEndIdx]
        }
        //旧前新后
        else if (sameNode(oldStartVnode, newEndVnode)) {
            console.log('3方法比较');
            patch(oldStartVnode, newEndVnode)
            parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)
            oldStartVnode = oldCh[++oldStartIdx]
            newEndVnode = newCh[--newEndIdx]
        }
        //旧后新前
        else if (sameNode(oldEndVnode, newStartVnode)) {
            console.log('4方法比较');
            patch(oldEndVnode, newStartVnode)
            parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm)
            oldEndVnode = oldCh[--oldEndIdx]
            newStartVnode = newCh[++newStartIdx]
        } else {
            //此时都没匹配到
            if (!keyMap) {
                keyMap = {};
                for (let i = oldStartIdx; i <= oldEndIdx; i++) {
                    let key = oldCh[i].key
                    if (key) {
                        keyMap[key] = i;
                    }
                }
            }
            //用来判断是否是全新的节点
            let isIndex = keyMap[newStartVnode.key]
            if (!isIndex) {
                //是全新节点
                console.log('是全新节点');
                parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm)
            } else {
                //不是全新节点
                console.log('不是全新节点');
                const elmToMove = oldCh[isIndex];
                console.log(elmToMove === oldCh[isIndex]);
                patchVnode(elmToMove, newStartVnode)
                oldCh[isIndex] = undefined
                console.log(elmToMove);
                parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm)
            }
            newStartVnode = newCh[++newStartIdx]
        }
    }
    //此时如果有新增的节点
    if (newStartIdx <= newEndIdx) {
        console.log('有新增的节点');
        //通过newEndIdx来确定newEndIdx是否向前移动，从而确定新增的节点在中间还是后边
        let before = newCh[newEndIdx + 1] == null ? null : oldCh[oldStartIdx].elm
        for (let i = newStartIdx; i <= newEndIdx; i++) {
            parentElm.insertBefore(createElement(newCh[i]), before)
        }
    }
    //如果有删除的节点
    console.log(oldStartIdx, oldEndIdx);
    if (oldStartIdx <= oldEndIdx) {
        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
            if (oldCh[i]) {
                parentElm.removeChild(oldCh[i].elm)
            }
        }
    }
}