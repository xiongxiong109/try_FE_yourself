import React from './index.js';
import { render } from './dom.js';
var App = function (props) {
    return (React.createElement("div", null,
        React.createElement("p", null,
            "hello ",
            props.title)));
};
// console.log(App)
render(React.createElement(App, { title: 'world' }), document.body.querySelector('#app'));
// render((
//     <div><p>asas</p></div>
// ), document.body.querySelector('#app'))
//# sourceMappingURL=app.js.map