// gretting组件
import React from '../index.js';
function Greetting(props) {
    return (React.createElement("div", { className: "greet" },
        React.createElement("p", null,
            "Hello, ",
            props.title)));
}
export default Greetting;
//# sourceMappingURL=Greeting.js.map