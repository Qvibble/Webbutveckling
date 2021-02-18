import React from "react";
import {Link, withRouter} from "react-router-dom";

function SearchForm(props) {
    return(
        <form>
            <input type="text" placeholder="Namn på recept..."></input>
            <Link to="/search">
                <input type="submit" value="Sök"/>
            </Link>
        </form>
    );
}

export default withRouter(SearchForm);