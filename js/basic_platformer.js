//Declare my variables

var canvas;
var context;
var timer;
var interval;
var player;

var platform0;
var platform1;
var platform2;
var platform3;
var platforms;

var goal;


	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	

	player = new GameObject({x:100, y:canvas.height/2-100});

	platform0 = new GameObject();
		platform0.width = 200;
		platform0.x = platform0.width/2;
		platform0.y = canvas.height - platform0.height/2;
		platform0.color = "#66ff33";

	// Moving Platforms

	platform1 = new GameObject({width:120, height:20, x:250, y:canvas.height-180, color:"#ff9933"});
	platform1.speed = 3;

	platform2 = new GameObject({width:120, height:20, x:500, y:canvas.height-300, color:"#ff9933"});
	platform2.speed = -2;

	platform3 = new GameObject({width:120, height:20, x:700, y:canvas.height-420, color:"#ff9933"});
	platform3.speed = 2.5;

	platforms = [platform0, platform1, platform2, platform3];
		
	goal = new GameObject({width:24, height:50, x:canvas.width-50, y:100, color:"#00ffff"});
	

	var fX = .85;
	var fY = .97;
	
	var gravity = 1;

	interval = 1000/60;
	timer = setInterval(animate, interval);

function animate()
{
	
	context.clearRect(0,0,canvas.width, canvas.height);	

	if(w && player.canJump && player.vy ==0)
	{
		player.canJump = false;
		player.vy += player.jumpHeight;
	}

	if(a)
	{
		player.vx += -player.ax * player.force;
	}
	if(d)
	{
		player.vx += player.ax * player.force;
	}

	// Move Platforms 

	for(let i = 1; i < platforms.length; i++)
	{
		platforms[i].x += platforms[i].speed;

		if(platforms[i].x + platforms[i].width/2 >= canvas.width || 
		   platforms[i].x - platforms[i].width/2 <= 0)
		{
			platforms[i].speed *= -1;
		}
	}

	player.vx *= fX;
	player.vy *= fY;
	
	player.vy += gravity;
	
	player.x += Math.round(player.vx);
	player.y += Math.round(player.vy);
	

	// Platform Collision

	for(let i = 0; i < platforms.length; i++)
	{
		let p = platforms[i];

		while(p.hitTestPoint(player.bottom()) && player.vy >=0)
		{
			player.y--;
			player.vy = 0;
			player.canJump = true;

			//Move player with moving platform
			if(i > 0)
			{
				player.x += p.speed;
			}
		}

		while(p.hitTestPoint(player.left()) && player.vx <=0)
		{
			player.x++;
			player.vx = 0;
		}

		while(p.hitTestPoint(player.right()) && player.vx >=0)
		{
			player.x--;
			player.vx = 0;
		}

		while(p.hitTestPoint(player.top()) && player.vy <=0)
		{
			player.y++;
			player.vy = 0;
		}
	}
	
	
	//---------Objective: Treasure!!!!!!!---------------------------------------------------------------------------------------------------- 
	//---------Run this program first.
	//---------Get Creative. Find a new way to get your player from the platform to the pearl. 
	//---------You can do anything you would like except break the following rules:
	//---------RULE1: You cannot spawn your player on the pearl!
	//---------RULE2: You cannot change the innitial locations of platform0 or the goal! 
		
	if(player.hitTestObject(goal))
	{
		goal.y = 10000;

		context.fillStyle = "black";
		context.font = "40px Arial";
		context.textAlign = "center";
		context.fillText("You Win!!!", canvas.width/2, canvas.height/2);
	}
	

	for(let i = 0; i < platforms.length; i++)
	{
		platforms[i].drawRect();
	}

	//Show hit points
	player.drawRect();
	goal.drawCircle();
}