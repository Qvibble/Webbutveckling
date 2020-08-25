let input1,input2,result;


window.onload = init;

function init(){
    input1 = document.getElementById("input1");
    input2 = document.getElementById("input2");
    result = document.getElementById("result");

    document.getElementById("rectBtn").onclick = calcRect;
    document.getElementById("ellipBtn").onclick = calcEllip;
    document.getElementById("triBtn").onclick = calcTri;
    document.getElementById("conBtn").onclick = con;
}

function calcRect(){ //a = area
    let a = Number(input1.value) * Number(input2.value);
    result.innerHTML = "<p>Arean på rektangeln är " + a + " m<sup>2</sup></p>";

    a = (Number(input1.value) * 1.5) * (Number(input2.value) + 3);
    result.innerHTML += "<p>Arean med 50% ökad längd och 3m ökad bredd är " + a + " m<sup>2</sup></p>";
}

function calcEllip(){
    let a = 3.141592 * Number(input1.value) * Number(input2.value) / 4;
    result.innerHTML = "Arean på ellipsen är " + a + " m<sup>2</sup>";
}

function calcTri(){
    let a = (Number(input1.value) * Number(input2.value)) / 2;
    result.innerHTML = "<p>Arean på triangeln är " + a + " m<sup>2</sup></p>";

    a = (((Number(input1.value)*100)/30.48) * ((Number(input2.value)*100)/30.48)) / 2;
    result.innerHTML += "<p>Arean på triangeln är " + a + " fot<sup>2</sup></p>";
}

function con(){
    let dist;
    let unit = ["steg","fot","tum"];
    let conv = [90,30.48,2.54];

    result.innerHTML = "<p>Längden " + Number(input1.value) + " meter blir:</p>";

    for(let i = 0;i<3;i++){
        dist = (Number(input1.value)*100) / conv[i];
        result.innerHTML += "<p>" + dist + " " + unit[i] + "</p>";
    }
}
