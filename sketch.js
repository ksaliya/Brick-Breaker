/*
Brick Breaker
Saliya K.
*/

var ball;
var paddle;
var oldState = false;
var state = false;
var paddleDir;
var bricks = [];
var index = 0;
var lives = 5;
var paused = true;

var paint = 255;

function setup(){
	createCanvas(500, 500);

	ball = new Ball();
	paddle = new Paddle();

	layBricks();

	noLoop();
}

function showLives(){
	if(lives >= 0){
		textSize(12);
		text("Lives : "+lives, width - 60, 30);
	}
}

function draw(){
	background(70, 70, 70);
	paddle.show();
	ball.show();
	showBricks();
	ball.hitPaddle(paddle);
	ball.hitBrick();
	checkKeyPress();
	resetPaddle();
	showLives();
	gameOver();
}

function gameOver(){
	if(lives < 0){
		textSize(30);
		var msg = 'You Lost';
		msgWidht = textWidth(msg);
		text(msg, (width - msgWidht)/2, height/2 - 40);
		noLoop();
	}
	else if(bricks.length == 0){
		textSize(30);
		var msg = 'You Won';
		msgWidht = textWidth(msg);
		text(msg, (width - msgWidht)/2, height/2 - 40);
		noLoop();
	}
}

function checkKeyPress(){
	if(keyIsDown(LEFT_ARROW)){
		paddleDir = -1;
		paddle.move(-1);
	}
	else if(keyIsDown(RIGHT_ARROW)){
		paddleDir = 1;
		paddle.move(1);
	}
	else{
		paddleDir = 0;
	}
}

function resetPaddle(){
	if(oldState != state){
		paddle.reset();
		oldState = state;
	}
}

function showBricks(){
	for(var i = 0; i < bricks.length; i++){
		bricks[i].show();
	}
}

function layBricks(){
	for(var i = -5; i < 6; i++){
		for(var j = 0; j < 5; j++){
			bricks[index] = new Brick(width/2 - i*35, height/2 - 150 + j*15);
			index++;
		}
	}
}

function keyPressed(){
	if(keyCode == 32 && paused){
		paused = false;
		loop();
	}
	else if(keyCode == 32 && !paused){
		paused = true;
		noLoop();
	}
}
