import React from "react";
import {Link, Router, withRouter} from "react-router-dom";

import LoginForm from "./LoginForm";

function LoginMain(params) {
    return(
        <main>
            <LoginForm/>
        </main>
    );
}

export default withRouter(LoginMain);