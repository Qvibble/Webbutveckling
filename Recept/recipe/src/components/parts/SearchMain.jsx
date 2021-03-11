import React from "react";
import {Link, Router, withRouter} from "react-router-dom";
import food from "../images/ramen.jpg";

class SearchMain extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            searchTitle: [],
            recipesComponent: []
        }
        
        this.content = this.content.bind(this);
        this.getRecipes = this.getRecipes.bind(this);
    }
    
    content(){
        console.log("content");
        //Sparar det användaren sökte på och tar bort det från session storage
        let title = [<h2 key="title">Din sökning: "{sessionStorage.getItem("searchTerm")}"</h2>];
        console.log(sessionStorage.getItem("searchTerm"));
        this.setState({searchTitle: title});
        
        //Hämtar recepten från backend
        this.getRecipes().then(promise => {
            //Tar bort det som söktes på
            sessionStorage.removeItem("searchTerm");
            
            //html för recepten
            function FoodSection(props){
                return(
                    <Link to="/recipe">
                    <section id = {props.id}>
                        <h3>{props.name}</h3>
                        <img src = {props.image}/>
                    </section>
                </Link>
                );
            }
            
            console.log(promise);
/*
            let component = []; 
            for(let i = 0; i < recipesObj; i++){
                component.push(<FoodSection key={recipesObj[i].id} id={recipesObj[i].id} name={recipesObj[i].name} image={recipesObj[i].image}/>);
            }
            
            this.setState({recipesComponent: component});
  */      
        });
    }
    
    async getRecipes(){
        //Om sökfältet inte är tomt
        if(sessionStorage.getItem("searchTerm") !== null){
            let searchTerm = sessionStorage.getItem("searchTerm");

            await fetch("http://localhost:8080/Recipe/api/recipe/search", {
                method: "GET",
                mode: 'cors',
                headers: {
                    "SearchTerm": searchTerm
                }
            }).then((response) => {
                const promise = response.json();
                console.log(promise);
                return promise;          
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