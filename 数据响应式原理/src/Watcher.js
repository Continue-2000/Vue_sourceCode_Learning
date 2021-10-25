import Dep from "./Dep";
let uid = 0;
//target：观察对象
//expression:监听对象属性
//callback：回调
export default class Watcher {
    constructor(target, expression, callback) {
        this.uid = uid++;
        this.target = target;
        this.getter = parsePath(expression);
        this.callback = callback;
        this.value = this.get();
    }
    //更新
    update() {
        this.run()
    }
    get() {
        //进入依赖收集阶段,让全局的Dep.target为Watcher本身
        Dep.target = this;
        let obj = this.target;
        let value;
        try {
            value = this.getter(obj);
            console.log(1);
        } finally {
            Dep.target = null;
            console.log(2);
        }
        return value
    }
    run() {
        this.getAndInvoke(this.callback)
    }
    getAndInvoke(callback) {
        const value = this.get()
        if (value != this.value) {
            let oldVal = this.value;
            this.value = value;
            callback.call(this.target, value)
        }
    }
}

function parsePath(exp) {
    let segments = exp.split('.')
    return (obj) => {
        for (let i = 0; i < segments.length; i++) {
            obj = obj[segments[i]]
        }
        return obj
    }
}