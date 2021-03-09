import React from "react";

class CreateMain extends React.Component{
    constructor(props){
        super(props);

        //Håller fälten som skapas
        let iFields = []; //Ingredienser
        let sFields = []; //Steg
        /* Minst en rad ska finnas */
        iFields.push(<input type="text" id={"ingredient"+1} name={"ingredient"+1} key={"ingredient"+1}/>);
        iFields.push(<input type="text" id={"amount"+1} name={"amount"+1} key={"amount"+1}/>);

        sFields.push(<label htmlFor={"step"+1}>1.</label>);
        sFields.push(<textarea id={"step"+1} name={"step"+1} rows="3" key={"step"+1}></textarea>);
        
        /* Fälten sparas */
        this.state = {
            createForm: "",
            ingredients: iFields,
            steps: sFields
        };

        this.createIngredientFields = this.createIngredientFields.bind(this);
        this.createStepsFields = this.createStepsFields.bind(this);
        this.createRecipe = this.createRecipe.bind(this);
    }

    /**
     * Lägger till receptet i databasen
     * @param {*} event 
     */
    createRecipe(event){
        event.preventDefault();

        //Sträng som håller alla steg
        let steps = "";
        //Lägger ihop alla steg till en sträng
        for(let i = 0; i < this.state.createForm.steps.value; i++){
            steps += (i+1) + "." + document.getElementById("step"+(i+1)).value + "|";
        }

        //JSON som ska skickas  till backend
        let recipeData = {
            "username": sessionStorage.getItem("username"),
            "name": this.state.createForm.name.value,
            "description": this.state.createForm.description.value,
            "steps": steps,
            "ingredients": [],
            "image": this.state.image.value,
            "likes": 0
        };

        console.log(recipeData);
    }

    /**
     * Skapar X antal fält för ingredienser
     */
    createIngredientFields(){ 
        //Antal max fält som kan skapas
        let amountOfFields = this.state.createForm.ingredients.value;
        //Håller objekten som ska skapas
        let fields = [];

        for(let i = 0; i < amountOfFields; i++){
            fields.push(<input type="text" id={"ingredient"+(i+1)} name={"ingredient"+(i+1)} key={"ingredient"+(i+1)}/>);
            fields.push(<input type="text" id={"amount"+(i+1)} name={"amount"+(i+1)} key={"amount"+(i+1)}/>);
        }
        
        this.setState({ingredients : fields});
    }

    /**
     * Skapar X antal fält för steg
     */
    createStepsFields(){
        //Antal max fält som kan skapas
        let amountOfFields = this.state.createForm.steps.value;
        //Håller objekten som ska skapas
        let fields = [];

        for(let i = 0; i < amountOfFields; i++){
            fields.push(<label htmlFor={"step"+(i+1)} key={"nr"+(i+1)}>{(i+1)}.</label>);
            fields.push(<textarea id={"step"+(i+1)} name={"step"+(i+1)} rows="3" key={"step"+(i+1)}></textarea>);
        }
        
        this.setState({steps : fields});
    }
    
    componentDidMount(){
        /* Om användaren inte är inloggad, skicka användaren till logga in sidan */
        if(sessionStorage.getItem("username") === null){
            window.location.replace("/login");
        }

        //Referens till formuläret
        this.state.createForm = document.getElementById("createForm");

        //Ingredients selector
        this.state.createForm.ingredients.addEventListener("click", this.createIngredientFields);

        //Steps selector
        this.state.createForm.steps.addEventListener("click", this.createStepsFields);
    }

    render(){
        return(
            <main>
                <h1>Skapa Recept</h1>
                <form action="/user" id="createForm" onSubmit={this.createRecipe}>
                    <label htmlFor="name">Namn</label>
                    <input type="text" id="name" name="name"/>
                    
                    <label htmlFor="description">Beskrivning</label>
                    <textarea id="description" name="description"rows="10"></textarea>
    
                    <span>
                        <label htmlFor="ingredients">Ingredienser</label>
                        <select id="ingredients" name="ingredients">                        
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                        </select>
                        <label>Mängd</label>
                    </span>
    
                    <section>
                        {this.state.ingredients}
                    </section>
    
                    <span>
                        <label htmlFor="steps">Steg</label>
                        <select id="steps" name="steps">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                        </select>
                    </span>

                    {this.state.steps}
    
                    <label htmlFor="image">Bild</label>
                    <input type="file" id="image" />
                    <input type="submit" value="Skapa receptet"/>
                </form>
            </main>
        );
    }
}

export default CreateMain;