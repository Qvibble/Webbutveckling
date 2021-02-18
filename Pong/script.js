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

    move(paddle){
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

        if(this.y > paddle.y && this.y < paddle.y + paddle.HEIGHT){
            if(this.x > paddle.X && this.x < paddle.X + paddle.WIDTH){
                this.xSpeed = this.SPEED;
            }
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
        
        this.SPEED = 5;
        //this.velocity = 0;

        this.X = 100;
        this.y = WINDOWHEIGHT/2 - this.HEIGHT/2; 

        this.up = false;
        this.down = false;
    }

    draw(){
        ctx.fillStyle = "white";
        ctx.fillRect(this.X, this.y, this.WIDTH, this.HEIGHT);
    }

    move(){
        if(this.up === true){
            this.y -= this.SPEED;
        }
        
        if(this.down === true){            
            this.y += this.SPEED;
        }

        if(this.y < 0){
            this.y = 0;
        }

        if(this.y + this.HEIGHT > WINDOWHEIGHT){
            this.y = WINDOWHEIGHT - this.HEIGHT;
        }
    }

    setDirection(event){
        //Up
        if(event.keyCode === KEY.W){
            if(event.type === "keydown"){
                this.up = true;
            }else if(event.type === "keyup"){
                this.up = false;                
            }            
        }

        //Down
        if(event.keyCode === KEY.S){
            if(event.type === "keydown"){
                this.down = true;
            }else if(event.type === "keyup"){
                this.down = false;
            }            
        }

        event.preventDefault();
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
        player1.setDirection(e);
    });

    document.addEventListener("keyup", (e) => {
        player1.setDirection(e);
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
    ball.move(player1);
    player1.move();
}

/*
if(this.up === true){
            if(this.velocity < this.SPEED){
                this.velocity += 0.1;
            }
            
            if(this.velocity > this.SPEED){
                this.velocity = this.SPEED
            }

            console.log(this.velocity);
            this.y -= this.velocity;
        }else if(this.down === true){
            if(this.velocity < this.SPEED){
                this.velocity += 0.1;
            }
            
            if(this.velocity > this.SPEED){
                this.velocity = this.SPEED
            }

            console.log(this.velocity);
            this.y += this.velocity;
        }else{
            if(this.velocity > 0){
                this.velocity -= 0.1;
            }else{
                this.velocity = 0;
            }
        }
*/