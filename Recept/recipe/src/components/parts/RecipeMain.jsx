import React from "react";
import food from "../images/ramen.jpg";
import heart from "../images/heart.png";

class RecipeMain extends React.Component {
    constructor(props){
        super(props);
    
        this.state = {
            fetchData: [],
            content: []
        };

        this.getRecipe = this.getRecipe.bind(this);
        this.recipeContent = this.recipeContent.bind(this);
        this.likeRecipe = this.likeRecipe.bind(this);
    }

    /**
     * Skapar html innehåller som sidan har utifrån fetch datan
     */
    recipeContent(){
        //Håller ingredienserna
        let ingredients = [];
        //Loop för ingredienser
        for(let i = 0; i < this.state.fetchData[0].ingredients.length; i++){
            ingredients.push(<li key={"i"+i}>{this.state.fetchData[0].ingredients[i].amount} - {this.state.fetchData[0].ingredients[i].name}</li>);
        }

        //Steps är en sträng som separerar alla steg med "|"
        let stepContent = this.state.fetchData[0].steps.split("|");

        //Håller alla steg
        let steps = [];
        //Loop för steg
        for(let i = 0; i < stepContent.length-1; i++){
            steps.push(<li key={"s"+i}>{stepContent[i]}</li>)
        }


        //Håller koll på like section styling
        let styling = "none";
        
        /* Om användaren gillat receptet, lägg till border */
        if(this.state.fetchData[0].liked === true){
            styling = "25px solid deeppink";
        }
        
        //html för sidan
        this.setState({content: 
            <>
                <h1>{this.state.fetchData[0].name}</h1>
                <section style={{borderLeft: styling}} onClick={this.likeRecipe}>
                    <h3>{this.state.fetchData[0].likes}</h3>            
                    <img src={heart}/>
                </section>
                <img src={this.state.fetchData[0].image}/>
                <h2>Ingredienser:</h2>          
                <ul>
                    {ingredients}
                </ul>
                <h2>Instruktioner:</h2>
                <ol>
                    {steps}
                </ol>
            </>
        });
    }
    
    /**
     * Hämtar ett recept utifrån ett id
     */
    async getRecipe(){
        //Finns inga användare med bara en bokstav
        let username = "a";
        if(sessionStorage.getItem("username") !== null){
            username = sessionStorage.getItem("username");
        }

        //Om det finns ett recept id sparat
        if(sessionStorage.getItem("recipeId") !== null){
            await fetch("http://localhost:8080/Recipe/api/recipe/idUsername", {
                method: "GET",
                mode: 'cors',
                headers: {
                    "IdUsername": sessionStorage.getItem("recipeId") + "|" + username
                }
            }).then((response) => {     
                return response.json();          
            }).then(data => {
                this.setState({fetchData: data});     
                this.recipeContent();
            }).catch(err => {
                console.error(err);
            });
        }else{
            this.setState({content: <h1>Välj ett recept först!</h1>})
        }
    }

    likeRecipe(){
        //Om man är inloggad
        if(sessionStorage.getItem("username") !== null && sessionStorage.getItem("recipeId") !== null){
            //Om användaren redan gillar receptet, ta bort like, annars så läggs det till
            if(this.state.fetchData[0].liked === false){
                fetch("http://localhost:8080/Recipe/api/recipe/like", {
                method: "POST",
                mode: 'cors',
                headers: {
                    "Content-type": "text/plain"
                },
                body: sessionStorage.getItem("recipeId") + "|" + sessionStorage.getItem("username")
                }).then((response) => {
                        return response.json();
                }).catch(err => {
                    console.error(err);
                });
            }else{
                fetch("http://localhost:8080/Recipe/api/recipe/like", {
                    method: "DELETE",
                    mode: 'cors',
                    headers: {
                        "Content-type": "text/plain"
                    },
                    body: sessionStorage.getItem("recipeId") + "|" + sessionStorage.getItem("username")
                    }).then((response) => {
                            return response.json();
                    }).catch(err => {
                        console.error(err);
                    });
            }







            
        }else{
            alert("Logga in först");
        }
    }

    componentDidMount(){
        this.getRecipe();
    }

    render(){
        return(
            <main>
                {this.state.content}
            </main>
        );
    }
}

export default RecipeMain;