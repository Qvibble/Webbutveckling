import React from "react";
import {Link, Router, withRouter} from "react-router-dom";

function HomeMain(params) {
    return(
        <main>
            <article>
                <h3>Senaste Recept</h3>
                <section></section>
                <section></section>
                <section></section>
                <section></section>
            </article>
            <article>
                <h3>Populära Recept</h3>                
                <section></section>
                <section></section>
                <section></section>
                <section></section>

            </article>
            <form>
                <Link to="search">
                    <input type="submit" value="Se alla recept"/>
                </Link>
            </form>
        </main>
    );
}

export default withRouter(HomeMain);