import React from "react";
import {Link, withRouter} from "react-router-dom";

import logo from "../images/alogo.png";
import SearchForm from "./SearchForm";
import Categories from "./Categories";

function Header(props) {
    return(
        <header>
            <section>
                <Link to="/">
                    <img src={logo}/>
                </Link>
            </section>
            <form>
                <Link to="/login">
                    <input type="submit" value="Logga in"/>
                </Link>
            </form>
            <SearchForm/>
            <Categories/>
        </header>
    );
}

export default withRouter(Header);