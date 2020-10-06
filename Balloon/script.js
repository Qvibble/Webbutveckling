var counter = 1;
var increase = 10;
/*
window.onload = init;

function init(){
    let p = document.querySelector("p");

    window.addEventListener("keydown", event => {
        if(counter*increase >= 1000){
            p.innerHTML = "💥";
            p.removeEventListener("keydown", event);
        }
    
        if(event.key == "ArrowUp"){
            size("+");      
        }
        if(event.key == "ArrowDown"){
            size("-");     
        }  
   })
}

function size(input){
    if(input === "+"){
        document.body.style.fontSize = ++counter * increase + "%";
    }else if(input === "-"){
        document.body.style.fontSize = --counter * increase + "%";
    }
}*/

/*
function balloon(){
    if(event.key == "ArrowUp"){
        document.body.style.fontSize = ++counter * increase + "%";
    }
    if(event.key == "ArrowDown"){
        document.body.style.fontSize = --counter * increase + "%";
    }

    if(counter*increase >= 1000){
        document.querySelector("p").innerHTML = "💥";
        window.removeEventListener("keydown", balloon);
    }
}*/

/*
function balloon(){
    if(event.key == "ArrowUp"){
        document.body.style.fontSize = ++counter * increase + "%";
    }
    if(event.key == "ArrowDown"){
        document.body.style.fontSize = --counter * increase + "%";
    }

    if(counter*increase >= 1000){
        document.querySelector("p").innerHTML = "💥";
        window.removeEventListener("keydown", balloon);
    }
}
*/

window.addEventListener("keydown", keyEvent);

function keyEvent(event){
    if(event.key == "ArrowUp"){
        document.body.style.fontSize = ++counter * increase + "%";


        if(counter*increase >= 1000){
            document.querySelector("p").innerHTML = "💥";
            window.removeEventListener("keydown", keyEvent);
        }
    }
    if(event.key == "ArrowDown"){
        document.body.style.fontSize = --counter * increase + "%";

    }
    
}