var tilesArray = [];
var score = 0;
var time = 0;

//  Draw all 25 tiles onto the page
function drawTiles() {
	for (ii = 1; ii <= 25; ii += 1) {
		//  For each tile, create a div
		var tile = document.createElement('div');
		//  Add the tile class to the div
		tile.setAttribute('class', 'tile');
		//  Add a random color class
		var colors = ["red", "pink", "purple", "blue", "green", "orange"];
		var randCol = colors[Math.floor(Math.random() * 6)];
		tile.className += " " + randCol;
		//  Put the div in the container
		var tileContainer = document.getElementById('grid');
		tileContainer.appendChild(tile);
	}
}

//  Randomize all the tile colors
/*function shuffleColors() {
	//  Loop through the tilesArray
	//  Change the color of every tile
	//  Update the tile colors
}

//  Changes the color you're supposed to click on
function changeCurrentColor() {
	//  Randomize the color
	//  Update the color displayer
}

//  Time handling for the game
function timeHandler() {
	//  Start the timer
	//  Check score tier
	//  If score is a certain amount
	//  Run shuffleColors every x seconds
}

//  Handles events when the player clicks on a tile
function checkTile() {
	if (the clicked tile matches the current color) {
		//  Add points to the score
		//  Update the score text
		//  Change the tile color
	} else {
		//  Take away a life
		//  Update the life counter
	}
}*/

drawTiles();