import React from "react";
import {Link, Router, withRouter} from "react-router-dom";

function SearchMain(params) {
    return(
        <main>
            <article>
                <h3>Din sökning: ""</h3>
                <Link to="/recipe">
                    <section></section>
                </Link>
                <Link to="/recipe">
                    <section></section>
                </Link>
                <Link to="/recipe">
                    <section></section>
                </Link>
                <Link to="/recipe">
                    <section></section>
                </Link>
                <Link to="/recipe">
                    <section></section>
                </Link>
                <Link to="/recipe">
                    <section></section>
                </Link>                
            </article>           
        </main>
    );
}

export default withRouter(SearchMain);