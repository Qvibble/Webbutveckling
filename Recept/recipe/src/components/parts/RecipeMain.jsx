import React from "react";
import food from "../images/ramen.jpg";
import heart from "../images/heart.png";

class RecipeMain extends React.Component {
    constructor(props){
        super(props);
    
        this.state = {
            fetchData: [],
            content: [],
            styling: "",
            commentContent : [],
            commentData: [],
            creatorButtons: []
        };

        this.getRecipe = this.getRecipe.bind(this);
        this.recipeContent = this.recipeContent.bind(this);
        this.likeRecipe = this.likeRecipe.bind(this);
        this.commentContent = this.commentContent.bind(this);
        this.getComments = this.getComments.bind(this);
        this.a = this.a.bind(this);
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
        
        //Håller koll på likes knappens styling
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
                <img src={"data:image/png;base64," + this.state.fetchData[0].image} alt={this.state.fetchData[0].name}/>
                <p>Av: {this.state.fetchData[0].username}</p>
                <h2>Ingredienser</h2>          
                <ul>
                    {ingredients}
                </ul>
                <h2>Instruktioner</h2>
                <ol>
                    {steps}
                </ol>
            </>
        });
    }
    
    /**
     * Hämtar ett recept utifrån ett id + användarnamn
     */
    async getRecipe(){
        //Finns inga användare med bara en bokstav
        let username = "a";
        if(sessionStorage.getItem("username") !== null){
            username = sessionStorage.getItem("username");
        }

        //Om det finns ett recept id sparat
        if(sessionStorage.getItem("recipeId") !== null){
            await fetch("http://localhost:8080/Recipe/api/recipe/get", {
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

    /**
     * Lägger till / tar bort från databasen om användaren gillar receptet
     */
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
                    "IdUsername": sessionStorage.getItem("recipeId") + "|" + sessionStorage.getItem("username")
                },
                }).then((response) => {
                    return response.json();
                }).catch(err => {
                    console.error(err);
                });
            }

            fetch("http://localhost:8080/Recipe/api/recipe/get", {
                method: "GET",
                mode: 'cors',
                headers: {
                    "IdUsername": sessionStorage.getItem("recipeId") + "|" + sessionStorage.getItem("username")
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
            alert("Logga in först");
        }
    }

    /**
     * Innehåller kommentar delen av sidan
     */
    commentContent(){
        //Håller formulär elementet
        let form = "";

        //Om man är inloggad, visa skapa kommentar fältet
        if(sessionStorage.getItem("username") !== null){
            /**
             * Skapar "skapa kommentar" formuläret men bara om man är inloggad
             * 
             * @param {*} event 
             */
            function createComment(event){
                event.preventDefault();

                //Referens till formuläret
                let formElem = event.target;
                //Referens till error elementet <p>
                let errorMessage = document.getElementById("error");
                
                //Håller kommentarens data
                let commentData = {
                    recipeId: sessionStorage.getItem("recipeId"),
                    username: sessionStorage.getItem("username"),
                    content: formElem.text.value
                };

                fetch("http://localhost:8080/Recipe/api/comments/save", {
                    method: "POST",
                    mode: 'cors',
                    headers: {
                        "Content-type": "text/plain"
                    },
                    body: JSON.stringify(commentData)
                }).then((response) => {
                    /* Om det inte gick att skapa kommentaren */
                    if(response.status === 400){
                        errorMessage.innerHTML = "Det gick inte att skapa kommentaren";
                    }else{
                        errorMessage.innerHTML = "";
                        formElem.text.value = "";
                        //Stänger av knappen igen när den klickats på så att man inte kan skapa tomma kommentarer
                        formElem.submitBtn.disabled = true;
                        formElem.submitBtn.style.color = "gray";
                        formElem.submitBtn.style.cursor = "default";
                        formElem.submitBtn.style.borderColor = "gray";
                    }
                    
                    return response.json();
                }).catch(err => {
                    console.error(err);
                });
            }
            
            /**
             * Kollar så att fältet inte är tomt så att en tom kommentar inte kan skapas
             * 
             * @param {*} event 
             */
            function checkField(event){
                //Referens till formuläret
                let formElem = event.target.parentNode.parentNode;

                //Om textfätet är tomt, avaktivera knappen. Annars, aktivera den
                if(formElem.text.value.trim() === ""){
                    formElem.submitBtn.disabled = true;
                    formElem.submitBtn.style.color = "gray";
                    formElem.submitBtn.style.cursor = "default";
                    formElem.submitBtn.style.borderColor = "gray";
                }else{
                    formElem.submitBtn.disabled = false;
                    formElem.submitBtn.style.color = "black";
                    formElem.submitBtn.style.cursor = "pointer";
                    formElem.submitBtn.style.borderColor = "black";
                }
            }

            //Submit knappens style när den skapas
            //Avaktiverad och gråd från början
            let btnStyle = {
                disabled: true,
                color: "gray",
                cursor: "default",
                borderColor: "gray"
            }
            
            form =
            <form onSubmit={createComment} onInput={checkField} id="commentForm">
                <fieldset>
                    <legend>Lägg till kommentar</legend>
                    <label htmlFor="text">Innehåll</label>
                    <textarea rows="8" id="text" name="text"></textarea>
                    <p id="error"></p>
                    <input type="submit" name="submitBtn" value="Skapa kommentar" style={btnStyle} onClick={this.a}/>
                </fieldset>
            </form>;
        }
        
        //Håller kommentarerna
        let comments = <p style={{textAlign: "center"}}>Inga Kommentarer</p>;
        
        //Om det finns kommentarer
        if(this.state.commentData.length > 0){
            comments = [];
            
            for(let i = 0; i < this.state.commentData.length; i++){
                comments.push(
                    <section key={"c"+i+1}>
                        <h3>{this.state.commentData[i].username}</h3>
                        <p>{this.state.commentData[i].content}</p>
                        <p>{this.state.commentData[i].date}</p>
                    </section>
                );
            }
        }

        this.setState({commentContent: 
            <section>
                <h2>Kommentarer</h2>
                {form}
                <section>
                    {comments}
                </section>
            </section>
        });
    }
    
    /**
     * Hämtar kommentarerna från databasen
     */
    async getComments(){
        if(sessionStorage.getItem("recipeId") !== null){
            await fetch("http://localhost:8080/Recipe/api/comments/get", {
                method: "GET",
                mode: 'cors',
                headers: {
                    "RecipeId": sessionStorage.getItem("recipeId")
                }
            }).then((response) => {    
                return response.json();          
            }).then(data => {
                this.setState({commentData: data});                    
            }).catch(err => {
                console.error(err);
            });
            
            
        }
    }

    a(){
        this.getComments().then(() => {

            this.commentContent();
        });
    }
    
    componentDidMount(){
        //Hämtar receptet
        this.getRecipe().then(() =>{
            //Om man är inloggad och den som är inloggad är den som skapat receptet
            if(sessionStorage.getItem("username") !== null && sessionStorage.getItem("username") === this.state.fetchData[0].username){
                //Håller receptets fetch data
                let recipeData = this.state.fetchData[0];
                
                /**
                 * Sparar det valda receptet och skickar användaren till sidan där de kan redigera sitt recept
                 */
                function editRecipe(){
                    sessionStorage.setItem("editRecipe", JSON.stringify(recipeData));
                    window.location.replace("/create");
                }

                /**
                 * Tar bort det valda receptet
                 */
                function removeRecipe(){
                    fetch("http://localhost:8080/Recipe/api/recipe/delete", {
                    method: "DELETE",
                    mode: 'cors',
                    headers: {
                        "RecipeId": sessionStorage.getItem("recipeId")
                    },
                    }).then((response) => {
                        if(response.ok){
                            alert("Recept borttaget");
                            sessionStorage.removeItem("recipeId");
                            window.location.replace("/");
                        }
                        return response.json();
                    }).catch(err => {
                        console.error(err);
                    });
                }
                
                /**
                 * Sätter knapparnas innehåll
                 */
                this.setState({creatorButtons: 
                    <div>
                        <button onClick={editRecipe}>Ändra receptet</button>
                        <button onClick={removeRecipe}>Ta bort receptet</button>
                    </div>
                });
            }
        });
        
        //Hämtar kommentarerna
        this.getComments().then(() =>{
            //Skapar kommentars innehåller på sidan
            this.commentContent();            
        });
    }

    render(){
        return(
            <main>
                {this.state.creatorButtons}
                {this.state.content}
                {this.state.commentContent}
            </main>
        );
    }
}

export default RecipeMain;