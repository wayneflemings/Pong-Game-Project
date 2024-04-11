let lftPaddleY = 250;
let rgtPaddleY = 250;
let ballX, ballY, xBallSpeed, yBallSpeed;
let speed = 4;
let yPaddleSpeed = 0;
let lftScore = 0;
let rgtScore = 0;
let playerWins,
  computerWins = false;
let pause = false;

function setup() {
  createCanvas(700, 600);
  resetBall();
}

function draw() {
  background("black");

  //player paddle
  drawPaddle(50, lftPaddleY);
  lftPaddleY += yPaddleSpeed;

  //computer paddle
  drawPaddle(640, rgtPaddleY);

  /*
  //right paddle follows ball
  if (ballY < rgtPaddleY) {
    rgtPaddleY -= 8;
  } else if (ballY > rgtPaddleY) {
    rgtPaddleY += 8;
  }
*/

  let yDifference = ballY - rgtPaddleY;
  rgtPaddleY += yDifference * 0.2;
  rgtPaddleY = constrain(rgtPaddleY, 0, height - 50);

  //Move the ball
  ballX += xBallSpeed;
  ballY += yBallSpeed;

  //ball collision with paddles
  if (ballX < 60 && ballY > lftPaddleY && ballX < lftPaddleY + 20) {
    xBallSpeed *= -1;
  }
  if (ballX > width - 60 && ballY > rgtPaddleY && ballY < rgtPaddleY + 50) {
    xBallSpeed *= -1;
  }

  //ball collision with top and bottom
  if (ballY > height - 5 || ballY < 15) {
    yBallSpeed *= -1;
  }

  //Scoring points
  if (ballX < 0) {
    rgtScore++;
    resetBall();
  }
  if (ballX > width) {
    lftScore++;
    resetBall();
  }

  //ball
  fill("white");
  noStroke();
  circle(ballX, ballY, 15);

  //Display score
  fill("white");
  textSize(32);
  text(lftScore, width / 4, 40);
  text(rgtScore, (3 * width) / 4, 40);

  //displays who won
  if (lftScore === 5) {
    fill("green");
    text("PLAYER WINS", width / 2 - 40, height / 2, 40);
    playerWins = true;
  } else if (rgtScore === 5) {
    fill("red");
    text("COMPUTER WINS", width / 2 - 40, height / 2, 40);
    computerWins = true;
  }

  //displays text and pauses game also stops game once winner declared
  if (pause) {
    fill(255);
    textSize(20);
    text("PAUSED", width / 2 - 40, height / 2);
    xBallSpeed = 0;
    yBallSpeed = 0;
    yPaddleSpeed = 0;
  } else if (playerWins || computerWins) {
    xBallSpeed = 0;
    yBallSpeed = 0;
    yPaddleSpeed = 0;
  } else if(!pause && !playerWins && !computerWins) {
    xBallSpeed = 2;
    yBallSpeed = 2;
    
  }
}
//stops game once winner declared
if (playerWins || computerWins) {
  xBallSpeed = 0;
  yBallSpeed = 0;
  yPaddleSpeed = 0;
}

//draws paddles
function drawPaddle(x, y) {
  fill("white");
  noStroke();
  rect(x, y, 10, 55);
}

//uses 'w' and 's' as up and down
function keyPressed() {
  if (!pause) {
    if (key == "w") {
      yPaddleSpeed -= speed;
    }
    if (key == "s") {
      yPaddleSpeed = speed;
    }
  }
}
function keyReleased() {
  if (!pause) {
    if (key == "w") {
      yPaddleSpeed = 0;
    }
    if (key == "s") {
      yPaddleSpeed = 0;
    }
  }
}

//uses p as pause
function keyTyped() {
  if (key == "p") {
    pause = !pause;
    console.log(pause);
  }
}

//resets ball after scoring
function resetBall() {
  ballX = width / 2;
  ballY = height / 2;
  lftPaddle = 250;
  rgtPaddle = 250;
  
  if(!pause && !playerWins && !computerWins) {
    xBallSpeed = 2;
    yBallSpeed = 2;
    
  }
}
