/*console.log("funkar");

let food = {    //Objekt
    title: "mat",
    rating: 0,
    ingredients: {
        name: ["pasta", "vatten", "pastavatten"],
        amount: ["27kg", "3ml", "58"]
    },
    steps: ["aa", "bb"],
    servings: 5
}

for(let i = 0; i < food.steps.length; i++){
    console.log(food.steps[i]);
}

for(let i = 0; i < food.ingredients.amount.length; i++){
    console.log(food.ingredients.amount[i]);
}

for(let i = 0; i < food.ingredients.name.length; i++){
    console.log(food.ingredients.name[i]);
}*/

//Klass

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
}