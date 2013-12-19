var dragndrop = (function() {
	var myX = '';
	var myY = '';
	var whichArt = '';

	function resetZ() {
		var elements = document.querySelectorAll('img');
		for (var i = elements.length - 1; i >= 0; i--) {
			elements[i].style.zIndex = 5;
		};
	}

	function moveStart(event) {
		whichArt = event.target;
		myX = event.offsetX === undefined ? event.layerX : event.offsetX;
		myY = event.offsetY === undefined ? event.layerY : event.offsetY;
		resetZ();
		whichArt.style.zIndex = 10;
	}

	function moveDragStop(event) {
		event.preventDefault();
	}

	function moveDrop(event) {
		event.preventDefault();
		whichArt.style.left = event.pageX - myX + "px";
		whichArt.style.top = event.pageY - myY + "px";
	}

	function touchStart(event) {
		event.preventDefault();
		var whichArt = event.target;
		var touch = event.touches[0];
		var moveOffsetX = whichArt.offsetLeft - touch.pageX;
		var moveOffsetY = whichArt.offsetTop - touch.pageY;
		resetZ();
		whichArt.style.zIndex = 10;

		whichArt.addEventListener("touchmove", function() {
			var positionX = touch.pageX + moveOffsetX;
			var positionY = touch.pageY + moveOffsetY;
			
			whichArt.style.left = positionX + "px";
			whichArt.style.top = positionY + "px";
		});
	}


	document.querySelector('body').addEventListener("dragstart", moveStart, false);
	document.querySelector('body').addEventListener("dragover", moveDragStop, false);
	document.querySelector('body').addEventListener("drop", moveDrop, false);

	document.querySelector('body').addEventListener("touchstart", touchStart, false);
})();
