const { isMainThread, workerData, parentPort } = require('worker_threads')

if (isMainThread) { // 以主线程启动
    console.log('main thread')
} else { // 以工作线程启动
    console.log(workerData)
    // console.log(parentPort)
    // 模拟大量运算
    setTimeout(() => {
        parentPort.postMessage({
            greeting: 'asasasas',
            data: workerData
        })
    }, 1e3)
}