import React from "react";

var articles = "";

createArticles(3);

function Second(props){
    return(
        <main id="second">
            {articles}
        </main>
    );
}

function createArticles(amount){
    for(let i = 0; i < amount; i++){
        articles += <Article/>
    }
}

function Article(props){
    <article>
        <section>
            <img src={props.img} alt={props.img}/>
            <h2>Bildtext</h2>
            <p>{props.text}</p>
        </section>
    </article>
}

export default Second;