// JavaScript

// Globala variabler
var wordList = ["BLOMMA","LASTBIL","SOPTUNNA","KÖKSBORD","RADIOAPPARAT","VINTER","SOMMAR","DATORMUS","LEJON","ELEFANTÖRA","JULTOMTE",
				"SKOGSHYDDA","BILNUMMER","BLYERTSPENNA","SUDDGUMMI","KLÄDSKÅP","VEDSPIS","LJUSSTAKE","SKRIVBORD","ELDGAFFEL","STEKPANNA",
				"KASTRULL","KAFFEBRYGGARE","TALLRIK","SOFFBORD","TRASMATTA","FLYGPLAN","FLYGPLATS","TANGENTBORD"];  //Alla ord som går att slumpa
var selectedWord = "";  //Håller det slumpade ordet
var letterBoxes = "";  //Referens till alla span taggar, alla lådor
var hangmanImg = "";  //Referens till den hangman bild som ska visas
var hangmanImgNr = 0;  //Avgör vilken hangmanImg som visas 0-6
var msgElement = "";  //Referens till elementet där meddelanden skrivs ut
var startGameButton;  //Referens till knappen som startar spelet
var letterButtons;  //Referens till alla bokstavsknappar A-Ö
var oldWord = "";  //Håller det senaste slumpade ordet, används så att samma ord inte kan komma två gånger i rad
var startTime = 0;  //Räknar hur länge spelet har pågått

window.onload = init; // Se till att init aktiveras då sidan är inladdad


// Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd
// Initiering av globala variabler samt koppling av funktioner till knapparna.
function init() {
	startGameButton = document.getElementById("startGameBtn");  //Sparar start knappen
	letterButtons = document.getElementById("letterButtons").getElementsByTagName("button");  //Sparar alla bokstavsknappar i en array

	for(let i = 0; i < letterButtons.length; i++){  //Tilldelar alla bokstavsknappar guessLetter funktionen
		letterButtons[i].onclick = guessLetter;
	}
	
	startGameButton.onclick = startGame;  //Tilldelar startknappen startGame funktionen

	hangmanImg = document.getElementById("hangman");  //Sparar en referens till elementet där bilden kommer att visas
	msgElement = document.getElementById("message");  //Sparar en referens till där meddelanden kommer att visas

	changeButtonActivation(true);  //Gör så att startGameButton går att klicka på samt att bokstavsknapparna inte går att klicka på
}

/**
 * Körs när startGameButton klickas på. Klockan nollställs och skapas, föregående meddelande tas bort,
 * ett ord slumpas, ett visst antal rutor visas beroende på hur långt ordet är, bilden byts till den första (0),
 * startGameButton avaktiveras
 */
function startGame(){
	let now = new Date();  //Referens till nuvarande tid, startpunkt
	startTime = now.getTime();  //Skapar utgångspunkt för klockan

	msgElement.innerHTML = "";  //Tömmer meddelandet

	randomWord();  //Slumpar ett ord
	showLetterBoxes();  //Visar ett ental ruton beroende på det slumpade ordets längd

	hangmanImgNr = 0;  //Nollställer och väljer första bilder
	hangmanImg.src = "./pics/h" + hangmanImgNr + ".png";  //Visar första bilden (0)

	changeButtonActivation(false);  //Avaktiverar startGameButton så att den inte går att klicka på och aktiverar alla bokstavsknappar
}

/**
 * Körs när rätt ord har gissats eller när gubben är hängd. Skriver ut om man gissat rätt eller om gubben hängdes och vilket ord som var rätt samt tiden det tog.
 * Aktiverar även startGameButton
 * 
 * @param {boolean} manHanged 
 */
function endGame(manHanged){
	let now = new Date();  //Referens till nuvarande tid, slutpunkt
	let runTime = (now.getTime() - startTime) / 1000;  //Räknar ut hur lång tid spelet pågått

	if(manHanged === true){  //Kollar om gubben hängdes, hängdes gubben skrivs det ur samt vilket ord som var rätt
		msgElement.innerHTML = "Gubben hängdes, rätt ord var: " + selectedWord;
	}else{  //Rätt ord blev gissar och gubben hänges inte. Skrivet ut att spelaren listat ut ordet
		msgElement.innerHTML = "Du gissade rätt";
	}

	msgElement.innerHTML += "<br/> Tid: " + runTime.toFixed(2) + " sekunder";  //Skriver ut speltiden

	changeButtonActivation(true);  //Aktiverar startGameButton så att det går att starta en ny omgång samt att alla bokstavsknappar avaktiveras
}

/**
 * Körs när en bokstavsknapp klickas på. Avaktiverar den knapp som klickats på, kollar om bokstaven finns i ordet,
 * finns bokstaven så markeras korrekt låda med bokstaven, finns ej bokstaven så ändras bilden och spelaren kommer närmare att förlora,
 * kollar sist om ordet är funnet eller om gubben är häng och kör respektive endGame funktion (true/false)
 */
function guessLetter(){
	this.disabled = true;  //Avaktiverar knappen som klickades på

	let letter = this.innerHTML;  //Hämtar bokstaven från knappen som klickats på
	let letterFound = false;  //Håller koll på om bokstaven finns
	let correctLettersCount = 0;  //Håller koll på hur många bokstäver som hittats i ordet
	let i = 0;  //Loop-variabel

	for(i = 0; i < selectedWord.length; i++){  //Går igenom alla bokstäver i ordet och jämför med den gissade bokstaven
		if(letter === selectedWord.charAt(i)){  //Om bokstaven finns så blir rätt låda ifylld med bokstaven och letterFound true eftersom att bokstaven fanns
			letterBoxes[i].innerHTML = letter;
			letterFound = true;
		}
		if(letterBoxes[i].innerHTML !== "&nbsp;"){  //Kollar om lådorna inte tomma, är lådorna inte tomma (&nbsp;) så har rätt bokstav hittats och correctLettersCount räknas upp
			correctLettersCount++;
		}
	}

	if(letterFound === false){  //Kollar om bokstaven inte fanns
		hangmanImg.src = "./pics/h" + ++hangmanImgNr + ".png";  //Bokstaven fanns inte och nästa bild visas
		
		if(hangmanImgNr === 6){  //Kollar om gubben är hängd, bild 6 
			endGame(true);  //Gubben hängd
		}
	}else if(correctLettersCount === selectedWord.length){  //Kollar om hela ordet är gissat 
		endGame(false);  //Rätt ord gissat
	}
}

/**
 * Körs när startGameButton klickas på. Slumpar ett ord från wordList, slumpar inte samma ord två gånger i rad
 */
function randomWord(){
		let wordIndex = Math.floor(Math.random()*wordList.length);  //Ordet slumpas från wordList och platsen på ordet sparas i wordIndex
		selectedWord = wordList[wordIndex];  //Det valda ordet sparas i selectedWord

		while(oldWord === selectedWord){  //Kollar om det slumpade ordet är samma som det gamla ordet. Är det samma så slumpas ett nytt ord
			wordIndex = Math.floor(Math.random()*wordList.length);
			selectedWord = wordList[wordIndex];
		}

		oldWord = selectedWord;  //Sparar det slumpade ordet i oldWord så att man kan jämföra nästa gång ett ord slumpas så att det inte är samma
}


/**
 * Körs när startGameButton klickas på. Visar n antal rutor beroende på det slumpade ordets längd. Skapar tomma rutor med hjälp av span taggar,
 * span taggarna läggs in i elementet som ska hålla i alla rutor 
 */
function showLetterBoxes(){
	let newCode = "";  //Koden (alla span taggar) som kommer läggas in i elementet som håller i lådorna
	let i = 0;  //Loop-variabel

	for(i = 0; i < selectedWord.length; i++){  //Skapar n antal rutor (span taggar) beroende på det slumpade ordets längd
		newCode += "<span>&nbsp;</span>";
	}

	document.getElementById("letterBoxes").innerHTML = newCode;  //Alla spantaggar läggs in elementet som ska hålla lådorna

	letterBoxes = document.getElementById("letterBoxes").getElementsByTagName("span");  //En referens till alla lådor spara i letterBoxes i form av en array
}

/**
 * Håller reda på vilka knappar som ska avaktiveras och aktiveras. Både startGameButton och alla bokstavsknappar
 * 
 * @param {boolean} status 
 */
function changeButtonActivation(status){
	if(status === true){  //Kollar om startGameButton klickas på 
		startGameButton.disabled = false;  //Aktiverar startGameButton
		
		for(let i = 0; i < letterButtons.length; i++){  //Avaktiverar alla bokstavsknappar
			letterButtons[i].disabled = true;
		}
	}else{
		startGameButton.disabled = true;  //Avaktiverar starGameButton

		for(let i = 0; i < letterButtons.length; i++){  //Aktiverar alla bokstavsknappar
			letterButtons[i].disabled = false;
		}
	}
}

