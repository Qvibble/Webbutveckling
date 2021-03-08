import React from "react";
import {Link, Router, withRouter} from "react-router-dom";

class LoginForm extends React.Component{
    constructor(props){
        super(props);
    }
    
    login(event){
        
        event.preventDefault();
        let errorMessage = document.getElementById("error");
        let loginForm = document.querySelector("form");
        console.log(loginForm);
        //Namn + lösenord skickas som Basic Authorization till backend
        let encrypted = window.btoa(loginForm.name.value + ":" + loginForm.password.value);
    
        fetch("http://localhost:8080/Recipe/api/user", {
            method: "GET",
            mode: 'cors',
            headers: {
                "Authorization": "Basic " + encrypted
            },
        }).then((response) => {
            if(response.status === 401){
                errorMessage.style.color = "red";
                errorMessage.innerHTML = "Fel användarnamn eller lösenord";
            }
    
            if(response.ok){
                window.location.replace("/user");
            }
    
            return response.json();
        }).catch(err => {
            console.error(err);
        });
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
                    <input type="submit" value="Logga in" />
                    <Link to="/register">
                        Har du inget konto? Klicka här för att skapa ett
                    </Link>
                </fieldset>
            </form>
        );
    }
}

export default withRouter(LoginForm);