import React from "react";

function Start(props){
    return(
        <main id="start">
            <article>
                <section>
                    <img src={props.img} alt={props.img}/>
                </section>
                <p>{props.text}</p>
            </article>
        </main>
    );
}

export default Start;