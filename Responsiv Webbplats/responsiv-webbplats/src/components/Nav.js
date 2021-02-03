import React from "react"
import {Link, withRouter} from "react-router-dom";

function Nav(){
    return(
        <nav>
            <li>
                <Link to="/">
                    <ul>Startsida</ul>                
                </Link>
                <Link to="/2">
                    <ul>Sida 2</ul>
                </Link>
                <Link to="/3">
                    <ul>Sida 3</ul>
                </Link>
            </li>
        </nav>
    );
}

export default withRouter(Nav);