import React from "react";
import {Link, Router, withRouter} from "react-router-dom";

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
}

export default withRouter(RegisterForm);