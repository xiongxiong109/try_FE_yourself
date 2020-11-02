/**
 * http2 server的实现
 * http 与 http2的区别
 * http: 无状态, 基于TCP, 每次与服务器的交互, 都需要重开一个链接
 * 会有HOLB(head of line blocking) 线头阻塞问题
 * http2: 
 * 解决线头阻塞问题，实现多路复用
 * 二进制分帧(不再以文本形式传输)
 * 头部压缩HPACK
 * https://http2.akamai.com/demo
 * 允许一个单一的http链接发起多重的请求-响应信息
 */

// 搭建http2环境，需要生成证书
// 生成 privkey.pem
// openssl genrsa -out privkey.pem 1024/2038
// 生成server.pem
// openssl req -new -x509 -key privkey.pem -out server.pem -days 365
// 
const fs = require('fs')
const http2 = require('http2')

// 暂时只能创建secure的服务 -- 这意味着其实需要满足https的协议(这在mac上会有点难搞)
// 需要按照这篇文章信任证书 https://segmentfault.com/a/1190000007990972

const server = http2.createSecureServer({
    key: fs.readFileSync('privkey.pem'),
    cert: fs.readFileSync('server.pem')
})

server.on('request', (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end('hello http2')
})

server.listen(8080);