import React from "react";
import {Link, Router, withRouter} from "react-router-dom";
import food from "../images/ramen.jpg";

function SearchMain(params) {
    return(
        <main>
            <article>
                <h2>Din sökning: ""</h2>
                <Link to="/recipe">
                    <section>
                        <h3>Recept namn</h3>
                        <img src={food}/>
                    </section>
                </Link>
                <Link to="/recipe">
                    <section>
                        <h3>Recept namn</h3>
                        <img src={food}/>
                    </section>
                </Link>
                <Link to="/recipe">
                    <section>
                        <h3>Recept namn</h3>
                        <img src={food}/>
                    </section>
                </Link>
                <Link to="/recipe">
                    <section>
                        <h3>Recept namn</h3>
                        <img src={food}/>
                    </section>
                </Link>
                <Link to="/recipe">
                    <section>
                        <h3>Recept namn</h3>
                        <img src={food}/>
                    </section>
                </Link>
                <Link to="/recipe">
                    <section>
                        <h3>Recept namn</h3>
                        <img src={food}/>
                    </section>
                </Link>                
            </article>           
        </main>
    );
}

export default withRouter(SearchMain);