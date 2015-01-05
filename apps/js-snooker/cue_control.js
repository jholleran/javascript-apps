function rotateCue(e)	{

	if (e.keyCode == 79)	

	{ //  o

		// rotate line to the left

		// if(a > 0) 

		// {

		// 	a *= -1;

		// }

		adeg += 2;
		a = adeg * Math.PI / 180;

		x2 = x1 + (Math.cos(a) * hypotenuse);
		y2 = y1 - (Math.sin(a) * hypotenuse);

	}

	if (e.keyCode == 80)   //  p

	{ 

		// rotate the other way

		// if(a < 0) 

		// {

		// 	a = Math.abs(a);

		// }

		adeg -= 2;
		a = adeg * Math.PI / 180;

		x2 = x1 + (Math.cos(a) * hypotenuse);
		y2 = y1 - (Math.sin(a) * hypotenuse);

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

	setTimeout(animate, 1000 / fps);
}



function updateWhiteBall()

{

	// this sets the shot power

	whiteBall.vx = (x1 - x2) / shotPower;

	whiteBall.vy = (y1 - y2) / shotPower;

}

