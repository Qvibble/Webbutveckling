let input1;
let input2;
let result;
window.onload = init;

//let testWord = prompt("ord", "test");
//palindrom(String(testWord));

largestPalindromeProduct();

function init(){
    /*input1 = document.getElementById("input1");
    input2 = document.getElementById("input2");
    result = document.getElementById("result");

    document.getElementById("btn").onclick = calcSum;*/

    //calcSum(1, 5);
    //square(4);
    //calcSquareSum(1,5);
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

function rand(){
    /*for(let i = 0; i < 100; i++){
        document.write(Math.round((Math.random()*(max-min)) + 1) + "<br>");
    }*/

    return (Math.floor((Math.random() * 20)) + 1);
}

function randArr(count){
    let arr = [];

    for(let i = 0; i < count; i++){
        arr[i] = rand();

        document.write((i+1)+ ".  " + arr[i] + "<br>");
    }

    return arr;
}

function hurra(array){  
    for(let i = 0; i < array.length; i++){
        if(Number(array[i]) > 10){
            document.write("Hurra, " + array[i] + "<br>");
        }
    }
}






function multiples(){
    const MAX = 1000;
    let sum = 0;
    
    for(let i = 1; i < MAX; i++){
        if(3*i < MAX){
            sum += 3*i;
        }

        if(5*i < MAX){
            sum += 5*i;         
        }

        if(15*i < MAX){
            sum -= 15*i;
        }
    }

    console.log(sum);
}

function largestPalindromeProduct(){
    const CHANGE = 1;
    let palindrome = 0;

    for(let i = 100; i < 1000; i++){
        for(let o = 100; o < 1000; o++){
            let product = i * o;
            let number = (i*o).toString();
            let uneven;

            if(product%2 === 0){
                uneven = 0;
            }else{
                uneven = 1;
            }

            for(let j = 0; j < (number.length-uneven) / 2; j++){
                let start = number.charAt(j);
                let end = number.charAt((number.length-1) - j);

                if(start.localeCompare(end) === 0){        
                }else{
                    break;
                }
                
                if(j === (number.length/2) - 1){
                    if(product > palindrome){
                        palindrome = product;    
                    }    
                }
            }

        }
    }
    console.log(palindrome);
}