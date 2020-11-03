const Koa = require('./src/app')

const app = new Koa();

app.listen(8080, () => {
    console.log('my koa is running at 8080')
})