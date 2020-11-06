// 如何捕获全局的error异常？

// 全局error事件的监听
function initCatchMonitor() {
    // node
    if (typeof window == 'undefined') {

        process.on('uncaughtException', (err) => {
            console.log('error')
            console.log(err);
            setTimeout(() => {
                process.exit();
            }, 1e3)
        })

        // 可以捕获全局的，没有被捕获到的promise reject
        process.on('unhandledRejection', (err) => {
            console.log('unhandle Reject')
        })

    } else {
        // 在浏览器端捕获全局error
        window.addEventListener('error', function(err) {
            console.log(err)
            console.log(err.error.stack)
            console.log(err.message)
        })
        // 在浏览器端捕获promise reject
        window.addEventListener('unhandledrejection', err => {
            console.log(err.promise)
            console.log(err.reason)
        })
    }
}

initCatchMonitor();

function throwGlobalError() {
    // throw uncaughtException
    const a = b;
}

const asyncFun = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('error')
        }, 300)
    })
}

function throwPromiseError() {
    // 全局的Promise reject 如果没有写catch的话，无法捕获
    // Promise.reject('aa')

    asyncFun()
        .then(rst => {
            console.log(rst)
        })
        // 自行捕获
        // .catch(err => {
        //     console.log('custom catched error')
        // })
}

// 如果async await是用promise实现的，通过unhandledRejection也是可以捕获到的
async function throwAsyncError() {
    await asyncFun();
}