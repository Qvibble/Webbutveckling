var formElem;  //Referens till form elementen
var radioButtons; //Referens till radio-knapparna
var checkButtons; //Referens till checkBox-knapparna
var cityField; //Referens till ort txt fält
var zipField;  //Referens till postnummer txt fält
var phoneField;  //Referens till telefonnummber txt fält
var codeField;  //Referends till kampanjkoden
var selectedNights;  //Referens till antal nätter elementet

window.onload = init;

function init(){
    formElem = document.querySelector("form");
    radioButtons = formElem.room.getElementsByTagName("input");
    checkButtons = formElem.extra.getElementsByTagName("input");
    selectedNights = formElem.nights;

    cityField = document.getElementById("city");
    zipField = document.getElementById("zipcode");
    phoneField = document.getElementById("telephone");
    codeField = formElem.campaign.querySelector("input");

    cityField.addEventListener("keyup", caps);
    zipField.addEventListener("keyup", checkZip);
    phoneField.addEventListener("keyup", checkPhone);
    codeField.addEventListener("keyup", checkCode);

    selectedNights.addEventListener("click", calcPrice);

    for(let i = 0; i < 3; i++){
        radioButtons[i].addEventListener("click", checkIfFamilyRoom);
        checkButtons[i].addEventListener("click", calcPrice);
    }

    checkIfFamilyRoom();
}

/*Aktivera / inaktivera olika delar av formuläret, beroende på vilken rumstyp som väljs.*/
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

    calcPrice();
}

/*Beräkna total kostnad. Varje gång användaren gör ett val som påverkar kostnaden, ska en ny beräkning göras.*/
function calcPrice(){
    let i = 0;  //Loop variabel
    let cut;  //String cut location
    let totalCost = 0;  //Alla valda alternativ ihopräknade

    for(i = 0; i < 3; i++){
        if(radioButtons[i].checked){
            cut = radioButtons[i].value.search(",");  //, position. Priset kommer efter ,-tecknet
            totalCost += parseInt(radioButtons[i].value.slice(cut + 1, radioButtons[i].value.length));
        }

        if(checkButtons[i].checked){
            if(checkButtons[i].disabled === false){
                cut = checkButtons[i].value.search(",");  //, position. Priset kommer efter ,-tecknet
                totalCost += parseInt(checkButtons[i].value.slice(cut + 1, checkButtons[i].value.length));                
            }
        }
    }

    totalCost = totalCost * selectedNights.value;

    document.getElementById("totalCost").innerHTML = totalCost;
}

/*I fältet för ort ska bokstäverna ändras till versaler.*/
function caps(){
    let content = document.getElementById("city").value;
    content = content.toUpperCase();

    document.getElementById("city").value = content;
}

/*I fälten för postnummer och telefonnummer ska innehållet kontrolleras med hjälp av reguljära uttryck.*/
function checkZip(){
    let reg = /^\d{5}$/;  //Reguljärt uttryck

    if(!reg.test(zipField.value)){
        this.style.backgroundColor = "red";
    }else{
        this.style.backgroundColor = "white";
    }
}

function checkPhone(){
    let reg = /^\d{10}$/;  //Reguljärt uttryck

    if(!reg.test(phoneField.value)){
        this.style.backgroundColor = "red";
    }else{
        this.style.backgroundColor = "white";
    }
}

/*Kampanjkoden ska också kontrolleras med ett reguljärt uttryck. För varje nytt tecken som skrivs, ska det ges en feedback genom bakgrundsfärgen.*/
function checkCode(){
    let reg = /^[A-Z]{4}\d{2}$/;

    if(!reg.test(codeField.value)){
        this.style.backgroundColor = "red";
    }else{
        this.style.backgroundColor = "white";
    }
}