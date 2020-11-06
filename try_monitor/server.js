const Koa = require('../try_node_server/src/app')
const staticServer = require('../try_node_server/src/static')
const fs = require('fs')
const path = require('path')

const app = new Koa();

app.use(staticServer(path.resolve(__dirname, '')))

app.use(ctx => {
    ctx.body = fs.readFileSync(path.resolve(__dirname, 'index.html'))
})

app.listen(8080)