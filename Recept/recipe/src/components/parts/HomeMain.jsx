import React from "react";
import {Link, Router, withRouter} from "react-router-dom";
import food from "../images/ramen.jpg";

function HomeMain(params) {
    return(
        <main>
            <article>
                <h2>Senaste Recept</h2>
                <section>
                    <h3>Recept namn</h3>
                    <img src={food}/>
                </section>
                <section>
                    <h3>Recept namn</h3>
                    <img src={food}/>
                </section>
                <section>
                    <h3>Recept namn</h3>
                    <img src={food}/>
                </section>
                <section>
                    <h3>Recept namn</h3>
                    <img src={food}/>
                </section>
                <section>
                    <h3>Recept namn</h3>
                    <img src={food}/>
                </section>
                <section>
                    <h3>Recept namn</h3>
                    <img src={food}/>
                </section>
            </article>
            <article>
                <h2>Populära Recept</h2>                
                <section>
                    <h3>Recept namn</h3>
                    <img src={food}/>
                </section>
                <section>
                    <h3>Recept namn</h3>
                    <img src={food}/>
                </section>
                <section>
                    <h3>Recept namn</h3>
                    <img src={food}/>
                </section>
                <section>
                    <h3>Recept namn</h3>
                    <img src={food}/>
                </section>                            
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