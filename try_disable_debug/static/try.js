// 静态资源js

(function debug() {
    debugger
    setTimeout(debug, 100)
})()

function showList() {
    document.write('可以使用无限循环的debugger来打断点, 阻止调试');
    // 解决办法： 通过fiddler抓包替换文件, 移除debugger代码
}

showList();