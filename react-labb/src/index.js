import React from 'react';
import ReactDOM from 'react-dom';

function Headline(props){
    return <h1>{props.title}</h1>
}

ReactDOM.render(<Headline title="Hello World"/>, document.getElementById("root"));



function Box(props){
    return <div>
        <h1>{props.title}</h1>
        {props.message}
    </div>
}

ReactDOM.render(<Box message="Meddelnade" title="tittelaea"/>, document.getElementById("root"));

function ListItem(props) {
    return <li>
        <input type="checkbox"/>
        <span>{props.title}</span>
    </li>
}

ReactDOM.render(<ListItem title="cheaw"/>, document.getElementById("root"));

function List(props) {
    return <div>
        <h1>{props.title}</h1>
        <ul>
            <ListItem title="test1"/>
            <ListItem title="test2"/>
            <ListItem title="test3"/>
        </ul>
    </div>
}

ReactDOM.render(<List title="L*SITa"/>, document.getElementById("root"));

function Button(props){
    function test() {
        console.log("clicked");
    }

    return <button onClick={test}>{props.message}</button>
}

ReactDOM.render(<Button message="meddelande"/>, document.getElementById("root"));