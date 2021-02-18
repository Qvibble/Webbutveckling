import React from "react";

import RecipeHeader from "./parts/FullHeader";
import RecipeMain from "./parts/RecipeMain";
import Footer from "./parts/Footer";

function Recipe(props) {
    return(        
        <div id="recipe">
            <RecipeHeader/>
            <RecipeMain/>
            <Footer/>
        </div>
    );
}

export default Recipe;