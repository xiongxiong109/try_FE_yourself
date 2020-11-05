const Koa = require('./src/app')
const Router = require('./src/router')
const app = new Koa();
const router = new Router();

function mockPromise() {
    return new Promise(resolve => {
        setTimeout(resolve, 300)
    })
}

app.use(async ctx => {
    await mockPromise();
    ctx.title = 'hello title';
})

// gegerator based middlewares
// app.use(ctx => {
//     console.log(ctx.req.headers)
//     ctx.body = 'hello world';
// })

router.get('/webapp/index', (ctx) => {
    ctx.body = ctx.title;
})

router.get('/webapp/zhuanche', (ctx) => {
    ctx.body = 'zhuanche'
})

app.use(router.routes());

app.listen(8080, () => {
    console.log('my koa is running at 8080')
})