import React from "react";

import UserHeader from "./parts/FullHeader";
import UserMain from "./parts/UserMain";
import Footer from "./parts/Footer";

function User(props) {
    return(        
        <div id="index">
            <UserHeader/>
            <UserMain/>
            <Footer/>
        </div>
    );
}

export default User;