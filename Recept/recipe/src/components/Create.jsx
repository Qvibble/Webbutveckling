import React from "react";

import CreateHeader from "./parts/FullHeader";
import CreateMain from "./parts/CreateMain";
import Footer from "./parts/Footer";

function Home(props) {
    return(        
        <div id="create">
            <CreateHeader/>
            <CreateMain/>
            <Footer/>
        </div>
    );
}

export default Home;