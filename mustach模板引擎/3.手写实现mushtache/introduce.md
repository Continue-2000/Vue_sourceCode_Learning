# 程序介绍
1. 采用webpack模块化开发
2. 运行流程
    1.index.js中声明全局引擎TemplateEngine对象，其中添加render函数
    2.在index.html中调用TemplateStr.render，传入模板字符串templateStr和渲染数据data
    3.render内部调用parseTemplateToTokens
    4.parseTemplateToTokens内部调用scanner类方法(
        scanUntil：读取非{{}}内容
        scan:跳过{{}}字符串
        utail：更新tail
        exo：是否到达终点
    )得到读取后的所有字符串并分类型(text,name,#,/)加入tokens数组
    5.调用nestTokens方法传入tokens将tokens转为嵌套数组
    6.调用renderTemplate传入tokens，data渲染数据，lookup(
        传入数据，字符串属性，可判断.类型的字段
        返回对应的值
    )返回domStr
    7.将最终得到domStr添加到innerHtml