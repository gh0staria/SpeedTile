var colors = ["red", "pink", "purple", "blue", "green", "orange"];
var score = 0;
var lives = 5;
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
function changeCurrentColor() {
	//  Randomize the color
	var randCol = colors[Math.floor(Math.random() * 6)];
	//  Update the color displayer
	var colorDisplayer = document.getElementById('colorDisplay');
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
		//  Randomize the tile's color
		var randCol = colors[Math.floor(Math.random() * 6)];
		this.setAttribute('color', randCol);
		var newClass = "tile " + randCol;
		this.setAttribute('class', newClass);
	} else {
		lives -= 1;
		document.getElementById('livesText').innerHTML = lives;
		if (lives <= 0) {
			alert('GAME OVER!');
			location.reload();
		}
	}
}

//  Calls the functions and stuff
drawTiles();
changeCurrentColor();