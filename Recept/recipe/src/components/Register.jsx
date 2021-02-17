import React from "react";

import RegisterHeader from "./parts/LogoHeader";
import RegisterMain from "./parts/RegisterMain";
import Footer from "./parts/Footer";

function Register(props) {
    return(        
        <div id="login">
            <RegisterHeader/>
            <RegisterMain/>
            <Footer/>
        </div>
    );
}

export default Register;