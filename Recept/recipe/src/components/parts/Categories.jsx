import React from "react";
import {Link, withRouter} from "react-router-dom";

function Categories(props) {
    return(
        <ul>
            <li>Kategorier</li>
            <Link to="/search">
                <li>Nöt</li>
                <li>Fläsk</li>
                <li>Kyckling</li>
                <li>Fisk</li>
                <li>Vegetariskt</li>
                <li>Veganskt</li>
                <li>Förrätt</li>
                <li>Varmrätt</li>
                <li>Efterrätt</li>
            </Link>
        </ul>
    );
}

export default Categories;