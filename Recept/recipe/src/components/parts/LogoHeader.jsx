import React from "react";
import {Link, withRouter} from "react-router-dom";

import logo from "../images/alogo.png";

function Header(props) {
    return(
        <header>
            <section>
                <Link to="/">
                    <img src={logo}/>
                </Link>
            </section>
        </header>
    );
}

export default withRouter(Header);