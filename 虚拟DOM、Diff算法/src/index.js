import h from "./mysnabbdom/h"
import patch from "./mysnabbdom/patch"
let container1 = document.querySelector('#container1')
let container2 = document.querySelector('#container2')
let container3 = document.querySelector('#container3')
let Vnode1 = h('p', {}, 'hello')
let Vnode2 = h('p', {}, 'hello')
let Vnode3 = h('p', {}, [
    h('p', {
        key: 'A'
    }, 'A'),
    h('p', {
        key: 'B'
    }, 'B'),
    h('p', {
        key: 'C'
    }, 'C'),
    h('p', {
        key: 'D'
    }, 'D'),
])
patch(container1, Vnode1)
patch(container2, Vnode2)
patch(container3, Vnode3)
let buttons = document.querySelectorAll('button')

//新节点为文字
let newVnode1 = h('p', {}, '新节点为文字修改')
buttons[0].addEventListener('click', function () {
    patch(Vnode1, newVnode1)
})

//新节点有子节点
let newVnode2 = h('p', {}, [
    h('p', {}, 'A'),
    h('p', {}, 'B'),
    h('p', {}, 'C'),
    h('p', {}, 'D'),
])
//旧节点没有子节点
buttons[1].addEventListener('click', function () {
    patch(Vnode2, newVnode2)
})
let newVnode3 = h('p', {}, [
    h('p', {
        key: 'F'
    }, 'F'),
    h('p', {
        key: 'B'
    }, 'BBBB'),
    h('p', {
        key: 'C'
    }, 'C'),
    h('p', {
        key: 'A'
    }, 'A'),
    h('p', {
        key: 'E'
    }, 'E'),
])
//新旧节点都有子节点
buttons[2].addEventListener('click', function () {
    patch(Vnode3, newVnode3)
})