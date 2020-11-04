// Globala konstanter och variabler
var boardElem;			// Referens till div-element för "spelplanen"
const carImgs = ["car_up.png","car_right.png","car_down.png","car_left.png"];
						// Array med filnamn för bilderna med bilen
var carDir = 1;			// Riktning för bilen, index till carImgs
var carElem;			// Referens till img-element för bilen
const xStep = 5;		// Antal pixlar som bilen ska förflytta sig i x-led
const yStep = 5;		// eller y-led i varje steg
const timerStep = 20;	// Tid i ms mellan varje steg i förflyttningen
var timerRef = null;	// Referens till timern för bilens förflyttning
var startBtn;			// Referens till startknappen
var stopBtn;			// Referens till stoppknappen
/* === Tillägg i uppgiften === */
var pigElem;  //Referens till vildsvinet
var pigsShowedElem; //Referens till span där antal vildsvin som visas
var pigsHitElem; //Referens till span där antal träffar visas
var pigCounter = 0;  //Håller koll på hur många grisar som visats
var hitCounter = 0;  //Håller koll på hur många grisar som träffats av bilen
var pigTimer = 4; //Håller koll på tiden mellan grisarna. 4 sekunder
var startTime; //Start tid mellan intervaller
// ------------------------------
// Initiera globala variabler och koppla funktion till knapp
function init() {
	// Referenser till element i gränssnittet
		boardElem = document.getElementById("board");
		carElem = document.getElementById("car");
		startBtn = document.getElementById("startBtn");
		stopBtn = document.getElementById("stopBtn");
	// Lägg på händelsehanterare
		document.addEventListener("keydown",checkKey);
			// Känna av om användaren trycker på tangenter för att styra bilen
		startBtn.addEventListener("click",startGame);
		stopBtn.addEventListener("click",stopGame);
	// Aktivera/inaktivera knappar
		startBtn.disabled = false;
		stopBtn.disabled = true;
	/* === Tillägg i uppgiften === */
		pigElem = document.getElementById("pig");  //Referens till pig-bilden
		pigsShowedElem = document.getElementById("pigNr");  //Referens till span elem
		pigsHitElem = document.getElementById("hitCounter");  //Referens till span elem
} // End init
window.addEventListener("load",init);
// ------------------------------
// Kontrollera tangenter och styr bilen
function checkKey(e) {
	let k = e.keyCode;
	switch (k) {
		case 37: // Pil vänster
		case 90: // Z
			carDir--; // Bilens riktning 90 grader åt vänster
			if (carDir < 0) carDir = 3;
			carElem.src = "img/" + carImgs[carDir];
			break;
		case 39:  // Pil höger
		case 173: // -
			carDir++; // Bilens riktning 90 grader åt höger
			if (carDir > 3) carDir = 0;
			carElem.src = "img/" + carImgs[carDir];
			break;
	}
} // End checkKey
// ------------------------------
// Initiera spelet och starta bilens rörelse
function startGame() {
	startBtn.disabled = true;
	stopBtn.disabled = false;
	carElem.style.left = "0px";
	carElem.style.top = "0px";
	carDir = 1;
	carElem.src = "img/" + carImgs[carDir];
	moveCar();
	/* === Tillägg i uppgiften === */
	pigElem.style.visibility = "visible";
	pigCounter = 0;
	hitCounter = 0;
	
	movePig();

	pigsHitElem.innerHTML = hitCounter;
	pigsShowedElem.innerHTML = pigCounter;

	restartTime();

} // End startGame
// ------------------------------
// Stoppa spelet
function stopGame() {
	if (timerRef != null) clearTimeout(timerRef);
	startBtn.disabled = false;
	stopBtn.disabled = true;
	/* === Tillägg i uppgiften === */
	

} // End stopGame
// ------------------------------
// Flytta bilen ett steg framåt i bilens riktning
function moveCar() {
	let xLimit = boardElem.offsetWidth - carElem.offsetWidth;
	let yLimit = boardElem.offsetHeight - carElem.offsetHeight;
	let x = parseInt(carElem.style.left);	// x-koordinat (left) för bilen
	let y = parseInt(carElem.style.top);	// y-koordinat (top) för bilen
	switch (carDir) {
		case 0: // Uppåt
			y -= yStep;
			if (y < 0) y = 0;
			break;
		case 1: // Höger
			x += xStep;
			if (x > xLimit) x = xLimit;
			break;
		case 2: // Nedåt
			y += yStep;
			if (y > yLimit) y = yLimit;
			break;
		case 3: // Vänster
			x -= xStep;
			if (x < 0) x = 0;
			break;
	}
	carElem.style.left = x + "px";
	carElem.style.top = y + "px";
	timerRef = setTimeout(moveCar,timerStep);
	/* === Tillägg i uppgiften === */
	checkCollision();  //Kollar om de kolliderar

	let now = new Date();
	let runtime = now.getTime();  //Hämtar tid
	let totalTime = Math.floor((runtime - startTime)/1000);  //Avrundar tid till sekunder

	if(totalTime >= pigTimer){  //Kollar om det gått mer än 4 sekunder
		movePig();
		restartTime();
	}

	if(pigCounter > 10){ //Om 10 mer än 10 grisar visas så är man klar. Kör man på 10:E blir det 11
		stopGame();
	}

} // End moveCar
// ------------------------------

/* === Tillägg av nya funktioner i uppgiften === */
function movePig(){
	let xLimit = boardElem.offsetWidth - pigElem.offsetWidth;  //Max x-koordinat för grisen
	let yLimit = boardElem.offsetHeight - pigElem.offsetHeight;  //Max y-koordinat för grisen
	let xPos = Math.floor(Math.random()*xLimit);  //Slumpar x position
	let yPos = Math.floor(Math.random()*yLimit);  //Slumpar t position

	if(pigCounter < 10){  //Om 10 grisar inte visats
		pigElem.style.left = xPos + "px";  //Sätter y på grisen
		pigElem.style.top = yPos + "px";  //Sätter x på grisen
		
		pigsShowedElem.innerHTML = ++pigCounter;  //Visar antal visade grisar
	}else{  //10 grisar har visats. Ökar pigcounter till 11 som avslutar spelet
		++pigCounter;
	}
}

function checkCollision(){
	let pig = pigElem.getBoundingClientRect();  //pigElem xpos, ypos, bredd, höjd

	let car = carElem.getBoundingClientRect();  //carElem xpos, ypos, bredd, höjd

	if((car.left + car.width > pig.left && car.top + car.height > pig.top)  //Kollar om bilen rör grisen till vänster och över
		&&
	   (car.left < pig.left + pig.width && car.top < pig.top + pig.height)){  //Kollar om bilen rör grisen till höger och under
		pigsHitElem.innerHTML = ++hitCounter;  //Visar antal påkörda grisar
		
		movePig(); 
		restartTime();
	}
}

function restartTime(){  //Startar om tiden
	let now = new Date();
	startTime = now.getTime();
}

