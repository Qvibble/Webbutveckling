let input1,input2,result;

window.onload = init;

function init(){
    input1 = document.getElementById("input1");
    input2 = document.getElementById("input2");
    result = document.getElementById("result");

    document.getElementById("btn").onclick = calcSum;
}

function calcSum(min,max){
    let sum = 0;
    
    for(let i = min+1; i < max; i++)
    {
        sum += i;
    }

    result.innerHTML = sum;
}