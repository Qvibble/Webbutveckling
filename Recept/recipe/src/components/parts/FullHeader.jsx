import React from "react";
import {Link, withRouter} from "react-router-dom";

import logo from "../images/alogo.png";
import SearchForm from "./SearchForm";
import Categories from "./Categories";

class Header extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        if(sessionStorage.getItem("username") !== null){
            //Gör min sida knappen synlig
            document.getElementById("myBtn").style.display = "initial";
        }
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

        /**
         * Tar användaren till användarsidan
         */
        function goToUser(event){
            event.preventDefault();

            window.location.replace("/user")
        }

        return(
            <header>
                <section>
                    <Link to="/">
                        <img src={logo}/>
                    </Link>
                </section>
                <section>
                    <form method="post">
                        <input type="submit" value={buttonText} onClick={changeLocation}/>
                        <input type="submit" id="myBtn" value="Min sida" onClick={goToUser}/>
                    </form>                
                </section>
                <SearchForm/>
                <Categories/>
            </header>
        );
    }
}

export default withRouter(Header);