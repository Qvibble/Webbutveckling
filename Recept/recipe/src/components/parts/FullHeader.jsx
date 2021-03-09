import React from "react";
import {Link, withRouter} from "react-router-dom";

import logo from "../images/alogo.png";
import SearchForm from "./SearchForm";
import Categories from "./Categories";

class Header extends React.Component {
    constructor(props){
        super(props);

        this.buttonText = "asas";
    }

    render(){
        let buttonText = "";
        let buttonLink = "";

        /* Om inloggad/utloggad, byt knapp text och länk */
        if(sessionStorage.getItem("username") !== null){
            buttonText = "Logga ut";
            buttonLink = "/";
        }else{
            buttonText = "Logga in";
            buttonLink = "/login";
        }

        /**
         * Om användaren är inloggad så tas användaren bort från session storage
         * och skickas till första sidan. Annars så tas användaren till logga in sidan.
         * 
         * @param {*} event 
         */
        function changeLocation(event){
            event.preventDefault();

            /* Om inloggad, logga ut användaren */
            if(buttonText === "Logga ut"){
                sessionStorage.removeItem("username");
            }

            window.location.replace(buttonLink)
        }

        return(
            <header>
                <section>
                    <Link to="/">
                        <img src={logo}/>
                    </Link>
                </section>
                <form method="post" onSubmit={changeLocation}>
                    <input type="submit" value={buttonText}/>
                </form>                
                <SearchForm/>
                <Categories/>
            </header>
        );
    }
}

export default withRouter(Header);