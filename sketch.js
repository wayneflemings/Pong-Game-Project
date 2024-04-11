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
  createCanvas(700, 500);
  resetBall();
}

function draw() {
  background("black");

  //player paddle
  drawPaddle(50, lftPaddleY);
  lftPaddleY += yPaddleSpeed;

  //computer paddle
  drawPaddle(640, rgtPaddleY);

  //ball
  fill("white");
  noStroke();
  circle(ballX, ballY, 15);

  //right paddle follows ball
  if (ballY < rgtPaddleY) {
    rgtPaddleY -= speed;
  } else if (ballY > rgtPaddleY) {
    rgtPaddleY += speed;
  }

  //Move the ball
  ballX += xBallSpeed;
  ballY += yBallSpeed;

  //ball collision with top and bottom
  if (ballY > height - 5 || ballY < 10) {
    yBallSpeed *= -1;
  }

  //ball collision with paddles
  if (ballX < 50 && ballY > lftPaddleY && ballX < lftPaddleY + 20) {
    xBallSpeed *= -1;
  }
  if (ballX > width - 50 && ballY > rgtPaddleY && ballY < rgtPaddleY + 20) {
    xBallSpeed *= -1;
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
  } else {
    xBallSpeed = random(2, 4);
    yBallSpeed = random(2, 4);
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
  rect(x, y, 10, 50);
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
  xBallSpeed = random(2, 4);
  yBallSpeed = random(2, 4);
  lftPaddle = 250;
  rgtPaddle = 250;
}
