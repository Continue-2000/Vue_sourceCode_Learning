import Watcher from "./Watcher";
let uid = 0;
//依赖者
export default class Dep {
    constructor() {
        this.uid = uid++;
        //存储订阅者(Watcher的实例)
        this.subs = [];

    }
    //添加订阅
    addSub(sub) {
        this.subs.push(sub)
    }
    //添加依赖
    depend() {
        if (Dep.target) {
            this.addSub(Dep.target)
        }
    }
    notify() {
        //浅克隆一份
        const subs = this.subs.slice();
        for (let i = 0, l = this.subs.length; i < l; i++) {
            subs[i].update()
        }
    }
}