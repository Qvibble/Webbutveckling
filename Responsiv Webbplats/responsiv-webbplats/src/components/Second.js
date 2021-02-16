import React from "react";
import testImg from"../image.png";

//Example text
var imgText = "Det är ett välkänt faktum att läsare distraheras av läsbar text på en sida när man skall studera layouten. Poängen med Lorem Ipsum är att det ger ett normalt ordflöde, till skillnad från Text här, Text här, och ger intryck av att vara läsbar text. Många publiseringprogram och webbutvecklare använder Lorem Ipsum som test-text, och en sökning efter Lorem Ipsum avslöjar många webbsidor under uteckling. Olika versioner har dykt upp under åren, ibland av olyckshändelse, ibland med flit (mer eller mindre humoristiska).";

//Holds the articles 
var articles = [];

//Amount of articles to be created
var amount = 5;

//Creates the articles
for(let i = 0; i < amount; i++){
    articles.push(<Article id={i} text={imgText} img={testImg}/>);
}

function Second(){
    return(
        <main id="second">
            <section>
                {articles}
            </section>
        </main>
    );
}

function Article(props){
    return(
        <article id={props.id}>
            <section>
                <img src={props.img} alt={props.img}/>
                <h2>Bildtext-{props.id}</h2>
                <p>{props.text}</p>
            </section>
        </article>        
    );
}


export default Second;