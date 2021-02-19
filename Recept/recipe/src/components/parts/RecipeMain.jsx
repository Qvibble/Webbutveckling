import React from "react";
import food from "../images/ramen.jpg";
import heart from "../images/heart.png";

function RecipeMain(params) {
    return(
        <main>
            <h1>Recept namn ------------</h1>
            <section>
                <h3>5.0K</h3>            
                <img src={heart}/>
            </section>
            <img src={food}/>
            <h2>Ingredienser:</h2>          
            <ul>
                <li>majs</li>
                <li>majs</li>
                <li>majs</li>
                <li>majs</li>
            </ul>
            <h2>Instruktioner:</h2>
            <ol>
                <li>Steg 1</li>
                <li>Steg 2</li>
                <li>Steg 3</li>
                <li>Steg 4</li>
                <li>Steg 5</li>
                <li>Steg 6</li>
            </ol>
        </main>
    );
}

export default RecipeMain;