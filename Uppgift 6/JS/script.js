var markedBoxes = [-5, -1, -1, -1, -1, -1, -1, -1, -1, -1];
var even = 0;
var tie = 0;

let myField;

window.onload = init;

function init(){
    myField = document.getElementById("myField");

    document.getElementById("btn1").onclick = mark;
    document.getElementById("btn2").onclick = mark;
    document.getElementById("btn3").onclick = mark;
    document.getElementById("btn4").onclick = mark;
    document.getElementById("btn5").onclick = mark;
    document.getElementById("btn6").onclick = mark;
    document.getElementById("btn7").onclick = mark;
    document.getElementById("btn8").onclick = mark;
    document.getElementById("btn9").onclick = mark;
}


/**
 * Byter färg på den knapp som klickas på.
 * Färgen alternerar mellan två olika färger.
 * Det går inte att markera en knapp som redan klickats på.
 * Efter en knapp blivit markerad så kollas det om någon vunnit med isGameWon();
 */
function mark(){
    let btnId = this.id;

    if(markedBoxes[btnId.charAt(3)] === -1)
        {
        markedBoxes[btnId.charAt(3)] = even;

        if(even === 0){
            this.style.backgroundColor = "plum";

            even = 1;
        }else{
            this.style.backgroundColor = "paleTurquoise";

            even = 0;
        }

        isGameWon();
    }
}

/**
 * Kollar om tre knappar i rad har blivit markerade av en spelare.
 * Kollar Vågrätt, Lodrätt och diagonalt.
 * Har någon vunnit så anropas gameOver(message, colour);
 */
function isGameWon(){
    let row = 0;
    let won = -1;

    tie++;

    for(let i = 0; i < 3; i++){    //Kollar om någon vunnit vågrätt
        if(markedBoxes[1 + row] === 0 && markedBoxes[2 + row] === 0 && markedBoxes[3 + row] === 0){
            won = 0;
        }

        if(markedBoxes[1 + row] === 1 && markedBoxes[2 + row] === 1 && markedBoxes[3 + row] === 1){
            won = 1;
        }
        
        row += 3;
    }

    row = 0;

    for(let i = 0; i < 3; i++){     //Kollar om någon vunnit lodrätt
        if(markedBoxes[1 + row] === 0 && markedBoxes[4 + row] === 0 && markedBoxes[7 + row] === 0){
            won = 0;
        }

        if(markedBoxes[1 + row] === 1 && markedBoxes[4 + row] === 1 && markedBoxes[7 + row] === 1){
            won = 1;
        }

        row++;
    }

    for(let i = 0; i < 2; i++){     //Kollar om någon vunnit diagonalt
        if(markedBoxes[1] === i && markedBoxes[5] === i && markedBoxes[9] === i){
            if(i === 0){
                won = 0;
            }else{
                won = 1;
            }
        }

        if(markedBoxes[3] === i && markedBoxes[5] === i && markedBoxes[7] === i){
            if(i === 0){
                won = 0;
            }else{
                won = 1;
            }
        }
    }

    if(won !== -1){
        if(won === 0){
            gameOver("Won By Plum", "plum");
        }else{
            gameOver("Won By PaleTurquoise", "paleTurquoise");
        }
    }

    if(tie === 9 && won === -1){    //Kollar om alla knappar klickats på, har ingen vunnit när alla klickats på så är det oavgjort
        gameOver("Tie");
    }
}

/**
 * Laddar om sidan så att spelet startas om.
 */
function replay(){
    window.location.reload();
}

/**
 * Tar bort de element i myField och visar vem som vunnit.
 * @param {String} message - Meddelande till game over skärmen
 * @param {String} colour - Färg på den spelare som vunnits
 */
function gameOver(message, colour){
    for(let i = 1; i <= 9; i++){
        document.getElementById("btn"+i).remove();
    }

    let text = document.createElement('p');
    text.setAttribute("class", "winner");
    text.innerHTML = message;

    let playAgain = document.createElement('button');
    playAgain.setAttribute("class", "playAgain");
    playAgain.innerHTML = "Play Again";
    playAgain.onclick = replay;

    myField.appendChild(text);
    myField.appendChild(playAgain);
    myField.id = 'gameWon';
    myField.style.backgroundColor = colour;
}