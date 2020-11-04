// 就不用class, 一定要用最原始的js实现
const http = require('http')
const Emitter = require('events');
const context = require('./context')

function Koa(options) {
    // 继承事件类，具有onerror, 可以处理error回调
    this.middlewares = [];
    // koa 内部共用的上下文
    this.context = Object.create(context);
}

Koa.prototype = new Emitter();

/**
 * app.listen(4000)
 */
Koa.prototype.listen = function () {
    // 接管server的回调
    const server = http.createServer((req, res) => this.handleRequest(req, res));
    return server.listen(...arguments)
}

/**
 * app.use(ctx => ctx.body = 'hello world')
 * koa 如何实现 ctx.body 的全局管道式共享？ generator函数?
 * 如何判断一个函数是generator or asyncfunc ?
 */
Koa.prototype.use = function (fn) {
    // 将use的部分push到中间件中
    this.middlewares.push(fn);
}

Koa.prototype.createContext = function(req, res) {
    const context = Object.create(this.context);
    context.req = req;
    context.res = res;
    context.app = this;
    return context;
}

Koa.prototype.handleRequest = function (req, res) {

    const ctx = this.createContext(req, res);
    const middlewares = this.middlewares

    let midStep;

    // 使用generator控制中间件
    function* handleMiddlewares() {
        let mid = 0;
        while (mid < middlewares.length) {
            const fn = middlewares[mid];
            yield fn(ctx)
            mid++
        }
        return ctx
    }

    const handle = handleMiddlewares();

    loopStep();

    function loopStep() {
        midStep = handle.next();
        if (midStep && !midStep.done) {
            if (midStep.value instanceof Promise) {
                midStep.value.then(() => loopStep()).catch(() => loopStep())
            } else {
                loopStep();
            }
        } else {
            // 最终处理
            res.end(ctx.body)
        }

    }
}

module.exports = Koa