import React from "react";
import {Link, Router, withRouter} from "react-router-dom";
import food from "../images/ramen.jpg";

var testRecipes = [{
    "id": 5,
    "name": "Kattbullar",
    "description": "Bara katt",
    "steps": "1. Katt,2. Bullar",
    "ingredients": [
        {
            "name": "Katt",
            "amount": "5 Kg"
        },
        {
            "name": "Bullar",
            "amount": "26 Kg"
        },
        {
            "name": "Majs",
            "amount": "3"
        },        
    ],
    "likes": 3211,
},{
    "id": 2,
    "name": "KÖttbullar",
    "description": "Bara katt",
    "steps": "1. Katt,2. Bullar",
    "ingredients": [
        {
            "name": "Katt",
            "amount": "5 Kg"
        },
        {
            "name": "Bullar",
            "amount": "26 Kg"
        },
        {
            "name": "Majs",
            "amount": "3"
        },        
    ],
    "likes": 3211,
},{
    "id": 87,
    "name": "ja",
    "description": "Bara katt",
    "steps": "1. Katt,2. Bullar",
    "ingredients": [
        {
            "name": "Katt",
            "amount": "5 Kg"
        },
        {
            "name": "Bullar",
            "amount": "26 Kg"
        },
        {
            "name": "Majs",
            "amount": "3"
        },        
    ],
    "likes": 3211,
}];

class HomeMain extends React.Component{
    constructor(props){
        super(props);

        this.popularRecipes = undefined;
        this.newRecipes = undefined;
    }

    getPopularRecipes(){
        fetch("http://localhost:8080/Recipe/api/recipe/random", {
            method: "GET",
            mode: 'cors',
        }).then((response) => {
            return response.json();
        }).then(data =>{
            this.popularRecipes = data;
        }).catch(err => {
            console.error(err);
        });
    }

    getNewRecipes(){
        fetch("http://localhost:8080/Recipe/api/recipe/new", {
            method: "GET",
            mode: 'cors',
        }).then((response) => {
            return response.json();
        }).then(data =>{
            this.newRecipes = data;
        }).catch(err => {
            console.error(err);
        });
    }
    
    componentDidMount(){
        this.getNewRecipes();
        this.getPopularRecipes();
    }

    render(){        
        function FoodSection(props){
            return(
                <section id = {props.id}>
                    <h3>{props.name}</h3>
                    <img src = {props.image}/>
                </section>
            );
        }
    
        function NewRecipesArticle(){
            let recipes = [];
            for(let i = 0; i < testRecipes.length; i++){
                recipes.push(<FoodSection name={testRecipes[i].name} image={testRecipes[i].image} key={testRecipes[i].id}/>);
            }
        
            return <article>
                <h2>Senaste Recept</h2>
                {recipes}
            </article>;
        }
    
        function PopularRecipesArticle(){
            let recipes = [];
            for(let i = 0; i < testRecipes.length; i++){
                recipes.push(<FoodSection name={testRecipes[i].name} image={testRecipes[i].image} key={testRecipes[i].id}/>);
            }
        
            return <article>
                <h2>Populära Recept</h2>
                {recipes}
            </article>;
        }

        return(
            <main>
                <NewRecipesArticle/>
                <PopularRecipesArticle/>
                <form>
                    <Link to="search">
                        <input type="submit" value="Se alla recept"/>
                    </Link>
                </form>
            </main>
        );
    }
}
/*
var newRecipes;
var popularRecipes;
window.onload = init;
function init() {
    getNewRecipes();
    getPopularRecipes();    
}

function HomeMain(props) {
    return(
        <main>
            <NewRecipesArticle/>
            <PopularRecipesArticle/>
            <form>
                <Link to="search">
                    <input type="submit" value="Se alla recept"/>
                </Link>
            </form>
        </main>
    );
}

/**
 * Hämtar de 10 senaste tillagda recepten från databasen
 *//*
function getNewRecipes(){
    fetch("http://localhost:8080/Recipe/api/recipe/new", {
        method: "GET",
        mode: 'cors',
    }).then((response) => {
        return response.json();
    }).then(data =>{
        newRecipes = data;
    }).catch(err => {
        console.error(err);
    });
}*/

/**
 * Hämtar 10 slumpade recept från databasen
 *//*
function getPopularRecipes(){
    fetch("http://localhost:8080/Recipe/api/recipe/random", {
        method: "GET",
        mode: 'cors',
    }).then((response) => {
        return response.json();
    }).then(data =>{
        popularRecipes = data;
    }).catch(err => {
        console.error(err);
    });
}
*/

/*
function FoodSection(props){
    return(
        <section id = {props.id}>
            <h3>{props.name}</h3>
            <img src = {props.image}/>
        </section>
    );
}
    
//Byt till newRecipes
function NewRecipesArticle(){
    let recipes = [];
    for(let i = 0; i < testRecipes.length; i++){
        recipes.push(<FoodSection name={testRecipes[i].name} image={testRecipes[i].image} key={testRecipes[i].id}/>);
    }

    return <article>
        <h2>Senaste Recept</h2>
        {recipes}
    </article>;
}

//Byt till popularRecipes
function PopularRecipesArticle(){
    let recipes = [];
    for(let i = 0; i < testRecipes.length; i++){
        recipes.push(<FoodSection name={testRecipes[i].name} image={testRecipes[i].image} key={testRecipes[i].id}/>);
    }

    return <article>
        <h2>Populära Recept</h2>
        {recipes}
    </article>;
}*/

export default withRouter(HomeMain);