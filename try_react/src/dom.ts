/**
 * render(<App />, document.querySelector('#app'))
 */
// import { REACT_ELEMENT_TYPE } from './index'

function render(vDOM, container) {
    let node: HTMLElement | Text;
    if (typeof vDOM === 'string') {
        node = document.createTextNode(vDOM)
    }
    if (typeof vDOM === 'object') {
        // 对组件树进行渲染
        while (typeof vDOM.tag == 'function') {
            vDOM = vDOM.tag(vDOM.attrs);
        }
        // 对原生dom进行渲染
        node = document.createElement(vDOM.tag);
        // 对子节点也进行render操作
        vDOM.children.forEach(childDOM => render(childDOM, node))
    }
    if (node != undefined) {
        setAttribute(node, vDOM.attrs)
        node && container.appendChild(node)
    }
}

// 给元素绑定属性
function setAttribute(dom, attrs) {
    // 非文本节点
    if (dom.nodeType == 1) {
        for (const item in attrs) {
            if (item == 'style') { // style=xxx
                for (const st in attrs[item]) {
                    dom.style[st] = attrs[item][st]
                }
            } else if (/^on/.test(item)) { // onClick
                // event proxy, 这里实际应该是一个全局的事件绑定机制
                // 简单地绑定一下事件
                const ev = item.toLocaleLowerCase();
                dom[ev] = attrs[item];
            } else {
                // 这样是可以将className直接转为dom class的
                dom[item] = attrs[item]
            }
        }
    }
}

const ReactDOM = {

    // 重新渲染节点树
    rerender() {

        this.container.innerHTML = '';

        // 初始化自定义事件
        this.ev = document.createEvent('HTMLEvents');
        this.ev.initEvent('update');

        // dispatchEvent需要传入的是一个事件对象
        this.container.dispatchEvent(this.ev)
    },

    render(vDOM, container) {
        this.container = container;
        this.rootDOM = vDOM;
        // 监听自定义update事件, 现在的实现是全局更新, 事件是单个dom绑定，这些都是需要优化的
        this.container.addEventListener('update', () => this.updateDOM())
        this.updateDOM();
    },

    updateDOM() {
        render(this.rootDOM, this.container);
    }
}

export default ReactDOM