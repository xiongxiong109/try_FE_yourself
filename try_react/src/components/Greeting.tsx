// gretting组件
import React from '../index.js'

interface IProps {
    title: string;
}

function Greetting(props: IProps) {
    return (
        <div className="greet">
            <p>Hello, {props.title}</p>
        </div>
    )
}

export default Greetting