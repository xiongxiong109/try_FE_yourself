const https = require('https');
const path = require('path')
const fs = require('fs')

const options = {
    key: fs.readFileSync(path.resolve(__dirname, 'privkey.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, 'server.pem'))
}

const server = https.createServer(options)

// 单独使用https模块的话 仍然只能实现http1, 使用http2模块，配合secureServer, 就可以实现 https + h2的访问了
server.on('request', (req, res) => {
    res.end('hello https')
})

server.listen(8800, () => {
    console.log('https server is running on 8800')
})