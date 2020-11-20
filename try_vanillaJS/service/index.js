// 实现一个极简的静态服务器
const http = require('http')
// const http2 = require('http2')
const fs = require('fs')
const url = require('url')
const path = require('path')

function createServer(port = 8080) {
    const basePath = process.cwd();
    const server = http.createServer();

    server.on('request', (req, res) => {
        // 解析请求的
        const urlInfo = url.parse(req.url);
        let urlPath = urlInfo.pathname; // urlInfo.path 会携带query参数
        // 媒体资源相关信息
        let mediaInfo = {};

        // 尝试获取文件
        // 文件带后缀名
        if (/\.css$/.test(urlPath)) {
            res.setHeader('Content-Type', 'text/css; charset=utf-8');
        }

        if (/image/.test(req.headers['accept'])) {
            mediaInfo.isImg = true;
            const imgExt = /\.(\w+)$/.exec(urlPath);
            if (imgExt) {
                res.setHeader('Content-Type', `image/${imgExt[1]};charset=utf-8`)   
            }
        }
        
        if (!/\.\w+$/.test(urlPath)) {
            urlPath = 
                // 以 / 结尾, 表示默认Index
                /\/$/.test(urlPath)
                    ?  urlPath + 'index.html'
                    :  urlPath + '.html'
        }

        // sendStaticFile(urlPath)
        // console.log(urlPath)
        // 查看文件是否存在
        const filePath = path.join(basePath, urlPath);
        const isExist = fs.existsSync(filePath);
        if (!isExist) {
            res.statusCode = 404;
            res.end(`${filePath} not found`);
        } else {
            const fileInfo = 
                mediaInfo.isImg
                // 图片要用二进制流发送
                ? Buffer.from(fs.readFileSync(filePath))
                : fs.readFileSync(filePath, { encoding: 'utf8' })
            // console.log(fileInfo)
            res.end(fileInfo)
        }
    })

    server.listen(port, () => {
        console.log(`server is running at ${port}`)
    })
}

module.exports = createServer