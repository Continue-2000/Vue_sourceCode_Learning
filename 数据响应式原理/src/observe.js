import Observer from "./Observer";
export default function observe(value) {
    if (typeof value != 'object' || value === null) {
        return;
    }
    let ob;
    if (typeof value.__ob__ != 'undefined') {
        ob = value.__ob__
    } else {
        ob = new Observer(value)
    }
    return ob
}