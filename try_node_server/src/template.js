// 手写简单前端模板引擎实现
/**
 * <p>{{data}}</p>
 * {{ each item in list }}
 * {{ /each }}
 */

const path = require('path')
const fs = require('fs')

function render(temStr, dataInfo) {
    try {
        let str = temStr.replace(/\n/g, '\\');
        str = '\'' + str + '\''
        // str = str.replace(/\{\{\s?each\s(\w+)\sin\s(\w+)\s?\}\}/g, '\' + for (let item = 0; item < dataInfo.$2.length; item++) { + \'');
        // str = str.replace(/(\{\{\s?\/each\s?\}\})/g, '\' + } + \'')
        // 替换{{}}
        str = str.replace(/\{\{(\w+)\}\}/g, '\' + (dataInfo.$1 || "") + \'');
        console.log(str)
        // 用eval函数对替换后对字符串执行js运算
        const rst = eval(str)
        return rst;
    } catch (e) {
        console.log(e)
    }
    return temStr
}

// view中间件
function view() {
    // 找到views目录文件夹
    const viewPath = path.resolve(...arguments);

    return ctx => {
        ctx.render = (pageNm, dataInfo) => {
            // .html 可以作为ext参数
            const rst = fs.readFileSync(path.join(viewPath, pageNm + '.html'), { encoding: 'utf8' });
            // console.log(rst)
            ctx.body = render(rst, dataInfo);
            ctx.res.end(ctx.body);
        }
    }
}

module.exports = view