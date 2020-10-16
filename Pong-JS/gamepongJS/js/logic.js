// Escenario
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Pelota
var ballRadius = 10;
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, 2 * Math.PI);
  ctx.fillstyle = "#0033FF";
  ctx.fillStroke = "#0033FF";
  ctx.Stroke = "10";
  ctx.fill();
  ctx.closePath();
}

// Paleta
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillstyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

// Ladrillos
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var bricks = [];
for (c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (r = 0; r < brickRowCount; r++) {
    var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
    var brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
    bricks[c][r] = { x: brickX, y: brickY, status: 1 };
  }
}

function drawBricks() {
  for (c = 0; c < brickColumnCount; c++) {
    for (r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        var brickX = bricks[c][r].x;
        var brickY = bricks[c][r].y;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

var rightPressed = false;
var leftPressed = false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = true;
  } else if (e.keyCode == 37) {
    leftPressed = true;
  }
}
function keyUpHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = false;
  } else if (e.keyCode == 37) {
    leftPressed = false;
  }
}
function paddleMovement() {
  if (rightPressed == true && paddleX <= 400) {
    paddleX += 5;
  } else if (leftPressed == true && paddleX >= 5) {
    paddleX -= 5;
  }
}

function collisionDetection() {
  for (c = 0; c < brickColumnCount; c++) {
    for (r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        if (
          x > bricks[c][r].x &&
          x < bricks[c][r].x + brickWidth &&
          y > bricks[c][r].y &&
          y < bricks[c][r].y + brickHeight
        ) {
          bricks[c][r].status = 0;
          dy *= -1;
        }
      }
    }
  }
  if (x + dx >= canvas.width - ballRadius || x < ballRadius) dx *= -1;
  if (y + dy <= ballRadius) dy *= -1;
  if (y >= canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) dy *= -1;
    else {
      clearInterval(interval);
      alert("perdiste");
      document.location.reload();
    }
  }
}

var endGame;
function evalEndGame() {
  var contador = 0;
  for (c = 0; c < brickColumnCount; c++) {
    for (r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 0) {
        contador++;
      }
    }
  }
  if (contador == brickColumnCount * brickRowCount) {
    clearInterval(interval);
    alert("ganaste");
    document.location.reload();
  }
}

// Dibujar frame
function drawFrame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  paddleMovement();
  collisionDetection();
  evalEndGame();

  // posicion pelota
  x = x + dx;
  y = y + dy;
}

// drawFrame();
var interval = setInterval(drawFrame, 10);
