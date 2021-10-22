import Scanenr from "./Scanner";
import nestTokens from "./nestTokens";
export default function parseTemplateToTokens(templateStr) {
    //实例化一个扫描器，构造提供一个模板字符串参数
    let scanner = new Scanenr(templateStr);
    let tokens = [];
    let words;
    while (!scanner.exo()) {
        words = scanner.scanUntil('{{')
        //去掉空格，但是不能去掉标签内的空格
        let isInLable = false; //是否在标签内
        let _words = '';
        for (let i = 0; i < words.length; i++) {
            let w = words[i];
            if (w === '<') isInLable = true;
            if (w === '>') isInLable = false;
            if (!/\s/g.test(w)) {
                _words += w
            } else {
                if (isInLable) {
                    _words += w
                }
            }
        }
        tokens.push(['text', _words])
        scanner.scan('{{')
        words = scanner.scanUntil('}}')
        if (words.length > 0) {
            let word0 = words[0];
            if (word0 === '#') {
                tokens.push(['#', words.substring(1)])
            } else if (word0 === '/') {
                tokens.push(['/', words.substring(1)])
            } else {
                tokens.push(['name', words])
            }
        }
        scanner.scan('}}')
    }
    return nestTokens(tokens);
}