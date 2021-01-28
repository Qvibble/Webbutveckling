var markedBoxes = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
var even = 0;
var tie = 0;

var myCanvas;
var tiles = [];

let myField;

class Tile {
    constructor(x, y, width, height, id, fillColor) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.fillColor = fillColor;

        this.workWidth = {
            start: x,
            end: x + width
        };

        this.workHeight = {
            start: y,
            end: y + width
        };
    }
}

window.onload = init;

function init(){
    myCanvas = document.getElementById("myCanvas");

    let ctx = myCanvas.getContext("2d");

    ctx.fillStyle = "beige";
    ctx.fillRect(0, 0, 640, 640);

    ctx.fillStyle = "slategray";

    for(let i = 0; i < 3; i++){
        ctx.fillRect((i*200 + i*10 + 10), 10, 200, 200);

        let tile = new Tile((i*200 + i*10 + 10), 10, 200, 200, i, "slategray");
        tiles.push(tile);
    }
    for(let i = 0; i < 3; i++){
        ctx.fillRect((i*200 + i*10 + 10), 10 + 200 + 10, 200, 200);

        let tile = new Tile((i*200 + i*10 + 10), 10 + 200 + 10, 200, 200, 3+i, "slategray");
        tiles.push(tile);
    }
    for(let i = 0; i < 3; i++){
        ctx.fillRect((i*200 + i*10 + 10), 10 + 200*2 + 10*2, 200, 200);

        let tile = new Tile((i*200 + i*10 + 10), 10 + 200*2 + 10*2, 200, 200, 6+i, "slategray");
        tiles.push(tile);
    }
    
    console.log(tiles);

    myCanvas.addEventListener("click", ()=>{
        checkTiles(event, ctx);
    });    


    /* myField = document.getElementById("myField");*/

    /*
    document.getElementById("btn1").onclick = mark;
    document.getElementById("btn2").onclick = mark;
    document.getElementById("btn3").onclick = mark;
    document.getElementById("btn4").onclick = mark;
    document.getElementById("btn5").onclick = mark;
    document.getElementById("btn6").onclick = mark;
    document.getElementById("btn7").onclick = mark;
    document.getElementById("btn8").onclick = mark;
    document.getElementById("btn9").onclick = mark;*/
}

function checkTiles(event, ctx){
    let clickX = event.layerX;
    let clickY = event.layerY;

    tiles.forEach((tile)=>{
        if(
            clickX > tile.workWidth.start &&
            clickX < tile.workWidth.end &&
            clickY > tile.workHeight.start &&
            clickY < tile.workHeight.end
        ){
            mark(tile.id, ctx);
        }
    });
}

/**
 * Byter färg på den knapp som klickas på.
 * Färgen alternerar mellan två olika färger.
 * Det går inte att markera en knapp som redan klickats på.
 * Efter en knapp blivit markerad så kollas det om någon vunnit med isGameWon();
 */
function mark(id, ctx){
    let btnId = "btn" + id;
    console.log(id);
    
    if(markedBoxes[btnId.charAt(3)] === -1)
        {
        markedBoxes[btnId.charAt(3)] = even;

        if(even === 0){
            tiles[id].fillColor = "plum";
            ctx.fillStyle = tiles[id].fillColor;
            ctx.fillRect(tiles[id].x, tiles[id].y, tiles[id].width, tiles[id].height);

            even = 1;
        }else{
            tiles[id].fillColor = "paleTurquoise";
            ctx.fillStyle = tiles[id].fillColor;
            ctx.fillRect(tiles[id].x, tiles[id].y, tiles[id].width, tiles[id].height);

            even = 0;
        }

        isGameWon(ctx);
    }
}

/**
 * Kollar om tre knappar i rad har blivit markerade av en spelare.
 * Kollar Vågrätt, Lodrätt och diagonalt.
 * Har någon vunnit så anropas gameOver(message, colour);
 */
function isGameWon(ctx){
    let row = 0;
    let won = -1;

    tie++;

    for(let i = 0; i < 3; i++){    //Kollar om någon vunnit vågrätt
        if(markedBoxes[0 + row] === 0 && markedBoxes[1 + row] === 0 && markedBoxes[2 + row] === 0){
            won = 0;
        }

        if(markedBoxes[0 + row] === 1 && markedBoxes[1 + row] === 1 && markedBoxes[2 + row] === 1){
            won = 1;
        }
        
        row += 3;
    }

    row = 0;

    for(let i = 0; i < 3; i++){     //Kollar om någon vunnit lodrätt
        if(markedBoxes[0 + row] === 0 && markedBoxes[3 + row] === 0 && markedBoxes[6 + row] === 0){
            won = 0;
        }

        if(markedBoxes[0 + row] === 1 && markedBoxes[3 + row] === 1 && markedBoxes[6 + row] === 1){
            won = 1;
        }

        row++;
    }

    for(let i = 0; i < 2; i++){     //Kollar om någon vunnit diagonalt
        if(markedBoxes[0] === i && markedBoxes[4] === i && markedBoxes[8] === i){
            if(i === 0){
                won = 0;
            }else{
                won = 1;
            }
        }

        if(markedBoxes[2] === i && markedBoxes[4] === i && markedBoxes[6] === i){
            if(i === 0){
                won = 0;
            }else{
                won = 1;
            }
        }
    }

    if(won !== -1){
        if(won === 0){
            gameOver("Won By Plum", "plum", ctx);
        }else{
            gameOver("Won By PaleTurquoise", "paleTurquoise", ctx);
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
function gameOver(message, color, ctx){
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 640, 640);
/*
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
    myField.style.backgroundColor = color;*/
}



