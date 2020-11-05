// 手动实现一个Promise polyfill(其实可以参考babel polyfill or v8 core)
// 现在的代码都用c实现了，只能参考一下历史代码
// https://chromium.googlesource.com/v8/v8/+/3.29.45/src/promise.js?autodive=0/

/**
 * Promise的三种状态
 * pending, fulfilled, rejected
 * 基础实现：
 * 1. new Promise的时候，将函数参数与内部的resolve, reject函数绑定
 * 2. then与catch的时候，将对应的resolve, reject函数进行赋值
 * 3. resolve 与 reject的时候，修改对应的promise状态，并只在pending的时候才执行
 * 4. 为了实现多个then的链式调用，需要将每次resolve的值向下一个resolve传递
 * 5. then方法return 一个新的promise, 这个promise会拥有全新的state: pending，就可以继续向下执行
 */

const PENDING = 'Pending';
const FULFILLED = 'Fulfilled';
const REJECTED = 'Rejected';

class BPromise {
    /**
     * new BPromise((resolve, reject) => {
     * })
     */
    constructor(fn) {
        this.state = PENDING;
        this.successCallback;
        this.errorCallback;
        this.successDefer;
        this.errorDefer;
        this.fn = fn;
        fn.call(null, this.resolve.bind(this), this.reject.bind(this))
    }
    resolve(rst) {
        // 需要根据promise当前的状态做处理, 如果已经reject了就不应该再resovle
        if (this.state == PENDING) {
            this.state = FULFILLED;
            if (!this.successCallback) {
                return;
            }
            // 返回上一次处理的结果
            rst = this.successCallback(rst)
            // 需要将值继续向下一个Promise传递
            if (this.successDefer) {
                this.successDefer(rst);
            }
        }
    }
    reject(err) {
        // 没有配置catch
        if (!this.errorCallback && !this.errorDefer) {
            return console.warn('uncaught Promise rejected Error')
        }
        // 与resolve同理
        if (this.state == PENDING) {
            this.state = REJECTED
            if (this.errorCallback) {
                this.errorCallback(err)
            } else {
                this.errorDefer(err)
            }
        }
    }
    then(successHandle) {

        const fn = () => {};
        const newProm = new BPromise(fn)
        this.successCallback = successHandle
        /**
         * 这里不能return this, 需要return一个 new Promise, 这样才能让多个then连续向下执行
         * 其实用generator来做异步，确实会比Promise要更合理一点
         */
        this.successDefer = newProm.resolve.bind(newProm);
        this.errorDefer = newProm.reject.bind(newProm)
        return newProm

    }
    // 假如catch不需要return， 遇到后就直接throw error了
    catch(errorHandle) {
        this.errorCallback = errorHandle;
    }
}

const bp = new BPromise((resolve, reject) => {
    setTimeout(() => {
        resolve({
            data: 'hello'
        })
    }, 300)

    setTimeout(() => {
        reject('rejected')
    }, 1e3)
})

bp
.then(rst => {
    console.log(rst)
    return rst.data
})
// 如果Promise的then return的是this, 则多个then的时候将无法继续执行了, 因为promise 的 state 已经变成了Fulfilled
.then(data => {
    console.log(data)
})
.catch(err => {
    console.log('error')
    console.log(err)
})