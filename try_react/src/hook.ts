import ReactDOM from "./dom.js";

// 需要形成一个闭包，或者有一个地方缓存这个值，不然重新render App 这个函数的时候，initialValue也会给重置
let val;

export function useState(initialValue) {
    // 当这个值被初始化一次之后，就会被缓存下来
    val = val == undefined ? initialValue : val;
    function dispatcher(newValue) {
        val = newValue;
        // 应该需要有一个机制，来更新vd tree, 以触发diff, rerender dom
        ReactDOM.rerender();
    }

    return [ val, dispatcher ]
}