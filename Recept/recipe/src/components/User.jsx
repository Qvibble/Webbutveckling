import React from "react";

import UserHeader from "./parts/FullHeader";
import UserMain from "./parts/UserMain";
import Footer from "./parts/Footer";

function Home(props) {
    return(        
        <div id="index">
            <UserHeader/>
            <UserMain/>
            <Footer/>
        </div>
    );
}

export default Home;