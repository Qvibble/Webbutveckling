import React from "react";
import {Link, Router, withRouter} from "react-router-dom";
import food from "../images/ramen.jpg";

class SearchMain extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            searchTitle: []
        }
        
        this.title = this.title.bind(this);
    }
    
    title(){
        //Sparar det användaren sökte på och tar bort det från session storage
        let title = [<h2 key="title">Din sökning: "{sessionStorage.getItem("searchTerm")}"</h2>];
        sessionStorage.removeItem("searchTerm");
        this.setState({searchTitle: title});
    }

    componentDidMount(){
        this.title();
    }
    
    render(){
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

        //Håller recept komponenten
        let recipesComponent = undefined;
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
        
        return(
            <main>
                <article>
                    {this.state.searchTitle}
                    <Link to="/recipe">
                        <section>
                            <h3>Recept namn</h3>
                            <img src={food}/>
                        </section>
                    </Link>
                    <Link to="/recipe">
                        <section>
                            <h3>Recept namn</h3>
                            <img src={food}/>
                        </section>
                    </Link>
                    <Link to="/recipe">
                        <section>
                            <h3>Recept namn</h3>
                            <img src={food}/>
                        </section>
                    </Link>
                    <Link to="/recipe">
                        <section>
                            <h3>Recept namn</h3>
                            <img src={food}/>
                        </section>
                    </Link>
                    <Link to="/recipe">
                        <section>
                            <h3>Recept namn</h3>
                            <img src={food}/>
                        </section>
                    </Link>
                    <Link to="/recipe">
                        <section>
                            <h3>Recept namn</h3>
                            <img src={food}/>
                        </section>
                    </Link>                
                </article>           
            </main>
        );
    }
}

export default withRouter(SearchMain);