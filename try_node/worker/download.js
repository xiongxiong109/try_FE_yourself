/**
 * 使用工作线程下载图片,
 * 实现
 * https://github.com/xiongxiong109/algorithm_study/blob/master/py/basic/web.py
 * 的功能
 */
const fs = require('fs')
const path = require('path')
const { Worker, isMainThread } = require('worker_threads')
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
            'num': 8,
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
        const list = rst.newslist || [];
        if (list.length) {
            list.forEach(item => {
                // 启动工作线程下载图片
                new Worker(__filename, {
                    argv: [
                        item.title,
                        item.picUrl
                    ]
                })
            })
        }
    }
}

// 图片下载
function downloadImg(title, picUrl) {
    // 处理名称空格
    title = title.replace(/\s+/g, '_')
    let ext = picUrl.match(/\.(jpe?g|png|gif|webp)$/)
    ext = ext ? ext[0] : '.jpg';
    //图片名称
    const picNm = `${title}${ext}`;
    // 下载图片
    const req = http.request(picUrl, {
        method: 'GET'
    }, res => {
        console.log(`download ${picUrl}`)
        // 写二进制文件
        res.setEncoding('binary');
        // let chunk = ''

        // 尝试使用pipe和createStream实现
        res.pipe(fs.createWriteStream(
            path.resolve(__dirname, '..', '__temp', picNm),
            {
                encoding: 'binary'
            }
        ))

        // res.on('data', data => chunk += data)
        // res.on('end', () => {
        //     console.log('download complete')
        //     // 写文件
        //     fs.writeFile(path.resolve(__dirname, '..', '__temp', picNm), chunk, {
        //         encoding: 'binary'
        //     }, err => {
        //             if (err) {
        //                 console.log(err)
        //             }
        //         }
        //     )
        // })
        
    })

    req.end();
}

if (isMainThread) { // 如果是主线程, 初始化下载类
    const fetcher = new FetchApi();
    fetcher.fetch()
} else { // 下载线程
    const [title, picUrl] = [process.argv[2], process.argv[3]]
    downloadImg(title, picUrl)
}