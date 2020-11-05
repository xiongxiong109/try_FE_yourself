const Koa = require('../try_node_server/src/app')
const Router = require('../try_node_server/src/router')
const staticServer = require('../try_node_server/src/static')
const fs = require('fs')
const path = require('path')

const app = new Koa();
const router = new Router();

router.get('/', ctx => {
    // ctx.res.setHeader('Content-Type', 'text/html; charset=utf-8');
    ctx.body = fs.readFileSync(path.resolve(__dirname, 'index.html'))
})

app.use(staticServer(path.resolve(__dirname, 'static')))

app.use(router.routes())

app.listen(8080, () => {
    console.log('server running')
})