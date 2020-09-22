console.log("funkar");

class ingredient{
    constructor(ingredient, amount){
        this.ingredient = ingredient;
        this.amount = amount;
    }
}

let ingredients = [new ingredient("pasta", "27 kg"), new ingredient("vatten", "3 ml"), new ingredient("pastavatten", "58")];

let food = {    //Objekt
    title: "mat",
    rating: 0,
    ingredients: ingredients,
    steps: ["aa", "bb"],
    servings: 5
}

for(let i = 0; i < food.steps.length; i++){
    console.log(food.steps[i]);
}

for(let i = 0; i < food.ingredients.length; i++){
    console.log(food.ingredients[i]);
}


//Klass



/*
class Book{
    constructor(title, author, hasRead){
        this.title = title;
        this.author = author;
        this.hasRead = hasRead;
    }

    info(){
        let rtrn;

        if(this.hasRead === true){
            rtrn = "I have read " + this.title + " by " + this.author;
        }else{
            rtrn = "I have NOT read " + this.title + " by " + this.author;
        }

        return rtrn;
    }

}

let book = [new Book("Gamea", "boi", true), 
            new Book("BAsaw", "asa", false), 
            new Book("vcawwa", "baas", true), 
            new Book("fwaafw", "jrr", false), 
            new Book("grdd", "awwa", false)];

for(let i = 0; i < book.length; i++){
    console.log(book[i].info());
}*/