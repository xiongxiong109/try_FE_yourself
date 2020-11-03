// 使用generator 组织中间件函数

function convertFn(fn) {
    return function *() {
        yield fn()
    }
}

module.exports = convertFn