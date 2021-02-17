import React from "react";
import {Link, Router, withRouter} from "react-router-dom";

function UserMain(params) {
    return(
        <main>
            <article>
                <h3>Gillade Recept</h3>
                <section></section>
                <section></section>
                <section></section>
                <section></section>
            </article>
            <article>
                <h3>Mina Recept</h3>                
                <section></section>
                <section></section>
                <section></section>
                <section></section>

            </article>
            <form>
                <Link to="/create">
                    <input type="submit" value="Skapa recept"/>
                </Link>
            </form>
        </main>
    );
}

export default withRouter(UserMain);