export default function (attrString) {
    //'class="title a b" id="myTitle"'
    let attrsArr = [];
    let attrsObj = {};
    console.log(attrString);
    attrString = attrString.trim();
    let point = 0;
    let isYinHao = false; //是否在引号内
    for (let i = 0; i < attrString.length; i++) {
        let v = attrString[i];
        if (v === '"') {
            isYinHao = !isYinHao;
        }
        if (v === ' ' && !isYinHao) {
            if (attrString[point] != ' ') {
                attrsArr.push(attrString.substring(point, i))
            }
            point = i + 1;
        }
    }
    attrsArr.push(attrString.substring(point))
    attrsArr.map(item => {
        let arrItem = item.split('=')
        // console.log(item, key, value);
        attrsObj[arrItem[0]] = arrItem[1].match(/^"(.+)"$/)[1]
    })

    return attrsObj
}