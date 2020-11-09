// 手写简单前端模板引擎实现
/**
 * <p>{{data}}</p>
 * {{ each item in list }}
 * {{ /each }}
 */

const path = require('path')
const fs = require('fs')

// Simple JavaScript Templating
// John Resig - http://ejohn.org/ - MIT Licensed
/**
 * 正常书写html
 * <%  %> 嵌套js语句
 * <%= %> 输出变量
 */
function tmpl(str, data){
    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cache the result.
    var fn = !/\W/.test(str) ?
      cache[str] = cache[str] ||
        tmpl(document.getElementById(str).innerHTML) :

      // Generate a reusable function that will serve as a template
      // generator (and which will be cached).
      new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +

        // Introduce the data as local variables using with(){}
        "with(obj){p.push('" +

        // Convert the template into pure JavaScript
        str
          .replace(/[\r\t\n]/g, " ")
          .split("<%").join("\t")
          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
          .replace(/\t=(.*?)%>/g, "',$1,'")
          .split("\t").join("');")
          .split("%>").join("p.push('")
          .split("\r").join("\\'")
      + "');}return p.join('');");

    // Provide some basic currying to the user
    return data ? fn( data ) : fn;
  }

function render(temStr, dataInfo) {
    let str = temStr
    try {
        str = tmpl(temStr, dataInfo);
    } catch (e) {
        console.log(e)
    }
    return str
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