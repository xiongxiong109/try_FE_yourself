/**
 * 实现一个静态资源中间件
 * app.use(serve(path.resolve(__dirname, 'static')))
 * pathNm是绝对路径
 */
const fs = require('fs')
const path = require('path')

function staticServe(pathNm) {

    return ctx => {
        // /static/foo.js
        const { url } = ctx.req;
        if (/\.(js)$/.test(url)) {
            const fileNm = /\/\w+\.js$/.exec(url);
            if (fileNm) {
                ctx.res.setHeader('Content-Type', 'text/javascript; charset=utf-8');
                const rst = fs.readFileSync(path.join(pathNm, fileNm[0]), { encoding: 'utf8' })
                ctx.body = rst;
                return ctx.res.end(ctx.body);
            } else {
                ctx.res.statusCode = 404
                ctx.body = ''
            }
        }
    }
}

module.exports = staticServe