import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

function Body(){
    return(
        <Header/>
    );
}

function Header(props) {
    return(
        <header>
            <h1>Webbutveckling 2</h1>
            <h3>Uppgift 4 - Variabler och beräkningar</h3>
        </header>
    );
}

ReactDOM.render(<Body/>, document.getElementById("root"));