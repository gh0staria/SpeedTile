//  Disable 300ms delay on mobile
function NoClickDelay(el) {
	this.element = el;
	if (window.Touch) {this.element.addEventListener('touchstart', this, false); }
}

NoClickDelay.prototype = {
	handleEvent: function (e) {
		switch (e.type) {
		case 'touchstart':
			this.onTouchStart(e);
			break;
		case 'touchmove':
			this.onTouchMove(e);
			break;
		case 'touchend':
			this.onTouchEnd(e);
			break;
		}
	},

	onTouchStart: function (e) {
		e.preventDefault();
		this.moved = false;

		this.element.addEventListener('touchmove', this, false);
		this.element.addEventListener('touchend', this, false);
	},

	onTouchMove: function (e) {
		this.moved = true;
	},

	onTouchEnd: function (e) {
		this.element.removeEventListener('touchmove', this, false);
		this.element.removeEventListener('touchend', this, false);

		if (!this.moved) {
			// Place your code here or use the click simulation below
			var theTarget = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
			if (theTarget.nodeType === 3) {theTarget = theTarget.parentNode; }

			var theEvent = document.createEvent('MouseEvents');
			theEvent.initEvent('click', true, true);
			theTarget.dispatchEvent(theEvent);
		}
	}
};

new NoClickDelay(document.getElementById('grid'));
//  end noclickdelay

var colors = ['red', 'pink', 'purple', 'blue', 'green', 'orange'];
var score = 0;
var lives = 5;
var paused = false;
var gameEnded = false;
var sec = 0;
var gameClock;
var steps = 0;
var refreshTime = 3000;

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
	for (var i = 0; i < 5; i += 1) {
		//  Create a div with the class row
		var row = document.createElement('div');
		row.className = 'row';
		//  Loop it 5x for each column
		for (var x = 1; x <= 5; x += 1) {
			//  Create a cell
			var cell = document.createElement('div');
			//  Add a random color class
			var randCol = randomColor();
			cell.className += 'tile ' + randCol;
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
	if (paused === false && gameEnded === false) {
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
					randCol = randomColor();
				}
				// Add all the attributes and classes and stuff
				this.setAttribute('color', randCol);
				var newClass = 'tile ' + randCol;
				this.setAttribute('class', newClass);
			} else {
				// Add all the attributes and classes and stuff
				this.setAttribute('color', randCol);
				newClass = 'tile ' + randCol;
				this.setAttribute('class', newClass);
			}
		} else {
			if (lives > 0) {
				lives -= 1;
				document.getElementById('livesText').innerHTML = lives;
				if (lives === 0 && gameEnded === false) {
					gameOver();
				}
			} else {
				if (gameEnded === false) {
					gameOver();
				}
			}
		}
	}
}

//  Randomizes all tile colors
function shuffleColors() {
	if (paused === false && gameEnded === false) {
		var tilesArray = document.getElementsByClassName('tile');
		//  Loop 25 times, once per tile
		for (var xx = 0; xx < tilesArray.length; xx += 1) {
			//  Pick a random color
			var randCol = randomColor();
			//  If the color 
			tilesArray[xx].setAttribute('color', randCol);
			var newClass = 'tile ' + randCol;
			tilesArray[xx].setAttribute('class', newClass);
			tilesArray[xx].setAttribute('class', newClass);
		}
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

//  Pauses the game
function pauseTimers() {
	var pauseButton = document.getElementById('pauseBtn');
	if (paused === false) {
		//  Clear the timers
		clearInterval(tileShuffleTimer);
		clearInterval(gameClock);
		clearInterval(difficultyTimer);
		//  Change the button's value
		pauseButton.setAttribute('value', 'Play');
		//  Set the variable
		paused = true;
	} else {
		//  Start the timers again
		tileShuffleTimer = window.setInterval(shuffleColors, refreshTime);
		gameClock = setInterval(updateClock, 1000);
		difficultyTimer = setInterval(increaseDifficulty, 10000);
		//  Change the button's value
		pauseButton.setAttribute('value', 'Pause');
		//  Set the variable
		paused = false;
	}
}

function gameOver() {
	gameEnded = true;
	var area = document.getElementById('game');
	//  Create a div (the popup)
	var popup = document.createElement('div');
	//  Give it the right class and id
	popup.setAttribute('class', 'popup');
	popup.setAttribute('id', 'popup');
	//  Add content to the popup
	popup.innerHTML = '<h2>Game Over!</h2><p>Your score was: ' + score + '<br><br><input type="button" onclick="restartGame()" value="Restart"></input><br><a href="https://twitter.com/intent/tweet?text=I%20played%20SpeedTile%20and%20got%20a%20score%20of%20' + score + '.%20Dare%20to%20beat%20me%3F%20http%3A%2F%2Fgh0staria.github.io%2FSpeedTile%2F"><input type="button" value="Tweet Your Score"></input></a></p>';
	//  Add the popup to the game
	area.appendChild(popup);
	//  Stop the timers
	window.clearInterval(tileShuffleTimer);
}

function restartGame() {
	location.reload();
}

//  Handle the extra zeroes
function pad(val) { return val > 9 ? val : '0' + val; }

//  Displays and updates the timer every second
function updateClock() {
	//  Update the second and minute spans
	document.getElementById('seconds').innerHTML = pad(++sec%60);
	document.getElementById('minutes').innerHTML = pad(parseInt(sec/60,10));
	//  Add to the steps variable
	steps++;
}

function increaseDifficulty() {
	//  Subtract from the time
	refreshTime -= 250;
	//  Make sure it doesn't go less than one second
	if (refreshTime <= 1000) {
		refreshTime = 1000;
	}
	//  Clear and reset the timer
	clearInterval(tileShuffleTimer);
	tileShuffleTimer = setInterval(shuffleColors, refreshTime);
}

//  Draw the tiles
drawTiles();
//  Set the main color
setCurrentColor();
//  Start the game clock
gameClock = setInterval(updateClock, 1000);
//  Increase the difficulty every 10 seconds
var difficultyTimer = setInterval(increaseDifficulty, 10000);
//  Init timer
var tileShuffleTimer = setInterval(shuffleColors, refreshTime);
