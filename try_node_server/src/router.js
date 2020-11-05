// 实现Koa-Router
/**
 * const Router = require('Koa-Router')
 * const router = new Router()
 * router.get('user', async (ctx, next) => {
 *      ctx.user = user;
 *      next()
 * })
 * router.get('/', (ctx, next) => {
 *  ctx.body = 'index'
 * })
 * 
 * router.use('/', fn)
 * router.use(['/', '/user'], fn)
 * app.use(router.routes())
 */

 /**
  * router.routes 需要是一个function
  */

class Router {
    constructor() {
        this.routeStack = [];
        this.routes = function() {
            // 这里经过中间件机制后, 可以拿到全局的ctx
            return ctx => this.handleRouter(ctx)
        }
    }
    handleRouter(ctx) {
        for (let item = 0; item < this.routeStack.length; item++) {
            if (this.routeStack[item] && this.match(this.routeStack[item], ctx)) {
                return this.routeStack[item].controller(ctx)
            }
        }
        return this.notFound(ctx);
    }
    // 判断当前命中的stack 与 ctx是否匹配
    // 这里的动态路由和params可以用path-to-regexp实现
    // 我们就不用，就要自己手写path-to-regexp - todo
    match(routeInfo, ctx) {
        const reg = new RegExp(routeInfo.path);
        if (reg.test(ctx.req.url) && routeInfo.method == ctx.req.method) {
            return true
        }
        return false
    }
    // 将path与method存入router的中间件, 先不考虑动态路由
    get(pathName, controller) {
        this.routeStack.push({
            method: 'GET',
            path: pathName,
            controller
        })
    }
    notFound(ctx) {
        ctx.res.statusCode = 404;
        ctx.body = 'not found';
        console.log(ctx)
    }
}

module.exports = Router