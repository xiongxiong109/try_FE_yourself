import React from './index.js';
import { render } from './dom.js';
var App = function () {
    return (<div>
            <p>Hello World</p>
            <button>counter</button>
        </div>);
};
render(<App />, document.body.querySelector('#app'));
//# sourceMappingURL=app.jsx.map