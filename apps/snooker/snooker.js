var canvas;

var ctx;

var boundaryX = 400;

var boundaryY = 500;

var bounce;

var ballArray = new Array();

// ellastic collision variables

var dx,dy,phi,magnitude_1,magnitude_2,direction_1,direction_2,

	new_xspeed_1,new_yspeed,new_xspeed2,new_yspeed_2,

	final_xspeed1,final_xspeed_2,final_yspeed_1,final_yspeed_2;



// power of shot	

var shotPower = 5;

var powerPic;

// position of line

var x1 = 160;

var y1 = 18;

var x2 = 160;

var y2 = 88;



// center of line at any angle or position

var centerx = Math.abs(x2 - x1) / 2;

var centery = Math.abs(y2 - y1) / 2;

var x = Math.max(x2,x1) - centerx;

var y = Math.max(y2,y1) - centery;



// amount of degrees that line is rotated

var adeg = 2;

var a = adeg * Math.PI / 180;

	

function init()

{

	canvas = document.getElementById('canvas');

	ctx = canvas.getContext('2d');

	powerPic = document.getElementById('shotmeter');

	/*******  create red balls  *******/

	

	
	/*******  create coloured balls  *******/

	whiteBall = new createWhiteBall();

	

	ballArray[0] = whiteBall;
	

	// draw the white ball

	ctx.beginPath();

	ctx.arc(whiteBall.x,whiteBall.y,whiteBall.radius,0,Math.PI * 2, false);

	ctx.fillStyle = whiteBall.color;	

	ctx.fill();

	ctx.closePath();

	

	

	controls();

}



window.onload = init;