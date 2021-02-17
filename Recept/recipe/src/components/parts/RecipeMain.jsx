import React from "react";
import {ulnk, Router, withRouter} from "react-router-dom";

function RecipeMain(params) {
    return(
        <main>
            <h1>Recept namn ------------</h1>
            <section>
                <h3>5000</h3>            
                <img/>
            </section>
            <section>
                <img/>
            </section>
            <h2>Ingredienser:</h2>          
            <ul>
                <li>majs</li>
                <li>majs</li>
                <li>majs</li>
                <li>majs</li>
            </ul>
            <h2>Instruktioner:</h2>
            <ul>
                <li>Steg 1</li>
                <li>Steg 2</li>
                <li>Steg 3</li>
                <li>Steg 4</li>
                <li>Steg 5</li>
                <li>Steg 6</li>
            </ul>
        </main>
    );
}

export default withRouter(RecipeMain);