function gravWell() {
	// Constants
	var NUM_LINES = window.innerWidth > 800 ? 250 : 100;
	var RAIN_LENGTH = 200;

	// Global vars
	var _animationFrame;

	var _canvas = document.querySelector("#grav-well");
	var _context = _canvas.getContext("2d");

	function createRainLines(n) {
		var rainLines = [];

		for (var i = 0; i < n; ++i) {
			rainLines.push({
				xPos: Math.random() * _canvas.width,
				yPos: Math.random() * _canvas.height,
				speed: Math.random() * 2 + 1
			});
		}

		return rainLines;
	}

	// Renders a rain line at it's current defined position
	function renderRainLine(line) {
		var lineGradient = _context.createLinearGradient(line.xPos, line.yPos, line.xPos, line.yPos + RAIN_LENGTH);
		var alpha = 1 - (_canvas.height - line.yPos) / _canvas.height * 0.8;
		lineGradient.addColorStop(0, "hsla(315,84%,44%," + alpha + ")");
		lineGradient.addColorStop(1, "hsla(315, 84%, 44%, 0)");

		_context.strokeStyle = lineGradient;
		_context.beginPath();
		_context.moveTo(line.xPos, line.yPos);
		_context.lineTo(line.xPos, line.yPos + RAIN_LENGTH);
		_context.stroke();
	}

	// Moves the rain line to the next position at the defined speed
	function updateRainLine(line) {
		line.yPos -= line.speed;
		// Reset position to bottom of canvas after the rain has left the screen
		if (line.yPos < -RAIN_LENGTH) {
			line.yPos = _canvas.height;
		}
	}

	// function renderLogo(l) {
	// 	var logoImg = new Image()
	// 	logoImg.src = '/img/terraform-logo.png'
	// 	var logo = _context.createPattern(logoImg, 'no-repeat')

	// 	_context.fillStyle = logo;
	// 	_context.fillRect(l.xPos, l.yPos, 70, 70);
	// }

	function render(rainLines) {
		_context.fillStyle = "hsl(234,28%,7%)";
		_context.fillRect(0, 0, _canvas.width, _canvas.height);
		for (var i = 0; i < rainLines.length; i++) {
			var line = rainLines[i];
			renderRainLine(line)
			updateRainLine(line);
		}

		_animationFrame = requestAnimationFrame(function () {
			render(rainLines);
		});
	}

	function init() {
		cancelAnimationFrame(_animationFrame);
		_canvas.width = window.innerWidth;
		_canvas.height = window.innerHeight;

		_animationFrame = requestAnimationFrame(function () {
			var rainLines = createRainLines(NUM_LINES);
			render(rainLines);
		});
	}

	window.onresize = init;
	init();
};

if (document.readyState !== 'loading') {
	gravWell();
} else {
	document.addEventListener('DOMContentLoaded', function () {
		gravWell();
	});
}
