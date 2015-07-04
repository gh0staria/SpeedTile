var colors = ["red", "pink", "purple", "blue", "green", "orange"];
var score = 0;
var lives = 5;
var time = 0;

//  Get a random color
function randomColor() {
	var randCol = colors[Math.floor(Math.random() * 6)];
	return randCol;
}

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
			var randCol = randomColor();
			cell.className += "tile " + randCol;
			//  Add color attribute
			cell.setAttribute('color', randCol);
			//  Add an onclick event
			cell.onclick = checkTile;
			//  Add the cell to the row
			row.appendChild(cell);
		}
		//  Add the row to the grid container
		tileContainer.appendChild(row);
	}
}

//  Changes the color you're supposed to click on
function setCurrentColor() {
	var colorDisplayer = document.getElementById('colorDisplay');
	//  Randomize the color
	var randCol = randomColor();
	//  Update the color displayer
	colorDisplayer.innerHTML = 'Click on the <span color="' + randCol + '" id="colorSpan" class="' + randCol + '">' + randCol + '</span> tiles.';
}

//  Handles events when the player clicks on a tile
function checkTile() {
	var currentColorSpan = document.getElementById('colorSpan');
	//  If the colors match
	if (this.getAttribute('color') === currentColorSpan.getAttribute('color')) {
		//  Add points to the score
		score += 5;
		//  Update the score
		document.getElementById('scoreText').innerHTML = score;
		//  Get the current color
		var currColor = this.getAttribute('color');
		//  Set a random color
		var randCol = randomColor();
		//  If the colors are the same:
		if (randCol === currColor) {
			//  Randomize it again
			while (randCol === currColor) {
				var randCol = randomColor();
			}
			// Add all the attributes and classes and stuff
			this.setAttribute('color', randCol);
			var newClass = "tile " + randCol;
			this.setAttribute('class', newClass);
		} else {
			// Add all the attributes and classes and stuff
			this.setAttribute('color', randCol);
			var newClass = "tile " + randCol;
			this.setAttribute('class', newClass);
		}
	} else {
		lives -= 1;
		document.getElementById('livesText').innerHTML = lives;
		if (lives <= 0) {
			alert('GAME OVER!');
			location.reload();
		}
	}
}

//  Randomizes all tile colors
function shuffleColors() {
	var tilesArray = document.getElementsByClassName('tile');
	//  Loop 25 times, once per tile
	for (xx = 0; xx < tilesArray.length; xx++) {
		//  Pick a random color
		var randCol = randomColor();
		//  If the color 
		tilesArray[xx].setAttribute('color', randCol);
		var newClass = "tile " + randCol;
		tilesArray[xx].setAttribute('class', newClass);
		tilesArray[xx].setAttribute('class', newClass);
	}
}

//  Randomizes the color to find
function changeColor() {
	var newColor = randomColor();
	var currentColor = document.getElementById('colorSpan').getAttribute('color');
	//  If the colors are the same
	if (newColor === currentColor) {
		while (newColor === currentColor) {
			newColor = randomColor();
		}
		document.getElementById('colorDisplay').innerHTML = 'Click on the <span color="' + newColor + '" id="colorSpan" class="' + newColor + '">' + newColor + '</span> tiles.';
	} else {
		document.getElementById('colorDisplay').innerHTML = 'Click on the <span color="' + newColor + '" id="colorSpan" class="' + newColor + '">' + newColor + '</span> tiles.';
	}
}

//  Shuffle the tile board every 2 seconds
var tileShuffleTimer = window.setInterval(shuffleColors, 2000);
//  Change the color every 10 seconds
var colorShuffleTimer = window.setInterval(changeColor, 10000);


//  Calls the functions and stuff
drawTiles();
setCurrentColor();
