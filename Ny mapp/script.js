let input1;
let input2;
let result;
window.onload = init;

let testWord = prompt("ord", "test");
palindrom(String(testWord));



function init(){
    input1 = document.getElementById("input1");
    input2 = document.getElementById("input2");
    result = document.getElementById("result");

    document.getElementById("btn").onclick = calcSum;

    calcSum(1, 5);
    square(4);
    calcSquareSum(1,5);
    //palindrom;
}

//Övning 1
function calcSum(min, max){
    //let min = Number(input1.value);
    //let max = Number(input2.value);
    let sum = 0;
    
    for(let i = min+1; i < max; i++)
    {
        sum += i;
    }

    result.innerHTML = sum + "<br>";
}

//Övning 2
function square(value){
    result.innerHTML += value * value + "<br>";
}


//Övning 3
function calcSquareSum(min, max){
    let sum = 0;
    
    for(let i = min+1; i < max; i++)
    {
        sum += i*i;
    }

    result.innerHTML += sum + "<br>";
}

//Övning 4
function palindrom(word){
    let palin = true;
    let halfWordLength;

    if((String(word).length % 2) === 0){//Kolla om det är jämnt eller ojämnt, bokstaven i mitten behövs inte 
        halfWordLength = String(word).length / 2;
        
        for(let i = 0; i < halfWordLength; i++){
            document.write(String(word).charAt(i) + "<br>");
            document.write(String(word).charAt((halfWordLength * 2) - (i + 1)) + "<br>");

            if(word.charAt(i) === (word.charAt((halfWordLength * 2) - (i + 1)))){//Kollar om första och sista bokstaven är samma och jobbar sig innåt mot mitten
                document.write("samma<br>");
            } else{
                document.write("ej samma<br>");

                palin = false;
            }
        }
    } else{
        halfWordLength = (String(word).length - 1) / 2;//Bokstaven i mitten är orelevant

        for(let i = 0; i < halfWordLength; i++){
            document.write(String(word).charAt(i) + "<br>");
            document.write(String(word).charAt((halfWordLength * 2) - (i)) + "<br>");
            
            if(word.charAt(i) === (word.charAt((halfWordLength * 2) - (i)))){//Kollar om första och sista bokstaven är samma och jobbar sig innåt mot mitten
                document.write("samma<br>");
            } else{
                document.write("ej samma<br>");
    
                palin = false;
            }
        }   
    }

    document.write(word + " " + palin + "<br><br><br><br><br>");
}