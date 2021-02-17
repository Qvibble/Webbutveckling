import React from "react"
import {Link, withRouter} from "react-router-dom";

//Sets is class="App" id to top
function setAppIdTop(){
    let elem = document.querySelectorAll("div")[1];
    elem.setAttribute("id", "top");

    //Saves the id in sessionStorage to keep track on what page the user is on
    //Otherwise the id resets if the page is reloaded
    sessionStorage.setItem("id", "top");
}

//Sets is class="App" id to side
function setAppIdSide(){
    let elem = document.querySelectorAll("div")[1];
    elem.setAttribute("id", "side");

    //Saves the id in sessionStorage to keep track on what page the user is on
    //Otherwise the id resets if the page is reloaded
    sessionStorage.setItem("id", "side");
}

function Nav(){
    return(
        <nav>
            <li>
                <Link to="/" onClick={setAppIdTop}>
                    <ul>Startsida</ul>                
                </Link>
                <Link to="/2" onClick={setAppIdSide}>
                    <ul>Sida 2</ul>
                </Link>
                <Link to="/3" onClick={setAppIdSide}>
                    <ul>Sida 3</ul>
                </Link>
            </li>
        </nav>
    );
}

export default withRouter(Nav);