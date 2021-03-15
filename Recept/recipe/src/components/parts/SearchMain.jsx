import React from "react";
import {Link, Router, withRouter} from "react-router-dom";
import food from "../images/ramen.jpg";

class SearchMain extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            searchTitle: [],
            recipesComponent: [],
            fetchData: []
        }
        
        this.content = this.content.bind(this);
        this.getRecipes = this.getRecipes.bind(this);
    }
    
    /**
     * Skapar innehållet på sidan
     */
    content(){
        let title = [];
        
        //Ändrar titeln på sök sidan
        if(sessionStorage.getItem("category") !== null){
            console.log("get category");
            title = [<h2 key="title">Din kategori sökning: "{sessionStorage.getItem("category")}"</h2>];            
        }else{            
            title = [<h2 key="title">Din sökning: "{sessionStorage.getItem("searchTerm")}"</h2>];
        }
        this.setState({searchTitle: title});

        //Hämter recepten
        this.getRecipes();
    }
    /**
     * Hämtar alla recept som innehåller söktermen. De recept som börjar på söktermen hamnar först
     */
    async getRecipes(){
        function FoodSection(props){
            function saveId(){
                sessionStorage.setItem("recipeId", props.id);
            }

            return(
                <Link to="/recipe" onClick={saveId}>
                    <section id = {props.id}>
                        <h3>{props.name}</h3>
                        <img src = {props.image}/>
                    </section>
                </Link>
            );
        }

        //Om användaren klickat på en kategori
        if(sessionStorage.getItem("category") !== null){
            let category = sessionStorage.getItem("category");
            sessionStorage.removeItem("category");

            await fetch("http://localhost:8080/Recipe/api/recipe/category", {
                    method: "GET",
                    mode: 'cors',
                    headers: {
                        "Category": category
                    }
                }).then((response) => {            
                    return response.json();          
                }).then(data => {
                    let recipesObj = data;
                    let component = []; 
                    for(let i = 0; i < recipesObj.length; i++){
                        component.push(<FoodSection key={recipesObj[i].id} id={recipesObj[i].id} name={recipesObj[i].name} image={recipesObj[i].image}/>);
                    }
            
                    this.setState({recipesComponent: component});
                }).catch(err => {
                    console.error(err);
                });
        }else{
            //Om sökfältet inte är tomt, hämta recept som söktes på
            if(sessionStorage.getItem("searchTerm") !== null){
                let searchTerm = sessionStorage.getItem("searchTerm");
                sessionStorage.removeItem("searchTerm");
    
                await fetch("http://localhost:8080/Recipe/api/recipe/search", {
                    method: "GET",
                    mode: 'cors',
                    headers: {
                        "SearchTerm": searchTerm
                    }
                }).then((response) => {            
                    return response.json();          
                }).then(data => {
                    let recipesObj = data;
                    let component = []; 
                    for(let i = 0; i < recipesObj.length; i++){
                        component.push(<FoodSection key={recipesObj[i].id} id={recipesObj[i].id} name={recipesObj[i].name} image={recipesObj[i].image}/>);
                    }
            
                    this.setState({recipesComponent: component});
                }).catch(err => {
                    console.error(err);
                });
            }
        }
    }

    componentDidMount(){
        //Kör funktionen när sidan laddas in
        this.content();

        //Sätter eventlistener på sökformuläret
        document.getElementById("searchForm").addEventListener("submit", this.content);

        //Sätter eventlistener på kategori knapparna
        let liElements = document.querySelector("ul").lastChild.childNodes;

        for(let i = 0; i < liElements.length; i++){
            liElements[i].addEventListener("click", this.content, false);
        }
    }
    
    render(){      
        return(
            <main>
                <article>
                    {this.state.searchTitle}
                    {this.state.recipesComponent} 
                </article>
            </main>
        );
    }
}

export default withRouter(SearchMain);