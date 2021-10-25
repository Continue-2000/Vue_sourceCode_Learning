import {
    def
} from "./utils"
import defineReactive from "./defineReactive";
import {
    arrayMethods
} from "./array";
import observe from "./observe";
import Dep from "./Dep"
export default class Observer {
    constructor(value) {
        //给value对象添加一个__ob__属性
        def(value, '__ob__', this, false)
        this.dep = new Dep()
        if (Array.isArray(value)) {
            Object.setPrototypeOf(value, arrayMethods)
            this.observeArray(value)
        } else {
            this.walk(value)
        }
    }
    //用来是每一项变响应属性
    walk(value) {
        //遍历value对象
        for (let key in value) {
            defineReactive(value, key)
        }
    }
    observeArray(arr) {
        for (let i = 0, l = arr.length; i < l; i++) {
            observe(arr[i])
        }
    }
}