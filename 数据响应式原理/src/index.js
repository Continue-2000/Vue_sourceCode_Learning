import observe from "./observe"
import Watcher from "./Watcher"
let obj = {
    a: {
        m: {
            n: 3
        }
    },
    b: 4,
    c: [1, 2, 3, 4]
}

observe(obj)
// obj.b = 5;
// console.log(obj.b);
// obj.a.m.n = 6;
// console.log(obj.a.m.n);
// obj.c.splice(1, 1, 22)
// console.log(obj.c);
// obj.c[4] = 555

//监听
new Watcher(obj, 'a.m.n', function (val) {
    console.log(val);
    console.log('成功监听到数据' + val);
})
obj.a.m.n = 4