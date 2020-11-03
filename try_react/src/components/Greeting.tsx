// gretting组件
import React from '../index.js'
import { useState } from '../hook.js'

interface IProps {
    title: string;
}

function Greetting(props: IProps) {

    const [count, setCount] = useState(0);

    console.log(count)

    return (
        <div className="greet">
            <p>Hello, {props.title}</p>
            <p>curCounter: {count}</p>
            <p>{'<em>asasas</em>'}</p>
            <button onClick={() => setCount(count + 1)}>count++</button>
        </div>
    )
}

export default Greetting