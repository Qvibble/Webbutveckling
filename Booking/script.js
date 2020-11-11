/*Aktivera / inaktivera olika delar av formuläret, beroende på vilken rumstyp som väljs.*/

/*Beräkna total kostnad. Varje gång användaren gör ett val som påverkar kostnaden, ska en ny beräkning göras.*/

/*I fältet för ort ska bokstäverna ändras till versaler.*/

/*I fälten för postnummer och telefonnummer ska innehållet kontrolleras med hjälp av reguljära uttryck.*/

/*Kampanjkoden ska också kontrolleras med ett reguljärt uttryck. För varje nytt tecken som skrivs, ska det ges en feedback genom bakgrundsfärgen.*/

var formElem;  //Referens till form elementen
var radioButtons; //Referens till radio-knapparna
var checkButtons; //Referens till checkBox-knapparna

window.onload = init;

function init(){
    formElem = document.querySelector("form");
    radioButtons = formElem.room.getElementsByTagName("input");
    checkButtons = formElem.extra.getElementsByTagName("input");

    for(let i = 0; i < radioButtons.length; i++){
        radioButtons[i].addEventListener("click", checkIfFamilyRoom);
    }

    checkIfFamilyRoom();
}

function checkIfFamilyRoom(){
    if(radioButtons[2].checked){
        formElem.persons.disabled = false;  //Går att välja antal personer
        formElem.persons.parentNode.style.color = "#000";
        
        checkButtons[2].disabled = true;  //Går inte att välja sjöutsikt
        checkButtons[2].parentNode.style.color = "#999";
    }else{        
        formElem.persons.disabled = true;  //Går inte att välja antal personer
        formElem.persons.parentNode.style.color = "#999";

        checkButtons[2].disabled = false;  //Går att välja sjöutsikt
        checkButtons[2].parentNode.style.color = "#000";
    }
}