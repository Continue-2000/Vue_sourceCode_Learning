import observe from "./observe";
import Dep from "./Dep"
export default function defineReactive(data, key, val) {
    if (arguments.length === 2) {
        val = data[key]
    }
    //先observe看是否是嵌套对象
    let childOb = observe(val)
    //
    let dep = new Dep()
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get() {
            console.log(`访问了${key}的值`);
            //存在全局标识，添加依赖
            if (Dep.target) {
                dep.depend()
                if (childOb) {
                    childOb.dep.depend()
                }
            }
            return val
        },
        set(newVal) {
            console.log(`修改了${key}的值`);
            if (newVal === val) return;
            val = newVal;
            //当设置了新值，这个新值也要被定为可响应
            childOb = observe(newVal)
            //通知依赖者更新
            dep.notify()
        }
    })
}