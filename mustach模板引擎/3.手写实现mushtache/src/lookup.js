/*
    功能：将含有a.b.c类型的数据进行查找
    如{
        a:{
            b:{
                c:3
            }
        }
    }
    则a.b.c=3
*/
export default function lookup(data, valueStr) {
    if (valueStr === '.') return data
    if (valueStr.indexOf('.') != -1) {
        let values = valueStr.split('.');
        let start = 0;
        if (values[0] === 'item') start = 1;
        let temp = data;
        for (let i = start; i < values.length; i++) {
            temp = temp[values[i]]
        }
        return temp
    }
    return data[valueStr];
}