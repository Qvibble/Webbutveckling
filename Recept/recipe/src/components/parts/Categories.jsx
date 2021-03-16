import React from "react";
import {Link, withRouter} from "react-router-dom";

class Categories extends React.Component {
    constructor(props){
        super(props);

        this.setCategory = this.setCategory.bind(this);
    }

    setCategory(event){
        event.preventDefault();

        //Håller vilken kategori man klickat på
        sessionStorage.setItem("category", event.target.innerHTML);

        /* Om man inte redan befinner sök på sök sidan, gå dit. Annars töms bara sökfältet*/
        if(window.location.pathname !== "/search"){
            window.location.replace("/search");
        }
    }

    render(){
        return(
            <ul>
                <li>Kategorier</li>
                <Link to="/search">
                    <li onClick={this.setCategory}>Nöt</li>
                    <li onClick={this.setCategory}>Fläsk</li>
                    <li onClick={this.setCategory}>Kyckling</li>
                    <li onClick={this.setCategory}>Fisk</li>
                    <li onClick={this.setCategory}>Vegetariskt</li>
                    <li onClick={this.setCategory}>Veganskt</li>
                    <li onClick={this.setCategory}>Förrätt</li>
                    <li onClick={this.setCategory}>Varmrätt</li>
                    <li onClick={this.setCategory}>Efterrätt</li>
                </Link>
            </ul>
        );
    }
}

export default Categories;