import React from "react";
import {Link, Router, withRouter} from "react-router-dom";

function LoginForm(props) {
    return(
        <form>
            <fieldset>
                <legend>Logga in</legend>
                <label htmlFor="name">Användarnamn</label>
                <input type="text" id="name" name="name"/><br/>
                <label htmlFor="password">Lösenord</label>
                <input type="password" id="password" name="password"/><br/>
                <Link to="/user">
                    <input type="submit" value="Logga in"/>
                </Link>
                <Link to="/create">
                    <p>Har du inget konto? Klicka här för att skapa ett</p>
                </Link>
            </fieldset>
        </form>
    );
}

export default withRouter(LoginForm);