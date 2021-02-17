import React from "react";
import {Link, Router, withRouter} from "react-router-dom";

import HomeHeader from "./parts/FullHeader";
import Footer from "./parts/Footer";

function Home(props) {
    return(        
        <>
            <HomeHeader/>
            <main></main>
            <Footer/>
        </>
    );
}

export default Home;