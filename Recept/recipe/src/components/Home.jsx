import React from "react";

import HomeHeader from "./parts/FullHeader";
import HomeMain from "./parts/HomeMain";
import Footer from "./parts/Footer";

function Home(props) {
    return(        
        <div id="index">
            <HomeHeader/>
            <HomeMain/>
            <Footer/>
        </div>
    );
}

export default Home;