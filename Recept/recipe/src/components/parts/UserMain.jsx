import React from "react";
import {Link, Router, withRouter} from "react-router-dom";

class UserMain extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            likedRecipes: "",
            userRecipes: ""
        };

        this.getUserRecipes = this.getUserRecipes.bind(this);
        this.getLikedRecipes = this.getLikedRecipes.bind(this);
    }

    async getLikedRecipes(){
        await fetch("http://localhost:8080/Recipe/api/recipe/liked", {
            method: "GET",
            mode: 'cors',
            headers: sessionStorage.getItem("username")
        }).then((response) => {
            return response.json();
        }).then(data =>{
            this.setState({likedRecipes: data});
        }).catch(err => {
            console.error(err);
        });
    }

    async getUserRecipes(){
        await fetch("http://localhost:8080/Recipe/api/recipe/user", {
            method: "GET",
            mode: 'cors',
            headers: sessionStorage.getItem("username")
        }).then((response) => {
            return response.json();
        }).then(data =>{
            this.setState({userRecipes: data});
        }).catch(err => {
            console.error(err);
        });
    }

    componentDidMount(){
        this.getLikedRecipes();
        this.getUserRecipes();

        /* Om användaren inte är inloggad, skicka användaren till logga in sidan */
        if(sessionStorage.getItem("username") === null){
            window.location.replace("/login");
        }
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
        let likedRecipes = undefined;
        //Håller alla nya recept som skapas
        let recipes = [];

        //Skapar alla FoodSection element
        for(let i = 0; i < this.state.likedRecipes.length; i++){
            recipes.push(<FoodSection name={this.state.likedRecipes[i].name} image={this.state.likedRecipes[i].image} key={this.state.likedRecipes[i].id}/>);
        }
        
        //Lägger till alla Foodsections i komponenten
        likedRecipes = (
            <article>
                <h2>Senaste Recept</h2>
                {recipes}
            </article>
        );
        
        //Håller popuplarRecipes komponenten
        let userRecipes = undefined;
        recipes = [];

        for(let i = 0; i < this.state.userRecipes.length; i++){
            recipes.push(<FoodSection name={this.state.userRecipes[i].name} image={this.state.userRecipes[i].image} key={this.state.userRecipes[i].id}/>);
        }
    
        userRecipes = (
            <article>
                <h2>Populära Recept</h2>
                {recipes}
            </article>
        );

       return(
           <main>
                {likedRecipes}
                {userRecipes}
                <form>
                    <Link to="search">
                        <input type="submit" value="Se alla recept"/>
                    </Link>
                </form>
            </main>
        );
    }
}

export default withRouter(UserMain);