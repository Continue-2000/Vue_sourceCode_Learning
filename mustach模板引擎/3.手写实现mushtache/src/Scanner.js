export default class Scanenr {
    constructor(templateStr) {
        this.templateStr = templateStr;
        this.pos = 0;
        this.tail = this.utail()
    }
    //过渡{{}}
    scan(etag) {
        this.pos += etag.length;
        this.tail = this.utail()
    }
    //过渡返回非{{}}字符串
    scanUntil(etag) {
        const pre_pos = this.pos;
        while (!this.exo() && this.tail.indexOf(etag) != 0) {
            this.pos++;
            this.tail = this.utail()
        }
        return this.templateStr.substring(pre_pos, this.pos)
    }
    //更新tail
    utail() {
        return this.templateStr.substring(this.pos)
    }
    //判断是否到达终点
    exo() {
        return this.pos >= this.templateStr.length
    }
}