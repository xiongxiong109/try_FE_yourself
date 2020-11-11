// 获取页面中所有的标签
// 获取dom的方法 -> 得到的是NodeList，是一个类数组, 需要解构转掉
// const tags = document.querySelectorAll('*');
const tags = [...document.getElementsByTagName('*')];
// 可以被解构的类型，一定是具有迭代/遍历 Iterator 方法的
// 或者说 for in 能够执行的 如 Set, Map, Array, Object
const tagNames = tags.map(tag => tag.tagName || tag.nodeName)
// console.log(tagNames)
// 求数量: 去重
console.log([...new Set(tagNames)].length)
// 求所有标签的出现次数
let objMap = {};
// 可以使用reduce
tagNames.reduce((obj, a) => {
    if (!obj[a]) {
        obj[a] = 1
    } else {
        obj[a]++
    }
    return objMap
}, objMap)
// 求最值
// console.log(objMap)
let max = 0;
for (let item in objMap) {
    if (max < objMap[item]) {
        max = objMap[item]
    }
}
console.log(max)