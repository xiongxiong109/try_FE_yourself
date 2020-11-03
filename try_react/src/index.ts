/**
 * const dom = () => <div>hello world</div>
 * var div = React.createElement("div", {
        className: "header"
 *  }, "hello jirengu");
 */

/**
 * 1. 支持jsx转换
 * 2. 支持props
 * 3. innerText
 */

export const REACT_ELEMENT_TYPE = Symbol('React_Element');

const React = {
    createElement
}

/**
 * createElement 只是创建了一个virtual dom object
 * 真正创建元素，是通过react-dom方法去render
 * @param tag 
 * @param attrs 
 * @param children 
 */
function createElement(tag: string, attrs: any, ...children: any) {
    // fix jsx
    if (children instanceof Array && children.length) {
        children.forEach((item, idx) => {
            if (typeof item == 'number') {
                children[idx] = '' + item
            }
        })
    }
    return {
        $$typeof: REACT_ELEMENT_TYPE,
        tag,
        attrs,
        children
    }
}

export default React