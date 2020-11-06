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
    // 实现Promise.all, Promise.race
    /**
     * Promise.all, 将多个Promise包装成一个新的Promise
     * 成功时，返回一个数组，数组分别是每一个promise的结果
     * 失败时，返回最先reject的值
     * Promise.all([pr1, pr2, pr3]).then().catch()
     * Promise.all 里返回的值，是按照列举的异步方法的顺序来的
     */
    static all(promises) {
        let rst = new Array(promises.length);
        let hasErr = false;
        let idx = 0;

        return new BPromise((resolve, reject) => {
            // all 里面的函数，不需要等待上一个结果的完成, 所以可以同时触发, 将不同的结果存入数组中
            for (let i = 0; i < promises.length; i++) {
                promises[i]
                .then(data => {
                    rst[i] = data;
                    idx++;
                    // 判断所有的promise都已经完成
                    if (idx == rst.length) {
                        resolve(rst);
                    }
                })
                .catch(err => {
                    if (!hasErr) {
                        hasErr = true
                        reject(err)
                    }
                })
            }
        })
    }
    /**
     * Promise.race的实现, race中任意一个promise完成或者reject, 整个流程即结束
     * 赛跑的意思, 谁先完成就是谁
     */
    static race(promises) {
        return new Promise((resolve, reject) => {
            // 这里有个疑点， for循环起步的顺序，不会影响执行的先后结果吗？ 先进入事件队列的Promise
            // 是否会先执行？
            // v8源码使用的是 for of, 是否应该用map替代list?
            for (let i = 0; i < promises.length; i++) {
                promises[i]
                .then(rst => {
                    resolve(rst)
                })
                .catch(err => {
                    reject(err)
                })
            }
        })
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

const pr1 = new BPromise((resolve, reject) => {
    setTimeout(() => {
        resolve({data: 'foo'})
        // reject('error pr1')
    }, 1e3)
})

const pr2 = new BPromise((resolve, reject) => {
    setTimeout(() => {
        resolve({ foo: 'bar' })
    }, 500)
})

// BPromise
// .all([
//     pr1,
//     new Promise((resolve, reject) => {
//         setTimeout(() => {
//             // reject('error')
//             resolve('ok')
//         }, 300)
//     }),
//     pr2
// ])
// .then(rst => {
//     console.log(rst)
// })
// .catch(err => {
//     console.log(err)
// })

BPromise
.race([
    pr1,
    new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('error')
            // resolve('ok')
        }, 300)
    }),
    pr2
])
.then(rst => {
    console.log(rst)
})
.catch(err => {
    console.log(err)
})