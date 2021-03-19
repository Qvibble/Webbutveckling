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
            steps: sFields,
            categories: [],
            ingFieldsCounter: 1,
            stepFieldsCounter: 1
        };

        this.renderCounter = 0;

        this.createIngredientFields = this.createIngredientFields.bind(this);
        this.createStepsFields = this.createStepsFields.bind(this);
        this.getCategories = this.getCategories.bind(this);
        this.createRecipe = this.createRecipe.bind(this);
        this.checkFields = this.checkFields.bind(this);
        this.changeButtonState = this.changeButtonState.bind(this);
        this.editRecipe = this.editRecipe.bind(this);
    }

    /**
     * Lägger till receptet i databasen
     * @param {*} event 
     */
    createRecipe(event){
        event.preventDefault();
        
        //Error message
        let errorMessage = document.getElementById("error");        

        //Sträng som håller alla steg
        let steps = "";
        //Lägger ihop alla steg till en sträng
        for(let i = 0; i < this.state.createForm.steps.value; i++){
            steps += document.getElementById("step"+(i+1)).value.trim() + "|";
        }

        /**
         * Gör första bokstaven stor
         * 
         * @param {*} string 
         * @returns 
         */
        function firstLetterUpperCase(string){
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        //Array som håller alla ingredienser
        let ingredients = [];
        //Lägger in ingredienserna
        for(let i = 0; i < this.state.createForm.ingredients.value; i++){
            ingredients.push(
                {
                    "name": firstLetterUpperCase(document.getElementById("ingredient"+(i+1)).value.trim()),
                    "amount": document.getElementById("amount"+(i+1)).value.trim()
                }
            );
        }

        //Array som håller alla kategorier
        let categories = [];
        for(let i = 0; i < this.state.categories.length; i++){
            categories.push(
                {
                    "name": this.state.categories[i]
                }
            );
        }

        //Skapar b64 av bilden
        let file = document.getElementById("createForm").image.files[0];
        let result = "";
        const toBase64 = file=> new Promise((reslove, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () =>reslove(reader,result);
            reader.onerror = error => reject(error);
        });

        /* När bilden är konverterad, skicka receptet till databasen */
        toBase64(file).then(promise => {
            let image = promise.result;

            
            //JSON som ska skickas  till backend
            let recipeData = {
                "username": sessionStorage.getItem("username"),
                "name": this.state.createForm.name.value.trim(),
                "description": this.state.createForm.description.value.trim(),
                "steps": steps,
                "ingredients": ingredients,
                "categories": categories,
                "image": image,
                "likes": 0
            };
            
            fetch("http://localhost:8080/Recipe/api/recipe/create", {
                method: "POST",
                mode: 'cors',
                headers: {
                    "Content-type": "text/plain"
                },
                body: JSON.stringify(recipeData)
            }).then((response) => {
                /* Om det inte gick att skapa receptet */
                if(response.status === 400){
                    errorMessage.innerHTML = "Det gick inte att skapa receptet";
                }
                    /* Om det gick att skapa receptet */
                if(response.ok){
                    window.location.replace("/user");
                }
                    return response.json();
            }).catch(err => {
                console.error(err);
            });
        });
    }

    /**
     * Ändrar recepter i databasen
     * @param {*} event 
     */
    editRecipe(event){
        event.preventDefault();
        
        //Error message
        let errorMessage = document.getElementById("error");        

        //Sträng som håller alla steg
        let steps = "";

        //Lägger ihop alla steg till en sträng
        for(let i = 0; i < this.state.createForm.steps.value; i++){
            steps += document.getElementById("step"+(i+1)).value.trim() + "|";
        }

        /**
         * Gör första bokstaven stor
         * 
         * @param {*} string 
         * @returns 
         */
        function firstLetterUpperCase(string){
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        //Array som håller alla ingredienser
        let ingredients = [];
        //Lägger in ingredienserna
        for(let i = 0; i < this.state.createForm.ingredients.value; i++){
            ingredients.push(
                {
                    "name": firstLetterUpperCase(document.getElementById("ingredient"+(i+1)).value.trim()),
                    "amount": document.getElementById("amount"+(i+1)).value.trim()
                }
            );
        }

        //Array som håller alla kategorier
        let categories = [];
        for(let i = 0; i < this.state.categories.length; i++){
            categories.push(
                {
                    "name": this.state.categories[i]
                }
            );
        }

        //Skapar b64 av bilden         
        let file = document.getElementById("createForm").image.files[0];
        let result = "";
        const toBase64 = file=> new Promise((reslove, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () =>reslove(reader,result);
            reader.onerror = error => reject(error);
        });

        /* När bilden är konverterad, skicka receptet till databasen */
        toBase64(file).then(promise => {
            let image = promise.result;

            
            //JSON som ska skickas  till backend
            let recipeData = {
                "id": sessionStorage.getItem("recipeId"),
                "username": sessionStorage.getItem("username"),
                "name": this.state.createForm.name.value.trim(),
                "description": this.state.createForm.description.value.trim(),
                "steps": steps,
                "ingredients": ingredients,
                "categories": categories,
                "image": image,
                "likes": 0
            };
            
            fetch("http://localhost:8080/Recipe/api/recipe/edit", {
                method: "PUT",
                mode: 'cors',
                headers: {
                    "Content-type": "text/plain"
                },
                body: JSON.stringify(recipeData)
            }).then((response) => {
                /* Om det inte gick att ändra receptet */
                if(response.status === 400){
                    errorMessage.innerHTML = "Det gick inte att ändra receptet";
                }
                    /* Om det gick att ändra receptet */
                if(response.ok){
                    window.location.replace("/user");
                }
                    return response.json();
            }).catch(err => {
                console.error(err);
            });
        });
    }


    /**
     * Skapar X antal fält för ingredienser
     */
    createIngredientFields(){ 
        //Antal max fält som kan skapas
        let amountOfFields = this.state.createForm.ingredients.value;
        //Håller objekten som ska skapas
        let fields = [];

        if(sessionStorage.getItem("editRecipe") !== null){
            let recipeData = JSON.parse(sessionStorage.getItem("editRecipe"));

            for(let i = 0; i < amountOfFields; i++){
                fields.push(<input type="text" id={"ingredient"+(i+1)} name={"ingredient"+(i+1)} key={"ingredient"+(i+1)} defaultValue={recipeData.ingredients[i].name}/>);
                fields.push(<input type="text" id={"amount"+(i+1)} name={"amount"+(i+1)} key={"amount"+(i+1)} defaultValue={recipeData.ingredients[i].amount}/>);
            }
        }else{
            for(let i = 0; i < amountOfFields; i++){
                fields.push(<input type="text" id={"ingredient"+(i+1)} name={"ingredient"+(i+1)} key={"ingredient"+(i+1)}/>);
                fields.push(<input type="text" id={"amount"+(i+1)} name={"amount"+(i+1)} key={"amount"+(i+1)}/>);
            }
        }
        
        this.setState({ingredients : fields});
        this.checkFields();
    }

    /**
     * Skapar X antal fält för steg
     */
    createStepsFields(){
        //Antal max fält som kan skapas
        let amountOfFields = this.state.createForm.steps.value;
        //Håller objekten som ska skapas
        let fields = [];

        /* Om man vill ändra ett recept så skapas fält med recept informationen annars skapas tomma fält */
        if(sessionStorage.getItem("editRecipe") !== null){
            let recipeData = JSON.parse(sessionStorage.getItem("editRecipe"));
            //Håller stegen
            let steps = recipeData.steps.split("|");
            //Tar bort det tomma fältet i arrayen
            steps.pop();         

            for(let i = 0; i < amountOfFields; i++){
                fields.push(<label htmlFor={"step"+(i+1)} key={"nr"+(i+1)}>{(i+1)}.</label>);
                fields.push(<textarea id={"step"+(i+1)} name={"step"+(i+1)} rows="3" key={"step"+(i+1)} defaultValue={steps[i]}></textarea>);
            }
        }else{
            for(let i = 0; i < amountOfFields; i++){
                fields.push(<label htmlFor={"step"+(i+1)} key={"nr"+(i+1)}>{(i+1)}.</label>);
                fields.push(<textarea id={"step"+(i+1)} name={"step"+(i+1)} rows="3" key={"step"+(i+1)}></textarea>);
            }
        }
        
        this.setState({steps : fields});
        this.checkFields();
    }
    
    /**
     * Kollar alla fält så att de inte är tomma
     */
    checkFields(){
        //Tomma = true, ifyllda = false
        const EMPTY = true;

        //För namn + beskrivning
        let firstFields = !EMPTY;
        //För ingredienserna
        let ingFields = !EMPTY;
        //För stegen
        let stepFields = !EMPTY;
        //För bilden
        let image = !EMPTY;        
        //Håller koll på antalet tomma rader i loopar. 0 = inga tomma fält
        let counter = 0;

        //Kollar namnet och beskrivningen
        if(this.state.createForm.name.value.trim() === "" || this.state.createForm.description.value.trim() === ""){
            firstFields = EMPTY;
        }

        //Kollar ingrediens fälten
        for(let i = 0; i < this.state.ingFieldsCounter; i++){
            if(document.getElementById("ingredient"+(i+1)).value.trim() === "" || document.getElementById("amount"+(i+1)).value.trim() === ""){
                counter++;
            }
        }

        //Om counter > 0 så fanns det tomma fält
        if(counter > 0){
            ingFields = EMPTY;
        }

        //Återställer counter till nästa loop
        counter = 0;

        //Kollar steg fälten
        for(let i = 0; i < this.state.stepFieldsCounter; i++){
            if(document.getElementById("step"+(i+1)).value.trim() === ""){
                counter++;
            }
        }

        //Om counter > 0 så fanns det tomm fält
        if(counter > 0){
            stepFields = EMPTY;
        }

        //Kollar en bild är tillagd
        if(this.state.createForm.image.value === ""){
            image = EMPTY;
        }

        /* Finns det tomma fält, avaktivera knappen. Annars, aktivera den */
        if(firstFields === EMPTY || ingFields === EMPTY || stepFields === EMPTY || image === EMPTY){
            this.changeButtonState(EMPTY);
        }else{
            this.changeButtonState(!EMPTY);
        }        
        
        //Ökar hur många fält som finns så att fält som inte skapats ännu kollas
        this.setState({ingFieldsCounter: this.state.createForm.ingredients.value});
        this.setState({stepFieldsCounter: this.state.createForm.steps.value});
    }

    /**
     * Sparar kategorierna som är valda
     */
    getCategories(event){
        /* Om kategorin redan är tillagd, ta bort den och byt knapp färg till vit */
        /* Annars läggs kategorin till och färgen byts */
        if(this.state.categories.includes(event.target.value)){
            //Returnerar det som tas bort, måste separeras annars så sparas bara det som tas bort
            this.state.categories.splice(this.state.categories.indexOf(event.target.value), 1)

            this.setState({categories: this.state.categories});
            event.target.style.backgroundColor = "white";
        }else{
            this.setState({categories: this.state.categories.concat(event.target.value)});
            event.target.style.backgroundColor = "tomato";
        }
 
        console.log(this.state.categories);
    }

    changeButtonState(empty){
        if(empty === true){
            this.state.createForm.submitBtn.disabled = true;
            this.state.createForm.submitBtn.style.color = "gray";
            this.state.createForm.submitBtn.style.cursor = "default";
            this.state.createForm.submitBtn.style.borderColor = "gray";
        }else{
            this.state.createForm.submitBtn.disabled = false;
            this.state.createForm.submitBtn.style.color = "black";
            this.state.createForm.submitBtn.style.cursor = "pointer";
            this.state.createForm.submitBtn.style.borderColor = "black";
        }
    }

    componentWillUnmount(){
        //tar bort receptet som skulle ändras från session storage
        sessionStorage.removeItem("editRecipe");
        console.log("unmounted");
    }

    componentDidMount(){        
        /* Om användaren inte är inloggad, skicka användaren till logga in sidan */
        window.addEventListener ("beforeunload",()=>{sessionStorage.removeItem("editRecipe")});
        if(sessionStorage.getItem("username") === null){
            window.location.replace("/login");
        }

        //Referens till formuläret
        this.state.createForm = document.getElementById("createForm");
       //Om det inte finns ett recept som ska ändras
       //Avaktiverar skapa recept knappen eftersom att inget är ifyllt i början
       this.changeButtonState(true);
       //Steps selector
       this.state.createForm.steps.addEventListener("click", this.createStepsFields);
       //Ingredients selector
       this.state.createForm.ingredients.addEventListener("click", this.createIngredientFields);
       //Input event listener
       this.state.createForm.addEventListener("input", this.checkFields);
       
        if(sessionStorage.getItem("editRecipe") !== null){
            let recipeData = JSON.parse(sessionStorage.getItem("editRecipe"));
            //Ändrar titel
            document.querySelector("h1").innerHTML = "Ändra recept";
            //Namn
            this.state.createForm.name.value = recipeData.name;
            //Beskrivning
            this.state.createForm.description.value = recipeData.description;

            //Ingredienser
            //Skapar input fälten
            this.state.createForm.ingredients.value = recipeData.ingredients.length;
            //Fyller fälten
            this.createIngredientFields();

            //Steg            
            let steps = recipeData.steps.split("|");
            //Tar bort det tomma fältet i arrayen
            steps.pop();       
            ////Skapar input fälten
            this.state.createForm.steps.value = steps.length;
            this.createStepsFields();
            
            /**
             * Gör första bokstaven stor
             * 
             * @param {*} string 
             * @returns 
             */
            function firstLetterUpperCase(string){
                return string.charAt(0).toUpperCase() + string.slice(1);
            }

           //Kategorier
            for(let i = 0; i < recipeData.categories.length; i++){
                this.state.categories = this.state.categories.concat(firstLetterUpperCase(recipeData.categories[i].name));
                this.state.createForm[recipeData.categories[i].name].style.backgroundColor = "tomato";
            }
        }
    }

    render(){
        //Render counter börjar på 0
        //Ökas med 1 varje gång render körs
        //Fråga mig inte om -1, fråga David
        //Behövs inte men är för konstig för att ta bort
        //if(this.renderCounter > 1){
        //    this.renderCounter--;
        //}
        //this.renderCounter++;

        let btnValue = "";
        ////Referens till vilken funktion som ska köras vid submit
        let onSubmitFunction = "";
        //Om det inte finns ett recept som ska ändras
        if(sessionStorage.getItem("editRecipe") === null){
            onSubmitFunction = this.createRecipe;
            btnValue = "Skapa receptet";
        }else{
            onSubmitFunction = this.editRecipe;
            btnValue = "Ändra receptet";
        }

        return(
            <main>
                <h1>Skapa Recept</h1>
                <form action="/user" id="createForm" onSubmit={onSubmitFunction}>
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
    
                    <section id="test" name="test">
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
    
                    <label htmlFor="categories">Kategorier</label>
                    <section id="categories">
                        <input type="button" name="nöt" value="Nöt" onClick={this.getCategories}/>
                        <input type="button" name="fläsk" value="Fläsk" onClick={this.getCategories}/>
                        <input type="button" name="kyckling" value="Kyckling" onClick={this.getCategories}/>
                        <input type="button" name="fisk" value="Fisk" onClick={this.getCategories}/>
                        <input type="button" name="vegetariskt" value="Vegetariskt" onClick={this.getCategories}/>
                        <input type="button" name="veganskt" value="Veganskt" onClick={this.getCategories}/>
                        <input type="button" name="förrätt" value="Förrätt" onClick={this.getCategories}/>
                        <input type="button" name="varmrätt" value="Varmrätt" onClick={this.getCategories}/>
                        <input type="button" name="efterrätt" value="Efterrätt" onClick={this.getCategories}/>
                    </section>

                    <label htmlFor="image">Bild</label>
                    <input type="file" name="image" id="image" />
                    <p id="error"></p>
                    <input type="submit" name="submitBtn" value={btnValue}/>
                </form>
            </main>
        );
    }
}

export default CreateMain;