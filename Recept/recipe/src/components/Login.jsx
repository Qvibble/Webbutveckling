import React from "react";

import LoginHeader from "./parts/LogoHeader";
import LoginMain from "./parts/LoginMain";
import Footer from "./parts/Footer";

function Login(props) {
    return(        
        <div id="login">
            <LoginHeader/>
            <LoginMain/>
            <Footer/>
        </div>
    );
}

export default Login;