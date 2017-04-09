/*
Brick Breaker
Saliya K.
*/

function Paddle(){
	this.w = 100;
	this.h = 5;
	this.position = createVector(width/2, height - this.h);

	this.show = function(){
		fill(255);
		rectMode(CENTER);
		rect(this.position.x, this.position.y, this.w, this.h);
	}

	this.move = function(dir){
		this.position.x += 5*dir;
		this.position.x = constrain(this.position.x, this.w/2, height-this.w/2);
	}

	this.reset = function(){
		this.position.x = width/2;
	}
}