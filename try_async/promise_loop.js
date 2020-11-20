// promise的串行写法
// 回调函数为何try catch不到 error

// 模拟异步回调方法
// function mockAsync(callBack) {
//     setTimeout(() => {
//         callBack && callBack({ foo: 'bar' })
//     }, 300)
// }

// try catch 能捕获到的，仅仅是try 模块内同步方法的异常, 对于回调函数、异步方法无能为力
// 可以异步捕获的，是 try { await } catch {}
// try {
//     mockAsync(rst => {
//         // 这是回调函数, 会报错, 但是catch不到, 因为是异步函数
//         rst.data.id = 1;
//     })
// } catch(err) {
//     console.log('error')
//     console.log(err)
// }

// async function fetch() {
//     try {
//         await mockAsync(rst => rst.data.id = 1)
//     } catch(err) {
//         console.log(err)
//     }
// }

// process.on('unhandledrejection', (err) => {
//     console.log('err')
//     console.log(err)
// })

// fetch()
// mockAsync(rst => {
//     try {
//         rst.data.id = 1
//     } catch(err) {
//         console.log('err')
//     }
// })

// 实现串行的Promise写法, 即 fetchA -> fetchB -> fetchC
function fetchA() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('A')
            resolve()
        }, 300)
    })
}
function fetchB() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('B')
            resolve()
        }, 300)
    })
}
function fetchC() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('C')
            resolve()
        }, 300)
    })
}
// 并行可以用Promise.all, 限制并发数可以用之前的方法
// 最锉实现
// fetchA().then(() => {
//     fetchB().then(() => fetchC())
// })

// async await 实现
// async function fetch() {
//     await fetchA()
//     await fetchB()
//     await fetchC()
// }
// fetch()

// let curFetch;
let fetchArr = [
    fetchA, fetchB, fetchC
];

function *fetch(arr) {
    for (let i = 0; i < arr.length; i++) {
        yield arr[i]
    }
    return
}

const f = fetch(fetchArr);

// console.log(f.next())
let step = f.next();

function run() {
    // console.log(step)
    step.value().then(() => {
        step = f.next()
        if (step.done) {
            return
        }
        run();
    }) 
}

run();