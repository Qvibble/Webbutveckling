import React from "react";
import {Link, Router, withRouter} from "react-router-dom";

import HomeHeader from "./parts/FullHeader";
import HomeMain from "./parts/HomeMain";
import Footer from "./parts/Footer";

function Home(props) {
    return(        
        <>
            <HomeHeader/>
            <HomeMain/>
            <Footer/>
        </>
    );
}

export default Home;