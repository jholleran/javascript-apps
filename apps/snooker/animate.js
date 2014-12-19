function animate()
{
	ctx.clearRect(0,0,boundaryX,boundaryY);


	// draw cue tip
	ctx.beginPath();
	ctx.arc(x2,y2,2,0,Math.PI*2,false);
	ctx.fillStyle = 'white';
	ctx.fill();
	ctx.closePath();

	// draw red balls
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
	ctx.arc(whiteBall.x, whiteBall.y, whiteBall.radius, 0, Math.PI * 2, false);
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
	
	// draw cue	(drawn last so it is on top of all the other balls)
	ctx.beginPath();
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.strokeStyle = '#ed9121';
	ctx.lineWidth = 4;
	ctx.stroke();
	ctx.closePath();

	// white ball animation
	whiteBall.x += whiteBall.vx;
	whiteBall.y += whiteBall.vy;
	whiteBall.vx *= friction;
	whiteBall.vy *= friction;

	// standard animation for balls other than the white one
	for(i=1;i<ballArray.length;i++)
	{
		ballArray[i].x += ballArray[i].vx;
		ballArray[i].y += ballArray[i].vy;

		// friction
		ballArray[i].vx *= friction;
		ballArray[i].vy *= friction;
	}

	// boundary check
	// todo: change this so it doesn't bounce where the pockets are
	for(i=0;i<ballArray.length;i++)
	{
		// bottom
		if (ballArray[i].y >=  (boundaryY - ballArray[i].radius - 20))
			ballArray[i].vy *= -1;
		// top
		if (ballArray[i].y <=  0 + ballArray[i].radius + 20)
			ballArray[i].vy *= -1;
		// right
		if (ballArray[i].x > boundaryX - ballArray[i].radius - 20)
			ballArray[i].vx *= -1;
		// left
		if (ballArray[i].x < 0 + ballArray[i].radius + 20)
			ballArray[i].vx *= -1;
	}

	// checks if the any of the balls have collided with each other
	for(i=0;i<ballArray.length;i++)
	{
		for(j=i;j<ballArray.length;j++)
		{
			if(j != i)
			{
				if( Math.pow((ballArray[j].x - ballArray[i].x),2) + Math.pow((ballArray[j].y - ballArray[i].y),2) <= (ballArray[i].radius + ballArray[j].radius) * (ballArray[i].radius + ballArray[j].radius))
				{
					dx = ballArray[i].x - ballArray[j].x;
					dy = ballArray[i].y - ballArray[j].y;
					// collision angle is often refered to as the greek character 'phi'
					phi = Math.atan2(dy, dx);

					magnitude_1 = Math.sqrt(ballArray[i].vx * ballArray[i].vx + ballArray[i].vy * ballArray[i].vy);
					magnitude_2 = Math.sqrt(ballArray[j].vx * ballArray[j].vx + ballArray[j].vy * ballArray[j].vy);

					direction_1 = Math.atan2(ballArray[i].vy, ballArray[i].vx);
					direction_2 = Math.atan2(ballArray[j].vy, ballArray[j].vx);

					new_xspeed_1 = magnitude_1 * Math.cos(direction_1 - phi);
					new_yspeed_1 = magnitude_1 * Math.sin(direction_1 - phi);

					new_xspeed_2 = magnitude_2 * Math.cos(direction_2 - phi);
					new_yspeed_2 = magnitude_2 * Math.sin(direction_2 - phi);

					final_xspeed_1 = ((ballArray[i].mass - ballArray[j].mass) * new_xspeed_1 + (ballArray[j].mass + ballArray[j].mass) * new_xspeed_2) / (ballArray[i].mass + ballArray[j].mass);
					final_xspeed_2 = ((ballArray[i].mass + ballArray[i].mass) * new_xspeed_1 + (ballArray[j].mass - ballArray[i].mass) * new_xspeed_2) / (ballArray[i].mass + ballArray[j].mass);

					final_yspeed_1 = new_yspeed_1;
					final_yspeed_2 = new_yspeed_2;

					ballArray[i].vx = Math.cos(phi) * final_xspeed_1 + Math.cos(phi + Math.PI / 2) * final_yspeed_1;
					ballArray[i].vy = Math.sin(phi) * final_xspeed_1 + Math.sin(phi + Math.PI / 2) * final_yspeed_1;
					ballArray[j].vx = Math.cos(phi) * final_xspeed_2 + Math.cos(phi + Math.PI / 2) * final_yspeed_2;
					ballArray[j].vy = Math.sin(phi) * final_xspeed_2 + Math.sin(phi + Math.PI / 2) * final_yspeed_2;
				}
			}
		}
	}
}