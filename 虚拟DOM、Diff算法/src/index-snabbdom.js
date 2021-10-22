import {
    init
} from 'snabbdom/init'
import {
    classModule
} from 'snabbdom/modules/class'
import {
    propsModule
} from 'snabbdom/modules/props'
import {
    styleModule
} from 'snabbdom/modules/style'
import {
    eventListenersModule
} from 'snabbdom/modules/eventlisteners'
import {
    h
} from 'snabbdom/h' // helper function for creating vnode
// 创建path函数
const patch = init([classModule, propsModule, styleModule, eventListenersModule])
let vnode = document.querySelector('#container3')
let newVnode = h('div', {
    class: {
        'pdiv': true
    }
}, [
    h('p', {}, 'name1'),
    h('p', {}, 'name2'),
    h('p', {}, 'name3'),
])
console.log(vnode, newVnode);
// Second `patch` invocation
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
patch(vnode, Vnode3) // Snabbdom efficiently updates the old view to the new state

let newVnode3 = h('p', {}, [
    h('p', {
        key: 'F'
    }, 'F'),
    h('p', {
        key: 'B'
    }, 'B'),
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
let buttons = document.querySelectorAll('button')
buttons[2].addEventListener('click', function () {
    patch(Vnode3, newVnode3)
})