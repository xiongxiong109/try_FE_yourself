// 手写简单前端模板引擎实现
/**
 * <p>{{data}}</p>
 * {{ each item in list }}
 * {{ /each }}
 */

const path = require('path')
const fs = require('fs')

function render(temStr, dataInfo) {
    console.log(temStr);
    console.log(dataInfo)
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
            console.log(rst)
            ctx.body = render(rst, dataInfo);
            ctx.res.end(ctx.body);
        }
    }
}

module.exports = view