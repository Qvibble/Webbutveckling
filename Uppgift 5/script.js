// JavaScript
window.onload = init; // Se till att init aktiveras då sidan är inladdad

const FRUIT_NR = 5;

var nr;

let input1;
let input2;
let message;
let fruitImg;
let fruitNames = ["ingen frukt", "äpple", "banan", "citron", "apelsin", "päron"];
// Globala variabler


// Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd.
// Initiering av globala variabler samt koppling avfunktioner till knapparna.
function init() {
    input1 = document.getElementById("input1");
    input2 = document.getElementById("input2");

    message = document.getElementById("message");
    fruitImg = document.getElementById("fruitImg");

    document.getElementById("btn1").onclick = showFruit;
    document.getElementById("btn2").onclick = checkName;
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
    let name = input2.value;
    let answer = "";

    if(isNaN(nr) || (nr === 0)){
        answer = "Välj en frukt först";
    }else if((nr <= FRUIT_NR) && (nr >= 1)){
        if(name === fruitNames[parseInt(Number(input1.value))]){
            answer = "Rätt namn";
        }else{
            answer = "Fel namn";
        }
    }else{
        answer = "Välj en frukt mellan 1-5";
    }

    message.innerHTML = answer;
}