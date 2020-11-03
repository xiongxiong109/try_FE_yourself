/**
 * render(<App />, document.querySelector('#app'))
 */
import { REACT_ELEMENT_TYPE } from './index'

function render(vDOM, container) {
    let node: HTMLElement | Text;
    if (typeof vDOM === 'string') {
        node = document.createTextNode(vDOM)
    }
    if (typeof vDOM === 'object') {
        while (typeof vDOM.tag == 'function') {
            vDOM = vDOM.tag(vDOM.attrs);
        }
        node = document.createElement(vDOM.tag);
        // 对子节点也进行render操作
        vDOM.children.forEach(childDOM => render(childDOM, node))
    }
    node && container.appendChild(node)
}

const ReactDOM = {
    render(vDOM, container) {
        container.innerHTML = '';
        render(vDOM, container)
    }
}

export default ReactDOM

export {
    render
}