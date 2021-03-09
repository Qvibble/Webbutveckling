import React from "react";
import {Link, Router, withRouter} from "react-router-dom";

class UserMain extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        /* Om användaren inte är inloggad, skicka användaren till logga in sidan */
        if(sessionStorage.getItem("username") === null){
            window.location.replace("/login");
        }
    }

    render(){
        return(
            <main>
                <article>
                    <h3>Gillade Recept</h3>
                    <section></section>
                    <section></section>
                    <section></section>
                    <section></section>
                </article>
                <article>
                    <h3>Mina Recept</h3>                
                    <section></section>
                    <section></section>
                    <section></section>
                    <section></section>
    
                </article>
                <form>
                    <Link to="/create">
                        <input type="submit" value="Skapa recept"/>
                    </Link>
                </form>
            </main>
        );
    }
}

export default withRouter(UserMain);