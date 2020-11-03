const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer()

server.on('request', (req, res) => {
    if (/build/.test(req.url)) {
        res.setHeader('Content-Type', 'text/javascript; charset=utf-8');
        res.end(fs.readFileSync(path.join(__dirname, req.url)))
    } else {
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end(fs.readFileSync('index.html'))
    }
})

server.listen(8080)