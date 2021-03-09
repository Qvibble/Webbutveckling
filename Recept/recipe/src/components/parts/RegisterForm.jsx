import React from "react";
import {Link, Router, withRouter} from "react-router-dom";

class RegisterForm extends React.Component{
    constructor(props){
        super(props);
    }

    register(event){
        event.preventDefault();

        //Referens till formuläret
        let registerForm = document.querySelector("form");
        //Referens till error meddelandet som ligger under fomulärets fält
        let errorMessage = document.getElementById("error");

        /* JSON fil som skickas till backend */
        let userData = {
            "username": registerForm.name.value,
            "password": btoa(registerForm.password.value),
            "mail": registerForm.mail.value
        }

        fetch("http://localhost:8080/Recipe/api/user", {
            method: "POST",
            mode: 'cors',
            headers: {
                "Content-type": "text/plain"
            },
            body: JSON.stringify(userData)
        }).then((response) => {
            /* Om det inte gick att skapa kontot */
            if(response.status === 400){
                errorMessage.style.color = "red";
                errorMessage.innerHTML = "Det gick inte att skapa kontot";
            }
    
            /* Om det gick att skapa kontot */
            if(response.ok){
                sessionStorage.setItem("username", registerForm.name.value);
                window.location.replace("/user");
            }
    
            return response.json();
        }).catch(err => {
            console.error(err);
        });
    }

    /**
     * Kollar alla fält med hjälp av reguljära uttryck
     */
    checkFields(){
        //Referens till formuläret
        let registerForm = document.querySelector("form");
        //Referens till error meddelandet som ligger under fomulärets fält
        let errorMessage = document.getElementById("error");
        //Håller alla error meddelanden som ska visas
        let messages = [];

        /* De reguljära uttrycken */
        let regExName = /^[a-zA-Z]{2,}\d*$/;
        let regExPassword = /^.{5,}$/;
        let regExMail = /^.+[@].+[.].+$/;

        /* Testar användarnamnet */
        if(!regExName.test(registerForm.name.value)){
            registerForm.name.style.backgroundColor = "red";
            messages[0] = "Användarnamn: Minst två bokstäver!<br>";
        }else{
            registerForm.name.style.backgroundColor = "white";
            messages[0] = "";
        }

        /* Testar lösenordet */
        if(!regExPassword.test(registerForm.password.value)){
            registerForm.password.style.backgroundColor = "red";
            messages[1] = "Lösenord: Minst 5 tecken!<br>";
        }else{
            registerForm.password.style.backgroundColor = "white";
            messages[1] = "";
        }

        /* Testar mailadressen */
        if(!regExMail.test(registerForm.mail.value)){
            registerForm.mail.style.backgroundColor = "red";
            messages[2] = "Mail: Ange en giltig mailadress! ex: exempel@mail.com";
        }else{
            registerForm.mail.style.backgroundColor = "white";
            messages[2] = "";
        }

        //Visar de error meddelanden som ska visas
        errorMessage.innerHTML = messages[0] + messages[1] + messages[2];

        /* Om det finns minst ett felmeddelande så går det inte att klicka på skapa konto knappen */
        if(messages[0] !== "" || messages[1] !== "" || messages[2] !== ""){
            /* Om det finns fel, avaktivera knappen, byt pekaren till "default" och sätt text färgen + kanten till grå */
            registerForm.submitBtn.disabled = true;
            registerForm.submitBtn.style.color = "gray";
            registerForm.submitBtn.style.cursor = "default";
            registerForm.submitBtn.style.borderColor = "gray";
        }else{
            /* Om det inte finns fel, aktivera knappen, byt pekaren till "pointer" och sätt text färgen + kanten till svart */
            registerForm.submitBtn.disabled = false;
            registerForm.submitBtn.style.color = "black";
            registerForm.submitBtn.style.cursor = "pointer";
            registerForm.submitBtn.style.borderColor = "black";
        }
    }

    componentDidMount(){
        let registerForm = document.querySelector("form");
        registerForm.addEventListener("input", this.checkFields);

        /* Om användaren redan är inloggad, skicka användaren till sin sida */
        if(sessionStorage.getItem("username") !== null){
            window.location.replace("/user");
        }
    }

    render(){
        return(
            <form method="post" onSubmit={this.register}>
                <fieldset>
                    <legend>Skapa konto</legend>
                    <label htmlFor="name">Användarnamn</label>
                    <input type="text" id="name" name="name"/><br/>
                    <label htmlFor="password">Lösenord</label>
                    <input type="password" id="password" name="password"/><br/>
                    <label htmlFor="mail">Mail</label>
                    <input type="mail" id="mail" name="mail"/><br/>
                    <p id="error"></p>
                    <input type="submit" name="submitBtn" value="Skapa konto"/>
                </fieldset>
            </form>
        );
    }
}
/*
function RegisterForm(props) {
    return(
        <form>
            <fieldset>
                <legend>Skapa konto</legend>
                <label htmlFor="name">Användarnamn</label>
                <input type="text" id="name" name="name"/><br/>
                <label htmlFor="password">Lösenord</label>
                <input type="password" id="password" name="password"/><br/>
                <label htmlFor="mail">Mail</label>
                <input type="mail" id="mail" name="mail"/><br/>
                <input type="submit" value="Skapa konto"/>
            </fieldset>
        </form>
    );
}*/

export default withRouter(RegisterForm);