/**
 * 使用工作线程下载图片,
 * 实现
 * https://github.com/xiongxiong109/algorithm_study/blob/master/py/basic/web.py
 * 的功能
 */
const fs = require('fs')
const path = require('path')
const Worker = require('worker_threads')
const http = require('http')
const querystring = require('querystring')

class FetchApi {
    constructor() {
        this.baseUrl = 'http://api.tianapi.com/meinv/index'
        this.initKey();
    }
    // 读取初始化key
    initKey() {
        const key = fs.readFileSync(path.resolve(__dirname, '..', '__temp', 'key'))
        // 二进制
        // console.log(key)
        // string
        this.key = key.toString();
    }
    // 请求接口，下载资源
    fetch() {

        const postData = querystring.stringify({
            'rand': 1,
            'num': 4,
            'key': this.key
        })

        const request = http.request(this.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }, res => {

            let chunk = '';

            res.on('data', data => {
                chunk += data
            })

            res.on('end', () => this.handleResponseData(chunk))

            res.on('error', err => {
                console.log(err)
            })
        })

        // 写入数据
        request.write(postData);

        request.end();

    }

    handleResponseData(data) {
        const rst = JSON.parse(data)
        console.log(rst['newslist'])
    }
}

// 如果是主线程, 初始化下载类
if (Worker.isMainThread) {
    const fetcher = new FetchApi();
    fetcher.fetch()
}