function rotateCue(e)	{
	if (e.keyCode == 87)	// w    move up
	{ 
		y1 = y1 - 5;
		y2 = y2 - 5;
		centerx = Math.abs(x2 - x1) / 2;
		centery = Math.abs(y2 - y1) / 2;
		x = Math.max(x2,x1) - centerx;
		y = Math.max(y2,y1) - centery;
	}
	if (e.keyCode == 83)	 // s      move down
	{
		y1 = y1 + 5;
		y2 = y2 + 5;
		centerx = Math.abs(x2 - x1) / 2;
		centery = Math.abs(y2 - y1) / 2;
		x = Math.max(x2,x1) - centerx;
		y = Math.max(y2,y1) - centery;
	}
	if (e.keyCode == 68)     // d    to the right
	{
		x1 = x1 + 5;
		x2 = x2 + 5;
		centerx = Math.abs(x2 - x1) / 2;
		centery = Math.abs(y2 - y1) / 2;
		x = Math.max(x2,x1) - centerx;
		y = Math.max(y2,y1) - centery;
	}
	if (e.keyCode == 65)   // a   to the left
	{
		x1 = x1 - 5;
		x2 = x2 - 5;
		centerx = Math.abs(x2 - x1) / 2;
		centery = Math.abs(y2 - y1) / 2;
		x = Math.max(x2,x1) - centerx;
		y = Math.max(y2,y1) - centery;
	}
	if (e.keyCode == 79)	
	{ //  o
		// rotate line to the left
		if(a > 0) 
		{
			a *= -1;
		}
		// find center point of line
		centerx = Math.abs(x2 - x1) / 2;
		centery = Math.abs(y2 - y1) / 2;
		x = Math.max(x2,x1) - centerx;
		y = Math.max(y2,y1) - centery;
		// send points to (0,0)
		rotpointx1 = x1 - x;
		rotpointy1 = y1 - y;
		rotpointx2 = x2 - x;
		rotpointy2 = y2 - y;
		// rotate points
		// start of line
		newrotpointx1 = Math.cos(a) * rotpointx1 - Math.sin(a) * rotpointy1;
		newrotpointy1 = Math.sin(a) * rotpointx1 + Math.cos(a) * rotpointy1;
		// end of line
		newrotpointx2 = Math.cos(a) * rotpointx2 - Math.sin(a) * rotpointy2;
		newrotpointy2 = Math.sin(a) * rotpointx2 + Math.cos(a) * rotpointy2;
		// send back to original center position
		x1 = newrotpointx1 + x;
		y1 = newrotpointy1 + y;
		x2 = newrotpointx2 + x;
		y2 = newrotpointy2 + y;
	}
	if (e.keyCode == 80)   //  p
	{ 
		// rotate the other way
		if(a < 0) 
		{
			a = Math.abs(a);
		}
		centerx = Math.abs(x2 - x1) / 2;
		centery = Math.abs(y2 - y1) / 2;
		x = Math.max(x2,x1) - centerx;
		y = Math.max(y2,y1) - centery;
		rotpointx1 = x1 - x;
		rotpointy1 = y1 - y;
		rotpointx2 = x2 - x;
		rotpointy2 = y2 - y;
		newrotpointx1 = Math.cos(a) * rotpointx1 - Math.sin(a) * rotpointy1;
		newrotpointy1 = Math.sin(a) * rotpointx1 + Math.cos(a) * rotpointy1;
		x1 = newrotpointx1 + x;
		y1 = newrotpointy1 + y;
		newrotpointx2 = Math.cos(a) * rotpointx2 - Math.sin(a) * rotpointy2;
		newrotpointy2 = Math.sin(a) * rotpointx2 + Math.cos(a) * rotpointy2;
		x2 = newrotpointx2 + x;
		y2 = newrotpointy2 + y;
	}
	if(e.keyCode == 88)   // x
	{
		// hit ball!
		updateWhiteBall();
	}
	// shot power
	if(e.keyCode == 57)   // 9
	{
		shotPower = 5;
		powerPic.src = 'images/power9.jpg';
	}
	if(e.keyCode == 56)   // 8
	{
		shotPower = 10;
		powerPic.src = 'images/power8.jpg';
	}
	if(e.keyCode == 55)   // 7
	{
		shotPower = 15;
		powerPic.src = 'images/power7.jpg';
	}
	if(e.keyCode == 54)   // 6
	{
		shotPower = 20;
		powerPic.src = 'images/power6.jpg';
	}
	if(e.keyCode == 53)   // 5
	{
		shotPower = 25;
		powerPic.src = 'images/power5.jpg';
	}
	if(e.keyCode == 52)   // 4
	{
		shotPower = 30;
		powerPic.src = 'images/power4.jpg';
	}
	if(e.keyCode == 51)   // 3
	{
		shotPower = 35;
		powerPic.src = 'images/power3.jpg';
	}
	if(e.keyCode == 50)   // 2
	{
		shotPower = 40;
		powerPic.src = 'images/power2.jpg';
	}
	if(e.keyCode == 49)   // 1
	{
		shotPower = 45;
		powerPic.src = 'images/power1.jpg';
	}	
}

function updateWhiteBall()
{
	// this sets the shot power
	whiteBall.vx = (x2 - x1) / shotPower;
	whiteBall.vy = (y2 - y1) / shotPower;
}
