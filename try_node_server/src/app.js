// 就不用class, 一定要用最原始的js实现
const http = require('http')

function Koa(options) {
    this.middlewares = [];
    // this.initMiddlewares();
    // this.initApp();
}

/**
 * app.listen(4000)
 */
Koa.prototype.listen = function() {
    // 接管server的回调
    const server = http.createServer(this.handleRequest);
    return server.listen(...arguments)
}

/**
 * app.use(ctx => ctx.body = 'hello world')
 */
Koa.prototype.use = function(fn) {
    
}

Koa.prototype.handleRequest = function(req, res) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8;');
    res.end('hello koa')
}

module.exports = Koa