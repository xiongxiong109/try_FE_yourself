// 尝试理解与使用worker_threads
/**
 * worker_threads允许并行执行js线程
 * CPU密集型(大量计算, 视频高清解码等)
 * I/O密集型(硬盘读写/网络I/O)
 */

const { Worker, isMainThread } = require('worker_threads')
const path = require('path')

// console.log(isMainThread)

// 直接通过node ./main 启动，是主线程， 通过new Worker启动的话，就是工作线程了
if (isMainThread) {
    // 启动工作线程
    const worker = new Worker(path.resolve(__dirname, 'worker.js'), {
        workerData: {
            title: 'hello world'
        }
    })

    worker.on('message', info => {
        console.log('get worker info')
        console.log(info)
    })

    console.log('loading...')
}