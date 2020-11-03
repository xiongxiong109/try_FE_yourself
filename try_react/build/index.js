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
export var REACT_ELEMENT_TYPE = Symbol('React_Element');
var React = {
    createElement: createElement
};
/**
 * createElement 只是创建了一个virtual dom object
 * 真正创建元素，是通过react-dom方法去render
 * @param tag
 * @param attrs
 * @param children
 */
function createElement(tag, attrs) {
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
    // fix jsx
    if (children instanceof Array && children.length) {
        children.forEach(function (item, idx) {
            if (typeof item == 'number') {
                children[idx] = '' + item;
            }
        });
    }
    return {
        $$typeof: REACT_ELEMENT_TYPE,
        tag: tag,
        attrs: attrs,
        children: children
    };
}
export default React;
//# sourceMappingURL=index.js.map