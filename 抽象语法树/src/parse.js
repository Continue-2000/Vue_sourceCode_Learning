import parseAttrString from "./parseAttrString";
export default function parse(templateStr) {
    let len = templateStr.length;
    let index = 0; //指针
    let rest = ''; //剩余字符串
    let startTagExp = /^\<([a-z]+[1-6]?)(\s[^\<]+)?\>/; //开始标签的正则
    let endTagExp = /^\<\/([a-z]+[1-6]?)\>/; //结束标签的正则
    let wordExp = /^([^\<]+)\<\/[a-z]+[1-6]?\>/; //文字的正则
    let stack1 = [];
    let stack2 = [{
        'children': []
    }];
    while (index < len) {
        rest = templateStr.substring(index);
        if (startTagExp.test(rest)) {
            //进入开始标签
            let tag = rest.match(startTagExp)[1] //标签名
            let attrs = rest.match(startTagExp)[2] //属性
            console.log('开始标签：' + tag);
            stack1.push(tag)
            stack2.push({
                'tag': tag,
                'attrs': attrs ? parseAttrString(attrs) : undefined,
                'children': []
            })
            //index加值为tag的长度加上<>的长度2
            index += tag.length + (attrs != undefined ? attrs.length : 0) + 2;
        } else if (endTagExp.test(rest)) {
            //进入结束标签
            let tag = rest.match(endTagExp)[1]
            console.log('结束标签：' + tag);
            let popTag = stack1.pop()
            let popArr = stack2.pop();
            if (tag === popTag) {
                stack2[stack2.length - 1].children.push(popArr)
            } else {
                throw new Error(popTag + '标签没有闭合')
            }
            index += tag.length + 3;
        } else if (wordExp.test(rest)) {
            //进入文字内容
            let word = rest.match(wordExp)[1]
            if (!/^\s+$/.test(word)) {
                console.log('文字：' + word);
                stack2[stack2.length - 1].children.push({
                    'text': word,
                    'type': 3
                })
            }
            index += word.length;
        } else {
            index++;
        }
    }
    return stack2[0].children[0]
}