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
        //Sparar det användaren sökte på och tar bort det från session storage
        let title = [<h2 key="title">Din sökning: "{sessionStorage.getItem("searchTerm")}"</h2>];
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

    componentDidMount(){
        //Kör funktionen när sidan laddas in
        this.content();

        //Sätter eventlistener på sökformuläret
        document.getElementById("searchForm").addEventListener("submit", this.content);
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