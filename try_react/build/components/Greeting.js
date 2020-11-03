// gretting组件
import React from '../index.js';
import { useState } from '../hook.js';
function Greetting(props) {
    var _a = useState(0), count = _a[0], setCount = _a[1];
    console.log(count);
    return (React.createElement("div", { className: "greet" },
        React.createElement("p", null,
            "Hello, ",
            props.title),
        React.createElement("p", null,
            "curCounter: ",
            count),
        React.createElement("p", null, '<em>asasas</em>'),
        React.createElement("button", { onClick: function () { return setCount(count + 1); } }, "count++")));
}
export default Greetting;
//# sourceMappingURL=Greeting.js.map