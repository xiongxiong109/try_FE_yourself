// 使用 http 模块搭建 http server 服务器
const http = require('http')

const server = http.createServer(this);

// request事件是最原始的事件, 实现最基础的http server
server.on('request', (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end(`hello http <img src="https://localhost:8080"/> server, method: ${req.method}`);
})

// 处理error handle
server.on('clientError', (err, socket) => {
    socket.end(err)
})

server.listen(8888, () => {
    console.log('server is running on port 8888')
})