/*
Brick Breaker
Saliya K.
*/

function Brick(x, y){
	this.w = 30;
	this.h = 10;
	this.position = createVector(x, y);

	this.show = function(){
		fill(paint);
		rectMode(CENTER);
		rect(this.position.x, this.position.y, this.w, this.h);
	}
}