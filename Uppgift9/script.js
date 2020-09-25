// JavaScript

// Globala variabler
var wordList = ["BLOMMA","LASTBIL","SOPTUNNA","KÖKSBORD","RADIOAPPARAT","VINTER","SOMMAR","DATORMUS","LEJON","ELEFANTÖRA","JULTOMTE",
				"SKOGSHYDDA","BILNUMMER","BLYERTSPENNA","SUDDGUMMI","KLÄDSKÅP","VEDSPIS","LJUSSTAKE","SKRIVBORD","ELDGAFFEL","STEKPANNA",
				"KASTRULL","KAFFEBRYGGARE","TALLRIK","SOFFBORD","TRASMATTA","FLYGPLAN","FLYGPLATS","TANGENTBORD"];
var selectedWord = "";
var letterBoxes = "";
var hangmanImg = "";
var hangmanImgNr = 0;
var msgElement = "";
var startGameButton;
var letterButtons;
var oldWord = "";
var startTime = 0;

window.onload = init; // Se till att init aktiveras då sidan är inladdad


// Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd
// Initiering av globala variabler samt koppling av funktioner till knapparna.
function init() {
	startGameButton = document.getElementById("startGameBtn");
	letterButtons = document.getElementById("letterButtons").getElementsByTagName("button");

	for(let i = 0; i < letterButtons.length; i++){
		letterButtons[i].onclick = guessLetter;
	}
	
	startGameButton.onclick = startGame;

	hangmanImg = document.getElementById("hangman");
	msgElement = document.getElementById("message");

	changeButtonActivation(true);
}

function startGame(){
	let now = new Date();
	startTime = now.getTime();

	msgElement.innerHTML = "";

	randomWord();
	showLetterBoxes();

	hangmanImgNr = 0;
	hangmanImg.src = "./pics/h" + hangmanImgNr + ".png";

	changeButtonActivation(false);
}

function endGame(manHanged){
	let now = new Date();
	let runTime = (now.getTime() - startTime) / 1000;

	if(manHanged === true){
		msgElement.innerHTML = "Gubben hängdes, rätt ord var: " + selectedWord;
	}else{
		msgElement.innerHTML = "Du gissade rätt";
	}

	msgElement.innerHTML += "<br/> Tid: " + runTime.toFixed(2) + "sekunder";  

	changeButtonActivation(true);
}

function guessLetter(){
	this.disabled = true;

	let letter = this.innerHTML;
	let letterFound = false;
	let correctLettersCount = 0;
	let i = 0;

	for(i = 0; i < selectedWord.length; i++){
		if(letter === selectedWord.charAt(i)){
			letterBoxes[i].innerHTML = letter;
			letterFound = true;
		}
		if(letterBoxes[i].innerHTML !== "&nbsp;"){
			correctLettersCount++;
		}
	}

	if(letterFound === false){
		hangmanImg.src = "./pics/h" + ++hangmanImgNr + ".png";
		
		if(hangmanImgNr === 6){
			endGame(true);
		}
	}else if(correctLettersCount === selectedWord.length){
		endGame(false);
	}
}

function randomWord(){
		let wordIndex = Math.floor(Math.random()*wordList.length);
		selectedWord = wordList[wordIndex];

		while(oldWord === selectedWord){
			wordIndex = Math.floor(Math.random()*wordList.length);
			selectedWord = wordList[wordIndex];
		}

		oldWord = selectedWord;
}

function showLetterBoxes(){
	let newCode = "";
	let i = 0;

	for(i = 0; i < selectedWord.length; i++){
		newCode += "<span>&nbsp;</span>";
	}

	document.getElementById("letterBoxes").innerHTML = newCode;

	letterBoxes = document.getElementById("letterBoxes").getElementsByTagName("span");
}

function changeButtonActivation(status){
	if(status === true){
		startGameButton.disabled = false;
		
		for(let i = 0; i < letterButtons.length; i++){
			letterButtons[i].disabled = true;
		}
	}else{
		startGameButton.disabled = true;

		for(let i = 0; i < letterButtons.length; i++){
			letterButtons[i].disabled = false;
		}
	}
}

