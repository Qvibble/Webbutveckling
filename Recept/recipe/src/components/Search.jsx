import React from "react";

import SearchHeader from "./parts/FullHeader";
import SearchMain from "./parts/SearchMain";
import Footer from "./parts/Footer";

function Search(props) {
    return(        
        <div id="index">
            <SearchHeader/>
            <SearchMain/>
            <Footer/>
        </div>
    );
}

export default Search;