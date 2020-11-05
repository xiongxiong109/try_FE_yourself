/**
 * 尝试基于链表结构实现Promise?
 * promise -> then -> next.
 * promise -> catch -> finally
 */

const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class PromiseNode {
    constructor() {
        // promise的初始状态
        this.state = PENDING;
        // 用于存储下一个Promise链
        this.next = null;
        this.successCall = null;
        this.failCall = null;
    }
    // 注册函数属性
    invoke(propName, fn) {
        Object.defineProperty(this, propName, {
            get() {
                return fn
            }
        })
    }
    resolve(rst) {
        if (this.state == PENDING) {
            try {
                if (this.successCall) {
                    // 用于触发链式回调
                    rst = this.successCall(rst);
                    // 如果有下一个promise;
                    if (this.next) {
                        this.next.promise.resolve(rst);
                    }
                    this.state = FULFILLED;
                }
            } catch (err) {
                this.reject(err)
            }
        }
    }
    reject(err) {
        if (this.state == PENDING) {
            this.state = REJECTED;
            if (this.failCall) {
                this.failCall(err)
            }
            if (this.next && this.next.promise.failCall) {
                this.next.promise.failCall(err)
            }
        }
    }
}

class BPromise {
    constructor(fn) {
        this.promise = new PromiseNode();
        const resolve = rst => this.promise.resolve(rst)
        const reject = err => this.promise.reject(err)
        // 在这里会主动进入resolve, reject
        fn(resolve, reject)
    }
    // then 和 catch 只负责注册函数, 和返回promise
    then(successCall) {
        // 注册successCall函数
        this.promise.invoke('successCall', successCall);
        // 创建一个新的promiseNode
        this.promise.next = new BPromise(_ => { });
        return this.promise.next
    }
    catch(errCall) {
        this.promise.invoke('failCall', errCall);
    }
}

// const bp = new BPromise((resolve, reject) => {
//     setTimeout(() => {
//         resolve({
//             data: 'hello'
//         })
//     }, 300)
// })

// bp
//     .then((rst) => {
//         console.log(rst)
//         return rst.data
//     })
//     .then(data => {
//         console.log(data)
//         return data[0]
//     })
//     .then(char => {
//         // trigger error
//         let a = n;
//         console.log(char)
//     })
//     .catch(err => {
//         console.log('err')
//         console.log(err)
//     })