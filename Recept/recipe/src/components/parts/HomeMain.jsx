import React from "react";
import {Link, Router, withRouter} from "react-router-dom";
import food from "../images/ramen.jpg";

class HomeMain extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            popularRecipes: "",
            newRecipes: ""
        };

        this.getNewRecipes = this.getNewRecipes.bind(this);
        this.getPopularRecipes = this.getPopularRecipes.bind(this);
    }

    async getPopularRecipes(){
        await fetch("http://localhost:8080/Recipe/api/recipe/random", {
            method: "GET",
            mode: 'cors',
        }).then((response) => {
            return response.json();
        }).then(data =>{
            this.setState({popularRecipes: data});
        }).catch(err => {
            console.error(err);
        });
    }
    
    async getNewRecipes(){
        await fetch("http://localhost:8080/Recipe/api/recipe/new", {
            method: "GET",
            mode: 'cors',
        }).then((response) => {
            return response.json();
        }).then(data =>{
            this.setState({newRecipes: data});
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

        //Håller newRecipes komponenten
        let newRecipes = undefined;
        //Håller alla nya recept som skapas
        let recipes = [];

        //Skapar alla FoodSection element
        for(let i = 0; i < this.state.newRecipes.length; i++){
            recipes.push(<FoodSection name={this.state.newRecipes[i].name} image={this.state.newRecipes[i].image} key={this.state.newRecipes[i].id}/>);
        }
        
        //Lägger till alla Foodsections i komponenten
        newRecipes = (
            <article>
                <h2>Senaste Recept</h2>
                {recipes}
            </article>
        );
        
        //Håller popuplarRecipes komponenten
        let popularRecipes = undefined;
        recipes = [];

        for(let i = 0; i < this.state.popularRecipes.length; i++){
            recipes.push(<FoodSection name={this.state.popularRecipes[i].name} image={this.state.popularRecipes[i].image} key={this.state.popularRecipes[i].id}/>);
        }
    
        popularRecipes = (
            <article>
                <h2>Populära Recept</h2>
                {recipes}
            </article>
        );

       return(
           <main>
                {newRecipes}
                {popularRecipes}
                <form>
                    <Link to="search">
                        <input type="submit" value="Se alla recept"/>
                    </Link>
                </form>
            </main>
        );
    }
}

export default withRouter(HomeMain);