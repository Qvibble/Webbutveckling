import React from "react";
import {Link, Router, withRouter} from "react-router-dom";

class LoginForm extends React.Component{
    constructor(props){
        super(props);
    }
    
    login(event){    
        event.preventDefault();
        
        //Referens till formuläret
        let loginForm = document.querySelector("form");
        //Referens till error meddelandet som ligger under fomulärets fält
        let errorMessage = document.getElementById("error");

        //Namn + lösenord skickas som Basic Authorization till backend
        let encrypted = window.btoa(loginForm.name.value + ":" + loginForm.password.value);
    
        fetch("http://localhost:8080/Recipe/api/user", {
            method: "GET",
            mode: 'cors',
            headers: {
                "Authorization": "Basic " + encrypted
            },
        }).then((response) => {
            /* Om det inte gick att logga in */
            if(response.status === 401){
                errorMessage.innerHTML = "Fel användarnamn eller lösenord";
            }
            
            /* Om det gick att logga in */
            if(response.ok){
                sessionStorage.setItem("username", loginForm.name.value);
                window.location.replace("/user");
            }
    
            return response.json();
        }).catch(err => {
            console.error(err);
        });
    }

    componentDidMount(){
        console.log("as");
        /* Om användaren redan är inloggad, skicka användaren till sin sida */
        if(sessionStorage.getItem("username") !== null){
            window.location.replace("/user");
        }
    }

    render(){
        return(
            <form method="post" onSubmit={this.login}>
                <fieldset>
                    <legend>Logga in</legend>
                    <label htmlFor="name">Användarnamn</label>
                    <input type="text" id="name" name="name"/><br/>
                    <label htmlFor="password">Lösenord</label>
                    <input type="password" id="password" name="password"/><br/>
                    <p id="error"></p>
                    <input type="submit" name="submitBtn" value="Logga in" />
                    <Link to="/register">
                        Har du inget konto? Klicka här för att skapa ett
                    </Link>
                </fieldset>
            </form>
        );
    }
}

export default withRouter(LoginForm);