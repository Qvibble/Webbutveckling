import React from "react";

function Second(props){
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

export default Second;