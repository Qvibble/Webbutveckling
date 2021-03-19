import React from "react";
import {Link, withRouter} from "react-router-dom";

class Categories extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            liElements: []
        }

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

    componentDidMount(){
        //Håller referenser till de li element som skapats
        let elements = document.querySelector("ul").lastChild.childNodes;
        
        //Lägger en eventlistener på alla li element
        for(let i = 0; i < elements.length; i++){
            elements[i].addEventListener("click", this.setCategory, true);
        }
    }
    
    render(){
        //Kategorierna som finns
        let categories = ["Nöt", "Fläsk", "Kyckling", "Fisk", "Vegetariskt", "Veganskt", "Förrätt", "Varmrätt", "Efterrätt"];
    
        //Håller li elementen
        let elements = [];
    
        //Lägger till li elementen
        for(let i = 0; i < categories.length; i++){
            elements.push(<li key={categories[i]}>{categories[i]}</li>);
        }

        return(
            <ul>
                <li>Kategorier</li>
                <Link to="/search">
                    {elements}
                </Link>
            </ul>
        );
    }
}

export default Categories;