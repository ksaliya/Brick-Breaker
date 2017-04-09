/*
Brick Breaker
Saliya K.

Collision detection source:
http://stackoverflow.com/questions/401847/circle-rectangle-collision-detection-intersection
http://stackoverflow.com/questions/21089959/detecting-collision-of-rectangle-with-circle
*/

function Ball(){
	this.r = 6;
	this.position = createVector(width/2, height/2);
	this.speed = createVector(random(-3, 3), 5);

	this.show = function(){
		fill(255);
		this.update();
		ellipse(this.position.x, this.position.y, 2*this.r, 2*this.r);
	}

	this.update = function(){
		this.edges();
		this.position.add(this.speed);
	}

	this.edges = function(){
		var hit_right_edge = this.position.x + this.r > width;
		var hit_left_edge = this.position.x - this.r < 0;
		var hit_top_edge = this.position.y - this.r < 0;

		if(hit_right_edge || hit_left_edge){
			this.speed.x *= -1;
		}

		if(hit_top_edge){
			this.speed.y *= -1;
		}
	}

	this.hitPaddle = function(p){
		var x_match = this.position.x > p.position.x - p.w/2 && this.position.x < p.position.x + p.w/2;
		var y_match = this.position.y + this.r > p.position.y - p.h/2;

		if(x_match && y_match){
			this.rebounceVelocity();
		}

		if(this.position.y >= p.position.y){
			this.reset();
		}
	}

	this.reset = function(){
		this.position = createVector(width/2, height/2);
		this.speed = createVector(random(-3, 3), 5);
		state = !state;
		lives--;
	}

	this.rebounceVelocity = function(){
		this.speed.y *= -1;
		if(abs(this.speed.x) < 0.1){
			this.speed.x = this.speed.y*paddleDir*0.25;
		}
		else if(paddleDir != 0){
			this.speed.x = abs(this.speed.x)*paddleDir*1.25;
		}
	}

	this.hitBrick = function(){
		for(var i = 0; i < bricks.length; i++){
			//Check all bricks for contact with the ball
			// var y_top = bricks[i].position.y - bricks[i].h/2 < this.position.y + this.r;
			// var y_bottom = bricks[i].position.y + bricks[i].h/2 > this.position.y - this.r;
			// var x_left = bricks[i].position.x - bricks[i].w/2 < this.position.x + this.r;
			// var x_right = bricks[i].position.x + bricks[i].w/2 > this.position.x - this.r;
			
			// if(this.detectCollision(bricks[i])){
			// 	paint = 0;
			// 	bricks.splice(i,1);
			// 	this.speed.x *= -1;
			// 	this.speed.y *= -1;
			// 	// break;
			// }

			// console.log('here');

			// if(bricks.length == 0){
			// 	gameState = 'end';
			// }

			if(this.detectCollision(bricks[i]) == 'x'){
				bricks.splice(i,1);
				this.speed.y *= -1;
				// break;
			}
			else if(this.detectCollision(bricks[i]) == 'y'){
				bricks.splice(i,1);
				this.speed.x *= -1;
				// break;
			}
			else if(this.detectCollision(bricks[i]) == true){
				bricks.splice(i,1);
				this.speed.x *= -1;
				this.speed.y *= -1;
				// break;
			}
			
			
			// else{
			// 	paint = 255;
			// }

			//reverse speed if hit

			//remove brick if hit
		}
	}

// 	this.detectCollision = function(rect) {
// 	    var distX = abs(this.position.x - rect.position.x - rect.w / 2);
// 	    var distY = abs(this.position.y - rect.position.y - rect.h / 2);

// 	    if (distX > (rect.w / 2 + this.r)) {
// 	        return false;
// 	    }
// 	    if (distY > (rect.h / 2 + this.r)) {
// 	        return false;
// 	    }

// 	    if (distX <= (rect.w / 2)) {
// 	        return true;
// 	    }
// 	    if (distY <= (rect.h / 2)) {
// 	        return true;
// 	    }

// 	    var dx = distX - rect.w / 2;
// 	    var dy = distY - rect.h / 2;
// 	    return (dx * dx + dy * dy <= (this.r * this.r));
// 	}
// }

this.detectCollision = function(rect) {
	    var distX = abs(this.position.x - rect.position.x - rect.w / 2);
	    var distY = abs(this.position.y - rect.position.y - rect.h / 2);

	    if (distX > (rect.w / 2 + this.r)) {
	        return 0;
	    }
	    if (distY > (rect.h / 2 + this.r)) {
	        return 0;
	    }

	    if (distX <= (rect.w / 2)) {
	        return 'x';
	    }
	    if (distY <= (rect.h / 2)) {
	        return 'y';
	    }

	    var dx = distX - rect.w / 2;
	    var dy = distY - rect.h / 2;
	    return (dx * dx + dy * dy <= (this.r * this.r));
	}
}