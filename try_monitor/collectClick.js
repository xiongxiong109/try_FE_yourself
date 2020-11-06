// 捕获全局的点击事件

// dom contentLoad, 这一段如果放在body的内容前面，就会阻塞渲染进程
// async的脚本，加载完成后会立即执行, 不一定能拿到dom
// defer的脚本，会在DOMContentLoaded后执行，一定可以拿到
for (let i = 0; i < 500; i++) {
    document.querySelector('p').innerHTML = 'sync click';
}

document.addEventListener('click', function(ev) {
    collectClick(ev);
})

// 全局点击事件代理
function collectClick(ev) {
    let target = ev.target;
    console.log(target); // 点击的目标元素

    const nmInfo = analyseTarget(target);
    let domStack = '' + nmInfo;

    // nodeType == 9 : #document
    while(target.parentNode) {
        target = target.parentNode;
        if (target.nodeType != 9) {
            const nmInfo = analyseTarget(target);
            domStack = nmInfo + '/' + domStack;
        }
    }
    console.log(domStack)
}

function analyseTarget(target) {
    let nm = target.nodeName;
    if (target.id) {
        nm += '[@id="' + target.id + '"]';
    }
    return nm;
}

document.querySelector('#j_bar').addEventListener('click', stopPop);

// 如果阻止了事件冒泡，是否还能被全局捕获？
function stopPop(ev) {
    // console.log(ev)
    ev.stopPropagation();
    console.log('sss')
}