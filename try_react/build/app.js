var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React from './index.js';
import { render } from './dom.js';
import Greetting from './components/Greeting.js';
var App = function (props) {
    return (React.createElement("div", { className: "app-container", style: {
            backgroundColor: 'red'
        } },
        React.createElement(Greetting, __assign({}, props))));
};
// console.log(App)
render(React.createElement(App, { title: 'world' }), document.body.querySelector('#app'));
// render((
//     <div><p>asas</p></div>
// ), document.body.querySelector('#app'))
//# sourceMappingURL=app.js.map