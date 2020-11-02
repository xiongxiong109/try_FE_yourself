const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()

// 静态资源目录
app.use('/static/', express.static(path.resolve(__dirname, 'static')))

app.get('/sw.js', (req, res) => {
    res.setHeader('Content-Type', 'text/javascript; charset=utf-8')
    const sw = fs.readFileSync(path.resolve(__dirname, 'sw.js'), "utf-8");
    res.end(sw)
})

// 首页
app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    const index = fs.readFileSync(path.resolve(__dirname, 'index.html'), "utf-8")
    res.end(index)
})

app.listen(3000, () => {
    console.log('server start at 3000')
})