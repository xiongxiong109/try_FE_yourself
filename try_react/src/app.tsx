import React from './index.js'
import { render } from './dom.js'

interface IProps {
    title: string;
}

const App = (props: IProps) => {
    return (
        <div>
            <p>hello {props.title}</p>
        </div>
    )
}

// console.log(App)

render(<App title={'world'}/>, document.body.querySelector('#app'))

// render((
//     <div><p>asas</p></div>
// ), document.body.querySelector('#app'))