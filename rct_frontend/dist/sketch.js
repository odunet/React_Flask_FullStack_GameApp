//Declare global variables
let snake;
let resolution = 10;
let food;
let w;
let h;
var fr;

//Snake class
class Snake {
    constructor(){
        this.body = [];
        this.body[0] = createVector(floor(w/2),floor(h/2));
        this.xdir = 0;
        this.ydir = 0;
        this.len = 0;
    }
    update(){
        //copy the last element of the list
        let head = this.body[this.body.length-1].copy();

        //shift the array forward
        this.body.shift()
        head.x += this.xdir;
        head.y += this.ydir;
        this.body.push(head);
    }
    //grow the snake after every win
    grow(){
        let head = this.body[this.body.length-1].copy();
        this.len++;
        this.body.push(head);

        //Increase the Frame Rate every other win
        if (this.body.length%2){
            fr +=1;
            frameRate(fr);
        }
    }
    //End game if snake touches itself or any edge of the screen
    endGame(){
        let x = this.body[this.body.length-1].x
        let y = this.body[this.body.length-1].y
        if (x > w-1 || x< 0 || y>h-1 || y<0){
            return true;
        }
        for (let i=0;i<this.body.length-1;i++){
            let part = this.body[i];
            if (part.x ==x && part.y ==y){
                return true;
            }
        }
        return false;

    }

    //Display snake. Tis will loop through all vectors and array and display as pixel of snake
    show(){
        for(let i = 0; i<this.body.length; i++){
        fill(0);
        noStroke();
        rect(this.body[i].x, this.body[i].y, 1,1)
        }
    }

    //This will set direction of snake
    setDir(a,b){
        this.xdir = a;
        this.ydir = b;
    }

    //This will return true if food eaten to change position of food after eaten. It will also call the grow method.
    eat(pos){
        let x = this.body[this.body.length-1].x
        let y = this.body[this.body.length-1].y
        if (x == pos.x && y == pos.y){
            this.grow();
            return true;
        }
        else{
            false;
        }
    }
}

function setup()
{
	//create a canvas for the robot
    var canvas = createCanvas((600 < window.innerWidth) ? 600 : window.innerWidth-100,(600 < window.innerWidth) ? 600 : window.innerWidth-100 );
    canvas.parent('sketch-div');

    w = floor(width/resolution);
    h = floor(height/resolution);

    //initialize snake as snake class
    snake = new Snake();

    //reduce frame rate
    fr = 5
    frameRate(fr);

    //call food function
    foodLocation();
}

//Initialize food location
function foodLocation(){
    let x = floor(random(w));
    let y = floor(random(h));
    food = createVector(x,y);
}

//activate the an event in DOM when key is pressed
function keyPressed(){
    if (keyCode==65){
        snake.setDir(-1,0)
    }else if (keyCode==68){
        snake.setDir(1,0)
    }else if (keyCode==83){
        snake.setDir(0,1)
    }else if(keyCode==87){
        snake.setDir(0,-1)
    }
}

//Called once when the window is resized
function windowResized() {
    resizeCanvas((600 < window.innerWidth) ? 600 : window.innerWidth-100, (600 < window.innerWidth) ?600 : window.innerWidth-100);
    w = floor(width/resolution);
    h = floor(height/resolution);
    foodLocation();

    //initialize snake as snake class
    snake = new Snake();

    //Update snake location and show every frame
    // snake.show();
  }

function draw()
{   scale(resolution);
		background(200);

		//If food is eaten create random location for another food
    if (snake.eat(food)){
        foodLocation();
    	}

		//Update snake location and show every frame
    snake.update();
    snake.show();

    //Draw food
     fill(255,0,0);
     noStroke();
     rect(food.x,food.y,1,1);

    //End game, checks to see if head reaches boarder or
    //if head touches any part of body
 if (snake.endGame()){
     background(255,0,0);
     noLoop();
 		}
}