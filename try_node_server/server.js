const Koa = require('./src/app')

const app = new Koa();

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
app.use(ctx => {
    console.log(ctx.req.headers)
    ctx.body = 'hello world';
})

app.listen(8080, () => {
    console.log('my koa is running at 8080')
})