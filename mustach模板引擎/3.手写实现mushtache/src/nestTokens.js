//将tokens变为嵌套tokens
export default function nestTokens(tokens) {
    //返回结果的数组
    let nestedTokens = [];
    //栈结构 用来存放迭代数,栈顶的token表示当前操作token
    let sections = [];
    //收集者 用来指向当前添加数据的数组
    let collector = nestedTokens;
    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i];
        switch (token[0]) {
            case '#':
                collector.push(token);
                sections.push(token);
                collector = token[2] = [];
                break;
            case '/':
                sections.pop();
                //如果栈中还有则将collector指向上一级循环的添加数组
                collector = sections.length > 0 ? sections[sections.length - 1][2] : nestedTokens;
                break;
            default:
                collector.push(token);
                break;
        }
    }
    return nestedTokens
}