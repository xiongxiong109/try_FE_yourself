import React from './index.js'
import ReactDOM from './dom.js'
import Greetting from './components/Greeting.js'

interface IProps {
    title: string;
}

const App = (props: IProps) => {

    return (
        <div
            className="app-container"
            style={{
                backgroundColor: 'red'
            }}
        >
            <Greetting {...props}/>
        </div>
    )
}

// console.log(App)

ReactDOM.render(<App title={'world'}/>, document.body.querySelector('#app'))

// render((
//     <div><p>asas</p></div>
// ), document.body.querySelector('#app'))