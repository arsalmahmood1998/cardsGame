
cards =[]
var i;
for (i = 0; i < 52; i++) {
	var img = document.createElement("img");
	img.src = "images/" + i.toString() + ".png";
  	cards.push(img);
}

spades = cards.slice(0,13);
hearts = cards.slice(13,26);
clubs = cards.slice(26,39);
diamonds = cards.slice(39,52);

playerOne = []
playerTwo = []

function pickCard (){
	const random = Math.floor(Math.random() * cards.length);
	card = cards[random];
	if ((playerOne.includes(card)) || (playerTwo.includes(card))){
		return pickCard();
	}
	else{
		return card;
	}
}

function playerOneFunction(){
	if (playerOne.length < 3){
		document.getElementById("playerOneButton").innerHTML = "Player One Clicked...!";
		var src = document.getElementById("playerOneArea");
		card = pickCard();
		playerOne.push(card);
		src.appendChild(card);
	}
	else{
		document.getElementById("playerOneButton").innerHTML = "You already have three cards";
	}
}

function playerTwoFunction(){
	if (playerTwo.length < 3){
		document.getElementById("playerTwoButton").innerHTML = "Player Two Clicked...!";
		var src = document.getElementById("playerTwoArea");
		card = pickCard();
		playerTwo.push(card);
		src.appendChild(card);
	}
	else{
		document.getElementById("playerTwoButton").innerHTML = "You already have three cards";
	}
}

var spadesCount = 0;
var heartsCount = 0;
var clubsCount = 0;
var diamondsCount = 0;

function calculateColor(array){
	var j;
	for (j=0 ; j < array.length ; j++){
		if (spades.includes(array[j])){
			spadesCount += 1;
		}
		else if (hearts.includes(array[j])){
			heartsCount += 1;
		}
		else if (clubs.includes(array[j])){
			clubsCount += 1;
		}
		else if (diamonds.includes(array[j])){
			diamondsCount += 1;		
		}
	}
	if (spadesCount == 3){
		countsZero();
		return true;
	}
	else if (heartsCount == 3){
		countsZero();
		return true;
	}
	else if (clubsCount == 3){
		countsZero();
		return true;
	}
	else if (diamondsCount == 3){
		countsZero();
		return true;
	}
	else{
		countsZero();
		return false;
	}
}

function countsZero(){
	spadesCount = 0;
	heartsCount = 0;
	clubsCount = 0;
	diamondsCount = 0;
}

function calculateTrial(array){
	var indexOne = returnIndex(array[0]);
	var indexTwo = returnIndex(array[1]);
	var indexThree = returnIndex(array[2]);
	console.log("index one=" + indexOne.toString())
	console.log("index two=" + indexTwo.toString())
	console.log("index three=" + indexThree.toString())


	if (indexOne == indexTwo == indexThree){
		return "trial";
	}
	else if (indexOne == indexTwo){
		return "duo";
	}
	else if (indexOne == indexThree){
		return "duo";
	}
	else if (indexTwo == indexThree){
		return "duo";
	}
	else{
		return false;
	}
}

function returnIndex(element){
	if (spades.includes(element)){
		return spades.indexOf(element);
	}
	else if (hearts.includes(element)){
		return hearts.indexOf(element);
	}
	else if (diamonds.includes(element)){
		return diamonds.indexOf(element);
	}
	else if (clubs.includes(element)){
		return clubs.indexOf(element);
	}

}

function highCard(array){
	var indexOne = returnIndex(array[0]);
	var indexTwo = returnIndex(array[1]);
	var indexThree = returnIndex(array[2]);
	if ((indexOne > indexTwo) && (indexOne > indexThree)){
		return indexOne;
	}
	else if ((indexTwo > indexOne) && (indexTwo > indexThree)){
		return indexTwo;
	}
	else if ((indexThree > indexOne) && (indexThree > indexTwo)){
		return indexThree;
	}
}

function sequence(array){
	var indexOne = returnIndex(array[0]);
	var indexTwo = returnIndex(array[1]);
	var indexThree = returnIndex(array[2]);
	if (((indexOne == indexTwo + 1 || indexOne == indexTwo - 1) || 
		(indexOne == indexThree + 1 || indexOne == indexThree - 1)) &&
		((indexTwo == indexThree + 1 || indexTwo == indexThree - 1)) || 
		((indexTwo == indexThree + 1 || indexTwo == indexThree - 1) || 
			(indexOne == indexTwo + 1 || indexOne == indexTwo - 1)) &&
		(indexOne == indexThree + 1 || indexOne == indexThree - 1)){
		return true;
	}
	else{
		return false;
	}
}

function calculateResult(){
	console.log("Result wanted");
	console.log(calculateColor(playerOne));
	console.log(calculateTrial(playerOne));
	console.log(sequence(playerOne));
	console.log(highCard(playerOne));
	console.log(calculateColor(playerTwo));
	console.log(calculateTrial(playerTwo));
	console.log(sequence(playerTwo));
	console.log(highCard(playerTwo));

	if (calculateTrial(playerOne)=="trial"){
		return "Player One Wins with a trial";
	}
	else if (calculateTrial(playerTwo) == "trial"){
		return "Player Two Wins with a trial";
	}
	else if (sequence(playerOne)){
		return "PLayer One wins with a sequence";
	}
	else if (sequence(playerTwo)){
		return "PLayer Two wins with a sequence";
	}	
	else if (calculateColor(playerOne)){
		return "Player One wins with a color";
	}
	else if (calculateColor(playerTwo)){
		return "Player Two wins with a color";
	}
	else if (calculateTrial(playerOne) == "duo"){
		return "Player One Wins with a duo";
	} 
	else if (calculateTrial(playerTwo) == "duo"){
		return "Player Two Wins with a duo";
	}
	else if (highCard(playerTwo) > highCard(playerOne)){
		return "Player Two wins with a high card";
	}
	else if (highCard(playerTwo) < highCard(playerOne)){
		return "Player One wins with a high card";
	}
}

function checkResult(){
	document.getElementById("result").innerHTML = calculateResult();
}
