// http://localhost:8080/page?a=234&b=erer&c=111&d=asas#hash
function querySearch(url = '') {
    let str = url.split('?')[1]
    const queryObj = {}

    str = str.replace(/#\w+$/, '')
    // 方法1: 循环加正则替换
    // const strArr = str.split('&');
    // strArr.map(item => {
    //     item = item.split('=');
    //     queryObj[item[0]] = item.length > 1 ? item[1] : ''
    // })

    // 方法2: 是否可以利用str.replace第二个参数为函数?
    str.replace(/([a-zA-Z]+)=([^&]+)?/g, function(matched, $1, $2) {
        queryObj[$1] = $2 || '';
    })

    return queryObj
}


// const query = querySearch(window.location.search)

// console.log(query)

// xss与攻击
// <img src="">
const content = '<img src="' + decodeURIComponent(querySearch(window.location.search).url) + '"/>';
// 图片攻击的方式，是需要通过onerror事件来触发的
// const content = '<img src=" ' + '" onerror="alert(1)"'  + ' " />'
// url=" onerror="alert(1)"
// console.log(content)
// 试图通过拼script标签的方式, 但是竟然不行
// url=%20%20/><script>alert(1)</script>
// 惊! innerHTML中的<script>竟然不执行, 这是一些常识性的错误了, script以innerHTML的方式赋值给了div, js解释器不会再执行它!!, 所以只能用onerror来实现

// error
// document.querySelector('#j_xss').innerHTML = content;
// document.querySelector('#j_xss').innerText = content;
const oImg = document.createElement('img');
oImg.src = decodeURIComponent(querySearch(window.location.search).url);
document.querySelector('#j_xss').appendChild(oImg);