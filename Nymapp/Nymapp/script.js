var player;


window.onload = startGame;

function startGame(){
    player = new component(50, 50, 0, 0, "orange");
    gameArea.create();
    window.addEventListener("keydown", move)
}

var gameArea = {
    canvas: document.createElement("canvas"),
    create: function() {
        this.canvas.width = 500;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");
        this.context.fillStyle = "aliceblue";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear: function() {
        this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = "aliceblue";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, xPos, yPos, color){
    this.width = width;
    this.height = height;
    this.xPos = xPos;
    this.yPos = yPos;
    this.color = color;

    this.update = function() {
        let context = gameArea.context;
        context.fillStyle = this.color;
        context.fillRect(this.xPos, this.yPos, this.width, this.height);    
    }
}

function updateGameArea(){
    gameArea.clear();
    player.update();
}

function move(event){
    if(event.key == "ArrowDown"){
        player.yPos += 5;
    }
    else if(event.key == "ArrowUp"){
        player.yPos -= 5;
    }
    else if(event.key == "ArrowLeft"){
        player.xPos -= 5;
    }
    else if(event.key == "ArrowRight"){
        player.xPos += 5;
    }
}