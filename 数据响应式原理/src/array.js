import {
    def
} from "./utils"

export const arrayMethods = Object.create(Array.prototype);
const needToChanges = ['push', 'pop', 'unshift', 'shift', 'splice', 'reverse', 'sort'];
needToChanges.forEach(methdName => {
    let origin = Array.prototype[methdName];
    def(arrayMethods, methdName, function () {
        console.log('进入重写的数组方法：' + methdName);
        //此时一定有__ob__属性，因为数组不能直接作为一级对象
        let ob = this.__ob__;
        //声明插入的新数组
        let inserted = [];
        //伪数组变为数组
        let args = [...arguments]
        switch (methdName) {
            case 'push':
            case 'unshift':
                inserted = args;
                break;
            case 'splice':
                inserted = args.slice(2);
                break;
        }
        //如果添加数据
        if (inserted) {
            console.log(inserted);
            ob.observeArray(inserted)
        }
        ob.dep.notify()
        let result = origin.apply(this, arguments)
        return result
    }, false)
})