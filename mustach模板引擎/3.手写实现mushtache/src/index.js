import parseTemplateToTokens from "./parseTemplateToTokens"
import renderTemplate from "./renderTemplate"
//全局提供TemplateEngine
window.TemplateEngine = {
    render(tempateStr, data) {
        //调用parseTemplateToTokens方法，将模板字符串转为Tokens
        let tokens = parseTemplateToTokens(tempateStr)
        console.log(tokens);
        //调用renderTemplate方法，将tokens转为domStr
        let domStr = renderTemplate(tokens, data)
        return domStr
    }
}