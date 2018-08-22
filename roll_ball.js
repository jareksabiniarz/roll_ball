//random gate position

var gate_pos_hor="";									//horizontal position of gate
var gate_pos_ver="";									//vertical position of gate
var ball_pos_hor="";									//horizontal position of ball
var ball_pos_ver="";									//horizontal position of ball
var goal_counter="";										//variable to store nubmer of goals
var timeleft="";										//timer

//set gate at random position
function random_position()								
{
	gate_pos=document.getElementById("gate");				//getting gate
	obj_out=document.getElementById("field");				//getting field
	var y = obj_out.offsetHeight-gate_pos.clientHeight;		//vertical variable inside the field height range
	var x = obj_out.offsetWidth-gate_pos.clientWidth;		//horizontal variable inside the field width range
	var randomX = Math.ceil((Math.random()*x)/10)*10;		//random horizontal position in multiply of 10
	var randomY = Math.ceil((Math.random()*y)/10)*10;		//random vertical position in multiply of 10
	
	gate_pos.style.left=randomX+'px';							//attribution of hor.pos.
	gate_pos.style.top=randomY+'px';							//attribution of vert.pos.
	gate_pos.style.position= "absolute";						//reset position value
	gate_pos_hor=parseInt(gate_pos.style.left);					//gate margin left in pixels
	gate_pos_ver=parseInt(gate_pos.style.top);					//gate margin top in pixels
	gate_pos_hor+=40;
	gate_pos_ver+=40;
	document.getElementById("goal_counter").innerHTML="Score: "+goal_counter+"";
}

	
//clear the ball and gate status
function init()												
{
	random_position();
	init_ball();
	timeleft=10;
	goal_counter=0;
	
}

function init_ball()
{
	ball_pos=document.getElementById("ball");				//getting ball div
	ball_pos.style.left='205px';							//relative ball position horizontal
	ball_pos.style.top='205px';								//relative ball position vertical
}

//moving the ball
function key_press(event)									//function for arrow keys
{				
	var key_code=event.keyCode;								//variable to store pressed key unicode
	switch(key_code)
	{
		case 37: 											//left arrow key launchs movement of ball
			if ((ball_pos_hor-gate_pos_hor)>55 || (ball_pos_hor-gate_pos_hor)<45 || (Math.abs(ball_pos_ver-gate_pos_ver)>25)) moveLeft(); //right gate post or inside gate or vertical
			break;
		case 38: 											//up arrow key
			if(((ball_pos_ver-gate_pos_ver!=35) || (ball_pos_hor-gate_pos_hor!=35)) && ((ball_pos_ver-gate_pos_ver!=35) || (ball_pos_hor-gate_pos_hor!=-35)))  moveUp(); //avoiding posts
			break;
		case 39: 											//right arrow key
			if ((ball_pos_hor-gate_pos_hor)<-50 || (ball_pos_hor-gate_pos_hor)>-35 || (Math.abs(ball_pos_ver-gate_pos_ver)>25)) moveRight(); //left gate post
			break;
		case 40: 											//down arrow key
			if ((Math.abs(ball_pos_hor-gate_pos_hor)>=40 || (ball_pos_ver-gate_pos_ver)<=-45)) moveDown(); //left post, right post, bar
			break;						
	}
}

function moveLeft()
{
	ball_pos.style.left=parseInt(ball_pos.style.left)-10 +'px';		//changing ball left margin for 10px each arrow key press
	ball_pos_hor=parseInt(ball_pos.style.left);							//drawing current left margin of ball from css
	ball_pos_hor+=20;													//ball center from left
	if (ball_pos_hor<="-15") 
	{
		alert("Out!");
		init_ball();
	}
}

function moveRight()
{
	ball_pos.style.left=parseInt(ball_pos.style.left)+10 +'px';
	ball_pos_hor=parseInt(ball_pos.style.left);							//drawing current left margin of ball from css
	ball_pos_hor+=20;													//ball center
	if (ball_pos_hor>="460") 
	{
		alert("Out!");
		init_ball();
	}
}

function moveUp()
{
	ball_pos.style.top=parseInt(ball_pos.style.top)-10 +'px';
	ball_pos_ver=parseInt(ball_pos.style.top);					//drawing current left margin of ball from css
	ball_pos_ver+=20;											//ball center from top
	if (ball_pos_ver<="-15") 
	{
		alert("Out!");
		init();
	}
	
	else if ((Math.abs(ball_pos_hor-gate_pos_hor))<=25)		//horizontal goal condition
	{
		if ((Math.abs(ball_pos_ver-gate_pos_ver))<=10)		//vertical goal condition
		{
		goal_counter++;
		random_position();
		}
	}
}

function moveDown()
{
	ball_pos.style.top=parseInt(ball_pos.style.top)+10 +'px';
	ball_pos_ver=parseInt(ball_pos.style.top);					//drawing current value of left margin of ball from css in px
	ball_pos_ver+=20;											//ball center
	if (ball_pos_ver>="460") 
	{
		alert("Out!");
		init_ball();
	}
}

var downloadTimer = setInterval(function()
{
    document.getElementById("timer").innerHTML = "Time left: "+timeleft+"";
	timeleft--;
    if(timeleft < 0)
		{
			alert("Time's up! You scored "+goal_counter+" times!");
			init();
		}
},1000);








