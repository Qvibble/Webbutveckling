import React from "react";

function Third(props){
    return(
        <main id="third">
            <article>                
                <p>{props.text}</p>
            </article>
            <aside>
                <p>{props.aside}</p>
            </aside>
        </main>
    );
}

export default Third;