var tilesArray = [];
var colors = ["redTile", "pinkTile", "purpleTile", "blueTile", "greenTile", "orangeTile"];
var textColors = ["red", "pink", "purple", "blue", "green", "orange"];
var score = 0;
var time = 0;

//  Draw all 25 tiles onto the page
function drawTiles() {
	//  Define where the grid will be made
	var tileContainer = document.getElementById('grid');
	//  Loop it 5 times, once for each row
	for (i = 0; i < 5; i++) {
		//  Create a div with the class row
		var row = document.createElement("div");
		row.className = "row";
		//  Loop it 5x for each column
		for (x = 1; x <= 5; x++) {
			//  Create a cell
			var cell = document.createElement("div");
			//  Add a random color class
			var randCol = colors[Math.floor(Math.random() * 6)];
			cell.className += "tile " + randCol;
			//  Add the cell to the row
			row.appendChild(cell);
		}
		//  Add the row to the grid container
		tileContainer.appendChild(row);
	}
}

//  Changes the color you're supposed to click on
function changeCurrentColor() {
	//  Randomize the color
	var randCol = textColors[Math.floor(Math.random() * 6)];
	//  Update the color displayer
	var colorDisplayer = document.getElementById('colorDisplay');
	colorDisplayer.innerHTML = 'Click on the <span class="colorDisplay ' + randCol + '">' + randCol + '</span> tiles.';
	//colorDisplayer.className += randCol;
}

//  Randomize all the tile colors
/*function shuffleColors() {
	//  Loop through the tilesArray
	//  Change the color of every tile
	//  Update the tile colors
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
changeCurrentColor();