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
        while (typeof vDOM.tag == 'function') {
            vDOM = vDOM.tag(vDOM.attrs);
        }
        node = document.createElement(vDOM.tag);
        // 对子节点也进行render操作
        vDOM.children.forEach(function (childDOM) { return render(childDOM, node); });
    }
    node && container.appendChild(node);
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