import React from "react";

function Third(props){
    return(
        <main>
            <article>
                <section>
                    <img src={props.img} alt={props.img}/>
                </section>
                <p>{props.text}</p>
            </article>
        </main>
    );
}

export default Third;