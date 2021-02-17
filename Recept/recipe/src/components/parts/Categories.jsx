import React from "react";
import {Link, withRouter} from "react-router-dom";

function Categories(props) {
    return(
        <li>
            <ul>Kategorier</ul>
            <Link to="/search">
                <ul>Nöt</ul>
                <ul>Fläsk</ul>
                <ul>Kyckling</ul>
                <ul>Vegetariskt</ul>
                <ul>Veganskt</ul>
                <ul>Förrätt</ul>
                <ul>Varmrätt</ul>
                <ul>Efterrätt</ul>
            </Link>
        </li>
    );
}

export default Categories;