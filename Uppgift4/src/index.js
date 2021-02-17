import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

function Body(){
    return(
        <div>
            <Header/>
            <Main/>
            <Footer/>
        </div>
    );
}

function Header() {
    return(
        <header>
            <h1>Webbutveckling 2</h1>
            <h3>Uppgift 4 - Variabler och beräkningar</h3>
        </header>
    );
}

function Main() {
    return(
        <main>
            <h2>Beräkning av area och längder</h2>
		    <img src="pics/shapes.png" alt="Form för rektangel, ellips och triangel"/>
		    <p>Ange längd och bredd för ytan:</p>
		    <Form/>
		    <hr/>
		    <h4>Resultat</h4>
		    <section id="result"></section>
        </main>
    );
}

function Form() {
    return(
        <form id="inputForm">
			<label htmlFor="input1">Längd:</label><p><input type="text" id="input1"/> meter</p>
			<label htmlFor="input2">Bredd:</label><p><input type="text" id="input2"/> meter</p>
			<button type="button" id="rectBtn">Kör programmet för rektangel</button>
			<button type="button" id="ellipBtn">Kör programmet för ellips</button>
			<button type="button" id="triBtn">Kör programmet triangel</button>
			<button type="button" id="conBtn">Kör programmet längd konvertering</button>
        </form>
    );
}

function Footer() {
    return(
        <footer>
		    <p>Uppgift 4</p>
	    </footer>
    );
}

ReactDOM.render(<Body/>, document.getElementById("root"));