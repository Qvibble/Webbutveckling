const WINDOWWIDTH = 800;
const WINDOWHEIGHT = 400;
const KEY = Object.freeze({"W" : 87, "S" : 83});

var myCanvas;  //Reference to canvas
var ctx;  //Contenxt
var ball;  //Game ball
var player1;

class Ball{
    constructor(x, y, r){
        this.x = x;
        this.y = y;
        this.r = r;

        this.SPEED = 2;

        this.xSpeed = this.SPEED;
        this.ySpeed = this.SPEED;
    }

    draw(){
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.r, this.r, 0, 0, Math.PI*2, false);
        ctx.fill();
        ctx.closePath();
    }

    move(){
        this.x += this.xSpeed;
        this.y += this.ySpeed;
 
        //Top
        if(this.y <= 0){
            this.ySpeed = this.SPEED;
        }
        //Bottom
        if(this.y >= WINDOWHEIGHT){
            this.ySpeed = -this.SPEED;
        } 
        //Left
        if(this.x <= 0){
            this.xSpeed = this.SPEED;
        }
        //Right
        if(this.x >= WINDOWWIDTH){
            this.xSpeed = -this.SPEED;
        }

        document.getElementById("xPos").innerHTML = "xPos: " + this.x;
        document.getElementById("xSpeed").innerHTML = "xSpeed: " + this.xSpeed;
        document.getElementById("yPos").innerHTML = "yPos: " + this.y;
        document.getElementById("ySpeed").innerHTML = "ySpeed: " + this.ySpeed;
    }
}

class Pong{
    constructor(){        
        this.WIDTH = 15;
        this.HEIGHT = 75;
        
        this.X = 100;
        this.y = WINDOWHEIGHT/2 - this.HEIGHT/2; 
    }

    draw(){
        ctx.fillStyle = "white";
        ctx.fillRect(this.X, this.y, this.WIDTH, this.HEIGHT);
    }

    move(event){
        if(KEY.W === event.keyCode || KEY.S === event.keyCode){
            console.log("tes");

            if(event.keyCode === KEY.W){
                this.y -= 4;
            }
    
            if(event.keyCode === KEY.S){
                this.y += 4;
            }

            event.preventDefault();
        }

    }
}


window.onload = init;

setInterval(gameLoop, 10);

function init(){
    myCanvas = document.querySelector("canvas");
    ctx = myCanvas.getContext("2d");

    ctx.fillStyle = "aquamarine";
    ctx.fillRect(0, 0, 800, 400);

    ctx.fillStyle = "white";

    player1 = new Pong();

    document.addEventListener("keydown",(e)=>{
        player1.move(e);
    });

    ball = new Ball(WINDOWWIDTH/2, WINDOWHEIGHT/2, 10);
}

function gameLoop(){
    draw();
    move();
}

function draw(){
    //Clear canvas
    ctx.clearRect(0, 0, WINDOWWIDTH, WINDOWHEIGHT);

    //Fill background
    ctx.fillStyle = "aquamarine";
    ctx.fillRect(0, 0, WINDOWWIDTH, WINDOWHEIGHT);

    ball.draw();
    player1.draw();
}

function move(){
    ball.move();
}
