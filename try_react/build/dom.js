/**
 * render(<App />, document.querySelector('#app'))
 */
// import { REACT_ELEMENT_TYPE } from './index'
function render(vDOM, container) {
    var node;
    if (typeof vDOM === 'string') {
        node = document.createTextNode(vDOM);
    }
    if (typeof vDOM === 'object') {
        // 对组件树进行渲染
        while (typeof vDOM.tag == 'function') {
            vDOM = vDOM.tag(vDOM.attrs);
        }
        // 对原生dom进行渲染
        node = document.createElement(vDOM.tag);
        // 对子节点也进行render操作
        vDOM.children.forEach(function (childDOM) { return render(childDOM, node); });
    }
    setAttribute(node, vDOM.attrs);
    node && container.appendChild(node);
}
// 给元素绑定属性
function setAttribute(dom, attrs) {
    // 非文本节点
    if (dom.nodeType == 1) {
        for (var item in attrs) {
            if (item == 'style') { // style=xxx
                for (var st in attrs[item]) {
                    dom.style[st] = attrs[item][st];
                }
            }
            else if (/^on/.test(item)) { // onClick
                // event proxy
            }
            else {
                // 这样是可以将className直接转为dom class的
                dom[item] = attrs[item];
            }
        }
    }
}
var ReactDOM = {
    render: function (vDOM, container) {
        container.innerHTML = '';
        render(vDOM, container);
    }
};
export default ReactDOM;
export { render };
//# sourceMappingURL=dom.js.map