import lookup from "./lookup";

export default function renderTemplate(tokens, data) {
    let resultStr = '';
    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i];
        switch (token[0]) {
            case 'text':
                resultStr += token[1]
                break;
            case 'name':
                resultStr += lookup(data, token[1])
                break;
            case '#':
                let key = lookup(data, token[1]);
                for (let j = 0; j < key.length; j++) {
                    resultStr += renderTemplate(token[2], key[j])
                }
        }
    }
    return resultStr
}