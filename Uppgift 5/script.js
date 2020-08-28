// JavaScript
window.onload = init; // Se till att init aktiveras då sidan är inladdad

const FRUIT_NR = 5;

var nr;

let input1;
let input2;
let input3;
let message;
let selectedFruits;
let fruitImg;
let fruitNames = ["ingen frukt", "äpple", "banan", "citron", "apelsin", "päron"];
// Globala variabler


// Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd.
// Initiering av globala variabler samt koppling avfunktioner till knapparna.
function init() {
    input1 = document.getElementById("input1");
    input2 = document.getElementById("input2");
    input3 = document.getElementById("input3");

    message = document.getElementById("message");
    selectedFruits = document.getElementById("selectedFruits");
    fruitImg = document.getElementById("fruitImg");

    document.getElementById("btn1").onclick = showFruit;
    document.getElementById("btn2").onclick = checkName;
    document.getElementById("btn3").onclick = addFruits;
} // End init

function showFruit(){
    nr = parseInt(Number(input1.value)); //Tilldela nr värder och runda till helta
    let fruitUrl = "./pics/nofruit.jpg";

    input1.value = nr; //ändra textfältet till nr

    if(isNaN(nr)){//Kolla om nr faktsikt är ett nummer och inte t.ex en sträng
        message.innerHTML = "Måste vara siffror, ej text";
    }else if((nr <= FRUIT_NR) && (nr >= 1)){//kolla om nr är inom rätt intervall
        for(let i = 1; i <= nr; i++){
            if(nr === i){
                fruitUrl = "./pics/fruit" + i + ".jpg";
            }
        }
    }else{//nr är inte inom intervallet
        message.innerHTML = "Ange ett tal mellan 1 och 5";
    }

    fruitImg.src = fruitUrl;
}

function checkName(){
    let name = input2.value;//Kolla vad som står i textfältet
    let answer = "";

    if(isNaN(nr) || (nr === 0)){//Kolla om personen försökt välja en frukt och om det är ett nummer
        answer = "Välj en frukt först";
    }else if((nr <= FRUIT_NR) && (nr >= 1)){//Kolla om frukten ligger inom intervallet som är satt, i det här fallet är det 1-5 eftersom att det finns 5 frukter att välja mellan
        if(name === fruitNames[parseInt(Number(input1.value))]){//Kolla om frukten som visas på bilden stämmer överäns med det som står i textfältet
            answer = "Rätt namn";
        }else{
            answer = "Fel namn";
        }
    }else{
        answer = "Välj en frukt mellan 1-5";//Om personen försöker välja en frukt med högre eller lägre nummer än 1-5
    }

    message.innerHTML = answer;
}

function getNr(){
    let localNr =  parseInt(Number(input1.value));

    //Behövs ej???????????
    //Fattar inte 
}

function addFruits(){
    let amount = parseInt(Number(input3.value));
    let imgList = "";

    input3.value = amount;

    if(isNaN(nr) || isNaN(amount)){//Kolla om nr faktsikt är ett nummer och inte t.ex en sträng
        message.innerHTML = "Frukt måste vara vald";
    }else if((amount <= 9) && (amount >= 1)){//kolla om nr är inom rätt intervall
        for(let i = 0; i < amount; i++){
            imgList += "<img src='./pics/fruit" + nr +".jpg' alt='frukt'>";
        }

        message.innerHTML = "";
    }else{//amount är inte inom intervallet
        message.innerHTML = "Ange ett tal mellan 1 och 9";
    }

    selectedFruits.innerHTML += imgList;
}