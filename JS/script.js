let name = ["Om Mig", "Uppgift 4", "Uppgift 5", "Uppgift 6"];

window.onload = createElements;

function createElements(){
    for(let i = 0; i < name.length; i++){
        createNavBtn(name[i], i);
    }
}

function createNavBtn(name, index){
    let clmn = document.createElement("div");
    clmn.setAttribute("class", "column");
    clmn.setAttribute("id", "clmn" + index);
    document.getElementById("nav").appendChild(clmn);

    let strong = document.createElement("strong");
    strong.setAttribute("id", "str" + index)
    document.getElementById("clmn" + index).appendChild(strong);

    let a = document.createElement("a");
    a.setAttribute("class", "button is-primary");

    let temp = name.replace(" ", "");

    if(name.includes("Uppgift")){
        a.setAttribute("href", "./" + temp + "/" + temp + ".html");
    }else{
        a.setAttribute("href", temp + ".html");
    }

    document.getElementById("str" + index).appendChild(a);

    a.innerHTML = name;
}