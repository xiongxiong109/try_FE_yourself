const Koa = require('../try_node_server/src/app')
const staticServer = require('../try_node_server/src/static')
const fs = require('fs')
const path = require('path')

// 模拟第一个站点
const app_1 = new Koa();

app_1.use(staticServer(path.resolve(__dirname, '')))

app_1.use(ctx => {
    // 写入cookie登录信息
    const date = new Date();
    date.setDate(date.getDate() + 365)
    ctx.res.setHeader('set-cookie', 'b_ticket=bear_xiong; path=/page; httpOnly; expires=' + date)
    // ctx.res.setHeader('set-cookie', 'js_ticket=bear; path=/page; expires=' + date)
    ctx.body = fs.readFileSync(path.resolve(__dirname, 'page_a.html'))
    console.log(ctx.req.headers.cookie)
    console.log(ctx.req.headers.referer) // 可以根据referer的来源是不是来自本站，来做一些处理
    if (!ctx.req.headers.referer || ctx.req.headers.referer == 'http://localhost:8080') {
        console.log(true)
    } else {
        console.log('csrf')
    }
})

app_1.listen(8080)


// 模拟另外一个站点
const app_2 = new Koa();

app_2.use(staticServer(path.resolve(__dirname, '')))

app_2.use(ctx => {
    ctx.body = fs.readFileSync(path.resolve(__dirname, 'page_b.html'))
})

app_2.listen(8888)