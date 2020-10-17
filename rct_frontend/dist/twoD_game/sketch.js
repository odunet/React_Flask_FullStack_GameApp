/*

The Game Project 8 - Bring it all together

*/
var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;
var trees_x;
var clouds;
var mountains;
var collectable;
var canyon;
var isLeft;
var isRight;
var isFalling;
var isPlummeting;
var capture;
var game_score;
var flagpole;
var lives;
let eatSound;
let jumpSound;
let endSound;
let winSound;
let walkSound, flagSound1;
var platforms;
var enemies;
var disp;

//Preload game dependacies, e.g text, image and sound
 function preload() {
    soundFormats('mp3', 'ogg');
    eatSound = loadSound('dist/twoD_game/sound/eat.wav');
    eatSound.setVolume(0.1);
    jumpSound = loadSound('dist/twoD_game/sound/jump.wav');
    jumpSound.setVolume(0.1);
    endSound = loadSound('dist/twoD_game/sound/gameover.wav');
    endSound.setVolume(0.1);
    winSound = loadSound('dist/twoD_game/sound/wingame.wav');
    winSound.setVolume(0.1);
 }

function setup() {
  //create a canvas for the robot
  var canvas = createCanvas(800, 576);
  canvas.parent('sketch-div');

  //Initialise floor position
  floorPos_y = height * 3 / 4;

  //initialize lives
  lives = 3;

  //Call start game to initialize game variables
  startGame();
}

function draw() {
  // fill the sky blue
  background(100, 155, 255);
  noStroke();

  // draw some green ground
  fill(0, 155, 0);
  rect(0, floorPos_y, width, height / 4);

  //Implementing scrolling
  push();
  translate(scrollPos, 0);

  // Draw clouds.
  drawCloud();

  // Draw mountains.
  drawMountain();

  // Draw trees.
  drawTrees();

  // Draw canyons.
  for (var i = 0; i < canyon.length; i++) {
    drawCanyon(canyon[i]);
  }
  checkCanyon(canyon);

  // Draw collectable items.
  for (var i = 0; i < collectable.length; i++) {
    if (collectable[i].isFound == false) {
      drawCollectable(collectable[i]);
    }
  }
  checkCollectable(collectable);
    
  //Draw platform
  for(var i=0; i<platforms.length; i++){
      platforms[i].draw();
  }

  // renderFlagpole
  renderFlagpole();
    
  //Draw enemy
  for(var i = 0;i<enemies.length ; i++){
      enemies[i].draw();
      
      var isContact = enemies[i].checkContact(gameChar_world_x,gameChar_y);
      //check if game character touches enemy
      if(isContact){
          if(lives>0){
              endSound.play();
              lives -= 1;
              startGame();
              break;
          }
      }
  }

  //Keep charcter in place
  pop();

  // Draw game character.
  noStroke();
  drawGameChar();

  // Draw game score
  fill(255);
  noStroke();
  textSize(12);
  text("Score: " + game_score, 20, 20);

  /* Draw number of lives
  i have an if statement that checks if lives is
  0, and it prints a text showing 0 lives.
  however, if lives is greater than 0 the for
  loop iterates through the number of lives to draw
  yellow circles representing the life tokens */

  //Checks if live is less than 1 and prints a basic text
  if (lives == 0) {
    fill(255);
    noStroke();
    text("Lives: " + lives, 20, 35);
  }
  //Iterate through lives to print the life tokens
  for (var i = 0; i < lives; i++) {
    textSize(12);
    fill(255)
    text("Lives: ", 20, 35);
    fill('yellow');
    ellipse(60 + i * 15, 31, 10);
  }

  // Instruction for the first few minutes
    if (frameCount<2000 && frameCount%50==0){
        disp *= -1
    }
    if (disp == 1){
      fill(255);
      noStroke();
      textSize(10);
      text("Press Space to JUMP, Press Foward and Back Arrow to MOVE", 350, 20);
    }
    
  //Dispays game over when the lives is zero
  if (lives == 0) {
    fill(255, 0, 0);
    noStroke();
    textSize(25);
    text("Game over. Press space to continue.", print_page, height / 2);
    return;
  }

  //Dispays game is won and player reaches flag
  if (flagpole.isReached) {
    fill(0, 255, 0, );
    noStroke();
    textSize(25);
    flagSound1 -= 1
    if (flagSound1>1 && flagSound1<3){
        winSound.play();  
    }
    text("Level complete. Press space to continue.", print_page - 50, height / 2);
    return;
  }

  // Logic to make the game character move or the background scroll.
  if (isLeft) {
    if (gameChar_x > width * 0.2) {
      gameChar_x -= 5;
    }
    else {
      scrollPos += 5;
    }
  }

  if (isRight) {
    if (gameChar_x < width * 0.8) {
      gameChar_x += 5;
    }
    else {
      scrollPos -= 5; // negative for moving against the background
    }
  }

  // Logic to make the game character rise and fall.
  if (gameChar_y < floorPos_y) {
    var isContact = false;
    for(var i =0; i<platforms.length; i++){
        if(platforms[i].checkContact(gameChar_world_x, gameChar_y)){
            isContact = true;
            break;
        }
    }  
    if (isContact){
        isFalling = false;
    }
    if(isContact == false){
        gameChar_y += 2;
    }
  }
  else {
    isFalling = false;
  }

  //check flagpole
  if (flagpole.isReached == false) {
    checkFlagpole();
  }
    
  //Check if live is lost
  checkPlayerDie();

  // Update real position of gameChar for collision detection.
  gameChar_world_x = gameChar_x - scrollPos;
}

// ---------------------
// Key control functions
// ---------------------

function keyPressed() {
  // keys are pressed.
  if (keyCode == 65) {
    isLeft = true;
  }
  else if (keyCode == 68) {
    isRight = true;
  }
  else if (keyCode == 87 && gameChar_y == floorPos_y) {
    gameChar_y -= 100;
    isFalling = true;
    jumpSound.play()
  }
}

function keyReleased() {
  // keys are released.
  if (keyCode == 65) {
    isLeft = false;
  }
  else if (keyCode == 68) {
    isRight = false;
  }
}

// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.
function drawGameChar() {
  //the game character
  if (isLeft && isFalling) {
    // add your jumping-left code
    fill(0);
    ellipse(gameChar_x + 2, gameChar_y - 59, 20, 30);
    fill(210, 105, 30);
    ellipse(gameChar_x, gameChar_y - 60, 20, 30);
    rect(gameChar_x - 6, gameChar_y - 16, 4, 10);
    rect(gameChar_x + 2, gameChar_y - 16, 4, 10);
    //body or shirt
    fill(138, 43, 226);
    rect(gameChar_x - 5, gameChar_y - 46, 10, 30);
    fill(210, 105, 30);
    rect(gameChar_x - 18, gameChar_y - 35, 20, 5);
    fill(0);
    ellipse(gameChar_x - 7, gameChar_y - 60, 3, 3);
//    jumpSound.play();

  }

  else if (isRight && isFalling) {
    // add your jumping-right code
    fill(0);
    ellipse(gameChar_x - 2, gameChar_y - 59, 20, 30);
    fill(210, 105, 30);
    ellipse(gameChar_x, gameChar_y - 60, 20, 30);
    rect(gameChar_x - 6, gameChar_y - 16, 4, 10);
    rect(gameChar_x + 2, gameChar_y - 16, 4, 10);
    //body or shirt
    fill(138, 43, 226);
    rect(gameChar_x - 5, gameChar_y - 46, 10, 30);
    fill(210, 105, 30);
    rect(gameChar_x - 2, gameChar_y - 35, 20, 5);
    fill(0);
    ellipse(gameChar_x + 7, gameChar_y - 60, 3, 3);
//    jumpSound.play();

  }
  else if (isLeft) {
    // add your walking left code
    fill(0);
    ellipse(gameChar_x + 2, gameChar_y - 49, 20, 30);
    fill(210, 105, 30);
    ellipse(gameChar_x, gameChar_y - 50, 20, 30);
    rect(gameChar_x - 6, gameChar_y - 6, 4, 10);
    rect(gameChar_x + 2, gameChar_y - 6, 4, 10);
    //body or shirt
    fill(138, 43, 226);
    rect(gameChar_x - 5, gameChar_y - 36, 10, 30);
    fill(210, 105, 30);
    rect(gameChar_x - 2, gameChar_y - 30, 4, 20);
    fill(0);
    ellipse(gameChar_x - 7, gameChar_y - 50, 3, 3);

  }
  else if (isRight) {
    // add your walking right code
    fill(0);
    ellipse(gameChar_x - 2, gameChar_y - 49, 20, 30);
    fill(210, 105, 30);
    ellipse(gameChar_x, gameChar_y - 50, 20, 30);
    rect(gameChar_x - 6, gameChar_y - 6, 4, 10);
    rect(gameChar_x + 2, gameChar_y - 6, 4, 10);
    //body or shirt
    fill(138, 43, 226);
    rect(gameChar_x - 5, gameChar_y - 36, 10, 30);
    fill(210, 105, 30);
    rect(gameChar_x - 2, gameChar_y - 30, 4, 20);
    fill(0);
    ellipse(gameChar_x + 7, gameChar_y - 50, 3, 3);

  }
  else if (isFalling || isPlummeting) {
    // add your jumping facing forwards code
    fill(210, 105, 30);
    ellipse(gameChar_x, gameChar_y - 60, 30, 30);
    rect(gameChar_x - 13, gameChar_y - 16, 6, 7);
    rect(gameChar_x + 7, gameChar_y - 16, 6, 7);
    rect(gameChar_x - 20, gameChar_y - 35, 40, 5);
    //body or shirt
    fill(138, 43, 226);
    rect(gameChar_x - 10, gameChar_y - 46, 20, 30);
    //draw eyes
    fill(0);
    noStroke();
    ellipse(gameChar_x-7, gameChar_y - 60, 7, 4);
    ellipse(gameChar_x+7, gameChar_y - 60, 7, 4);
    //draw mouth
    noFill();
    stroke(200,0,0);
    strokeWeight(3);
    ellipse(gameChar_x, gameChar_y - 51, 9, 7);
    strokeWeight(1);

  }
  else {
    // add your standing front facing code
    fill(210, 105, 30);
    ellipse(gameChar_x, gameChar_y - 50, 30, 30);
    rect(gameChar_x - 13, gameChar_y - 6, 6, 10);
    rect(gameChar_x + 7, gameChar_y - 6, 6, 10);
    rect(gameChar_x - 20, gameChar_y - 25, 40, 5);
    //body or shirt
    fill(138, 43, 226);
    rect(gameChar_x - 10, gameChar_y - 36, 20, 30);
    //draw eyes
    fill(0);
    noStroke();
    ellipse(gameChar_x-7, gameChar_y - 53, 7, 4);
    ellipse(gameChar_x+7, gameChar_y - 53, 7, 4);
    //draw mouth
    noFill();
    stroke(200,0,0);
    strokeWeight(3);
    ellipse(gameChar_x, gameChar_y - 44, 9, 7);
    strokeWeight(1);
  }
}

// ---------------------------
// Background render functions
// ---------------------------
// Function to draw cloud objects.
function drawCloud() {
  for (var i = 0; i < clouds.length; i++) {
    fill(252, 252, 252);
    ellipse(clouds[i].x_pos, clouds[i].y_pos, clouds[i].size, clouds[i].size - 60);
    ellipse(clouds[i].x_pos, clouds[i].y_pos, clouds[i].size, clouds[i].size - 60);
    ellipse(clouds[i].x_pos, clouds[i].y_pos, clouds[i].size, clouds[i].size - 60);
    ellipse(clouds[i].x_pos, clouds[i].y_pos, clouds[i].size, clouds[i].size - 20);
  }
}

// Function to draw mountains objects.
function drawMountain() {
  for (var i = 0; i < mountains.length; i++) {
    fill(128, 132, 135);
    triangle(mountains[i].x_pos + 350, mountains[i].y_pos +
            433, mountains[i].x_pos + 400, mountains[i].y_pos + 270,
            mountains[i].x_pos + 450, mountains[i].y_pos + 433);
    triangle(mountains[i].x_pos + 425, mountains[i].y_pos +
            433, mountains[i].x_pos + 475, mountains[i].y_pos + 310,
            mountains[i].x_pos + 525, mountains[i].y_pos + 433);
    triangle(mountains[i].x_pos + 505, mountains[i].y_pos + 433,
            mountains[i].x_pos + 530, mountains[i].y_pos + 280,
            mountains[i].x_pos + 555, mountains[i].y_pos + 433);
  }
}

// Function to draw trees objects.
function drawTrees() {
  for (var i = 0; i < trees_x.length; i++) {
    fill(255);
    fill(96, 88, 100);
    rect(trees_x[i], treePos_y + 90, 30, 55);
    fill(0, 252, 0);
    triangle(trees_x[i] - 20, treePos_y + 100, trees_x[i] + 15,
            treePos_y + 60, trees_x[i] + 50, treePos_y + 100);
    triangle(trees_x[i] - 20, treePos_y + 80, trees_x[i] + 15,
            treePos_y + 40, trees_x[i] + 50, treePos_y + 80);
  }
}


// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.
function drawCanyon(t_canyon) {
  fill(100, 155, 255);
  rect(t_canyon.main_x1, 432, 150, 144);
  fill(0, 155, 0);
  triangle(t_canyon.main_x1, 576, t_canyon.main_x1, 432, t_canyon.main_x1
          + 25, 576);
  triangle(t_canyon.main_x1 + 150, 576, t_canyon.main_x1 + 150, 432,
          t_canyon.main_x1 + 120, 576);
}

// Function to check character is over a canyon.
function checkCanyon(t_canyon) {
  for (var i = 0; i < t_canyon.length; i++) {
    //Character falling into canyon
    if (gameChar_world_x > t_canyon[i].main_x1 && gameChar_world_x <
        t_canyon[i].main_x1 + 150 && gameChar_y == floorPos_y) {
        isPlummeting = true;
    }
    if (isPlummeting == true) {
        gameChar_y += 5;
    }

    //character flying over canyon
    if ((gameChar_world_x > canyon[i].main_x1 && gameChar_world_x <
        canyon[i].main_x1 + 150) && gameChar_y < (floorPos_y + 5)) {
        if (isLeft) {
            gameChar_world_x += (canyon[i].main_x1) - (canyon[i].main_x1 + 150);
        }
        else if (isRight) {
            gameChar_world_x -= (canyon[i].main_x1) - (canyon[i].main_x1 + 150);
        }
    }
  }
}

// ----------------------------------
// Collectable items render and check functions
// ----------------------------------

// Function to draw collectable objects.
function drawCollectable(t_collectable) {
  fill(255, 215, 0);
  stroke(2)
  ellipse(t_collectable.main_x + 100, t_collectable.main_y + 100,
          t_collectable.main_size / 2);
  fill(0);
  textSize(10);
  text("$", t_collectable.text_x + 100, t_collectable.text_y + 100);
}

// Function to check character has collected an item.
function checkCollectable(t_collectable) {
  for (var i = 0; i < t_collectable.length; i++) {
    if (dist(gameChar_world_x, gameChar_y, t_collectable[1].main_x + 100,
        t_collectable[0].main_y + 100) < 20) {
        t_collectable[i].isFound = true;
        game_score = +1;
        
        //Play Song if collectible is won. Also ensures that sound doesn't persist
        t_collectable[i].beeper -= 1;
        if (t_collectable[i].beeper>0 && t_collectable[i].beeper<=3){
            eatSound.play();
        }
    }
  }
}

// Function to render flagpole on screen
function renderFlagpole() {
  push();
  strokeWeight(5);
  stroke(180);
  line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 250)
  fill(255, 0, 255);
  noStroke();
  if (flagpole.isReached) {
    rect(flagpole.x_pos, floorPos_y - 250, 50, 50);
  }
  else {
    rect(flagpole.x_pos, floorPos_y - 50, 50, 50);
  }
  pop();
}

function checkFlagpole() {
  var d = abs(gameChar_world_x - flagpole.x_pos)
  if (d < 15) {
    flagpole.isReached = true;
      winSound.play();
  }
}

//function to check when the plyer falls below canyons
function checkPlayerDie() {
  if (gameChar_y > height && gameChar_y < height + 2) {
    if (lives > 0) {
      lives -= 1;
      gameChar_x = (width / 2)-350;
      gameChar_y = floorPos_y;
      isPlummeting = false;

    }
    else {
      startGame();
    }
  }
}

// Function to initialize all variables, loaded with setup fucntion
function startGame() {
  print_page = width / 2
  gameChar_x = (width / 2)-350;
  gameChar_y = floorPos_y;
  trees_x = [100, 300, 500, 1000]
  treePos_y = height / 2
  flagSound1 = 3
  clouds = [{
    x_pos: 200,
    y_pos: 150,
    size: 130
  }, {
    x_pos: 270,
    y_pos: 160,
    size: 130
  }, {
    x_pos: 130,
    y_pos: 160,
    size: 130
  }, {
    x_pos: 200,
    y_pos: 170,
    size: 100
  }]
    
  disp = 1    
  platforms = [];
  platforms.push(createPlatforms(950,floorPos_y-70, 120));
  platforms.push(createPlatforms(750,floorPos_y-70, 100));
  platforms.push(createPlatforms(550,floorPos_y-70, 60));
  platforms.push(createPlatforms(1250,floorPos_y-70, 60));
    
  enemies = [];
  enemies.push(new Enemy(600,floorPos_y-10,200));
  enemies.push(new Enemy(750,floorPos_y-10,200));
  enemies.push(new Enemy(1000,floorPos_y-10,200));
  enemies.push(new Enemy(1400,floorPos_y-10,200));
    
  mountains = [{
    x_pos: 0,
    y_pos: 0
  }, {
    x_pos: 0,
    y_pos: 0
  }, {
    x_pos: 0,
    y_pos: 0
  }]
  canyon = [{
    main_x1: 150
  }]
  collectable = [{
    main_x: 300,
    main_y: 320,
    main_size: 30,
    text_x: 297,
    text_y: 323,
    isFound: false, 
    beeper:4
  }, {
    main_x: 350,
    main_y: 320,
    main_size: 30,
    text_x: 347,
    text_y: 323,
    isFound: false, 
    beeper:4
  }, {
    main_x: 380,
    main_y: 327,
    main_size: 30,
    text_x: 377,
    text_y: 330,
    isFound: false,
    beeper:4
  }]

  // Variable to control the background scrolling.
  scrollPos = 0;

  // Variable to store the real position of the gameChar in the game
  // world. Needed for collision detection.
  gameChar_world_x = gameChar_x - scrollPos;

  // Boolean variables to control the movement of the game character.
  isLeft = false;
  isRight = false;
  isFalling = false;
  isPlummeting = false;

  // Initialise game game_score
  game_score = 0

  // initialize flagpole objects
  flagpole = {
    isReached: false,
    x_pos: 1500,
    char: false
  }
}

//Create Platforms factory
function createPlatforms(x, y, length){
    var p = {
        x: x,
        y: y,
        length: length,
        
        draw: function(){
            stroke(189, 183, 107);
            strokeWeight(4)
            fill(0 , 128, 128);
            rect(this.x, this.y, this.length, 20);
        },
        //Check if character is in contact with platform
        checkContact: function(gc_x, gc_y){
            if(gc_x > this.x && gc_x< (this.x + this.length)){
                var d = this.y-gc_y;
                if(d >= 0 && d < 5){
                    return true;
                }
                else{
                    return false;
                }
            }
        }
}
    return p;
}

//create enemies
function Enemy(x,y,range){
    this.x = x;
    this.y = y;
    this.range = range;
    
    this.currentX = x;
    this.inc = random(0,1)*5;
    //method to updte enemy location
    this.update = function(){
        this.currentX += this.inc;
        if (this.currentX >= this.x+this.range){
            this.inc = -1;
        }
        else if (this.currentX < this.x){
            this.inc = 1;
        }
    }
    //method to draw enemy
    this.draw = function(){
        this.update();
        strokeWeight(2);
        stroke(0);
        fill(255,0,0);
        ellipse(this.currentX, this.y-30, 20, 20);
        fill(random(0,255),random(0,255),random(0,255));
        rect(this.currentX-10, this.y-30+10, 20, 20);
        fill(0,0,0);
        rect(this.currentX-7, this.y-30+30, 15, 10);
    }
    //method to check if enemy touche the game character
    this.checkContact = function(gc_x,gc_y){
        var d = dist(gc_x,gc_y,this.currentX,this.y);
        if (d<15){
            return true;
        }
        else{
            return false;
        }
    }
}