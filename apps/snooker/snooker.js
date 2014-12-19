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
	
	redBalls = new Array();
	ballCount = 15;
	for (i=0;i<ballCount;i++)
	{
		redBalls[i] = new createRedBall();
	}
	// set up initial positions of the red redBalls
	// point ball
	redBalls[0].x = 200;
	redBalls[0].y = 350;
	// left of triangle
	redBalls[1].x = redBalls[0].x - (1 * redBalls[0].radius) - 1;
	redBalls[1].y = redBalls[0].y + (2 * redBalls[0].radius);
	redBalls[2].x = redBalls[0].x - (2 * redBalls[0].radius) - 2;
	redBalls[2].y = redBalls[0].y + (4 * redBalls[0].radius);
	redBalls[3].x = redBalls[0].x - (3 * redBalls[0].radius) - 3;
	redBalls[3].y = redBalls[0].y + (6 * redBalls[0].radius);
	redBalls[4].x = redBalls[0].x - (4 * redBalls[0].radius) - 4;
	redBalls[4].y = redBalls[0].y + (8 * redBalls[0].radius);
	// right of triangle
	redBalls[5].x = redBalls[0].x + (1 * redBalls[0].radius) + 1;
	redBalls[5].y = redBalls[0].y + (2 * redBalls[0].radius);
	redBalls[6].x = redBalls[0].x + (2 * redBalls[0].radius) + 2;
	redBalls[6].y = redBalls[0].y + (4 * redBalls[0].radius);
	redBalls[7].x = redBalls[0].x + (3 * redBalls[0].radius) + 3;
	redBalls[7].y = redBalls[0].y + (6 * redBalls[0].radius);
	redBalls[8].x = redBalls[0].x + (4 * redBalls[0].radius) + 4;
	redBalls[8].y = redBalls[0].y + (8 * redBalls[0].radius);
	// left inside of triangle
	redBalls[9].x = redBalls[0].x;
	redBalls[9].y = redBalls[0].y + (4 * redBalls[0].radius);
	redBalls[10].x = redBalls[0].x - (1 * redBalls[0].radius) - 1;
	redBalls[10].y = redBalls[0].y + (6 * redBalls[0].radius);
	redBalls[11].x = redBalls[0].x - (2 * redBalls[0].radius) - 2;
	redBalls[11].y = redBalls[0].y + (8 * redBalls[0].radius);
	// right inside of triangle
	redBalls[12].x = redBalls[0].x + (1 * redBalls[0].radius) + 1;
	redBalls[12].y = redBalls[0].y + (6 * redBalls[0].radius);
	redBalls[13].x = redBalls[0].x + (2 * redBalls[0].radius) + 2;
	redBalls[13].y = redBalls[0].y + (8 * redBalls[0].radius);
	// bottom of triangle
	redBalls[14].x = redBalls[0].x;
	redBalls[14].y = redBalls[0].y + (8 * redBalls[0].radius);

	/*******  create coloured balls  *******/
	whiteBall = new createWhiteBall();
	blackBall = new createBlackBall();
	pinkBall = new createPinkBall();
	blueBall = new createBlueBall();
	brownBall = new createBrownBall();
	greenBall = new createGreenBall();
	yellowBall = new createYellowBall();

	ballArray = [whiteBall,
				blackBall,
				pinkBall,
				blueBall,
				brownBall,
				greenBall,
				yellowBall,	
				redBalls[0],	
				redBalls[1],	
				redBalls[2],	
				redBalls[3],	
				redBalls[4],	
				redBalls[5],	
				redBalls[6],	
				redBalls[7],	
				redBalls[8],	
				redBalls[9],	
				redBalls[10],	
				redBalls[11],	
				redBalls[12],	
				redBalls[13],	
				redBalls[14] ];
	
	/****** Draw balls in their initial positions   *****/
	
	// draw all the red balls
	for (i=0;i<redBalls.length;i++)
	{
		// ball drawing code
		ctx.beginPath();
		ctx.arc(redBalls[i].x,redBalls[i].y,redBalls[i].radius,0,Math.PI * 2, false);
		ctx.fillStyle = redBalls[i].color;	
		ctx.fill();
		ctx.closePath();
	}
	
	// draw the white ball
	ctx.beginPath();
	ctx.arc(whiteBall.x,whiteBall.y,whiteBall.radius,0,Math.PI * 2, false);
	ctx.fillStyle = whiteBall.color;	
	ctx.fill();
	ctx.closePath();
	
	// draw the black ball
	ctx.beginPath();
	ctx.arc(blackBall.x,blackBall.y,blackBall.radius,0,Math.PI * 2, false);
	ctx.fillStyle = blackBall.color;	
	ctx.fill();
	ctx.closePath();
	
	// draw the pink ball
	ctx.beginPath();
	ctx.arc(pinkBall.x,pinkBall.y,pinkBall.radius,0,Math.PI * 2, false);
	ctx.fillStyle = pinkBall.color;	
	ctx.fill();
	ctx.closePath();
	
	// draw the blue ball
	ctx.beginPath();
	ctx.arc(blueBall.x,blueBall.y,blueBall.radius,0,Math.PI * 2, false);
	ctx.fillStyle = blueBall.color;	
	ctx.fill();
	ctx.closePath();
	
	// draw the brown ball
	ctx.beginPath();
	ctx.arc(brownBall.x,brownBall.y,brownBall.radius,0,Math.PI * 2, false);
	ctx.fillStyle = brownBall.color;	
	ctx.fill();
	ctx.closePath();
	
	// draw the green ball
	ctx.beginPath();
	ctx.arc(greenBall.x,greenBall.y,greenBall.radius,0,Math.PI * 2, false);
	ctx.fillStyle = greenBall.color;	
	ctx.fill();
	ctx.closePath();
	
	// draw the yellow ball
	ctx.beginPath();
	ctx.arc(yellowBall.x,yellowBall.y,yellowBall.radius,0,Math.PI * 2, false);
	ctx.fillStyle = yellowBall.color;	
	ctx.fill();
	ctx.closePath();
	
	controls();
}

window.onload = init;