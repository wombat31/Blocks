var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var score = 0;
//Ball variables
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var ballRadius = 10;
//paddle variables
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
//bricks variables
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 10;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var bricks = [];
for(var c=0; c<brickColumnCount; c++){
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++){
        bricks[c][r] = {x:0, y:0, status: 1};
    }
}

function drawScore(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "green";ctx.fillText("Score: " + score, 8, 20);
}

function collisionDetection(){
    for(var c=0; c<brickColumnCount; c++){
        for(var r=0; r<brickRowCount; r++){
            var b = bricks[c][r];
            if(b.status == 1){
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight){
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score == brickRowCount*brickColumnCount){
                        alert("YOU WIN");
                        document.location.reload();
                        clearInterval(interval);

                    }
            }
            }
        }
    }
}

function drawBricks(){
    for(var c=0; c<brickColumnCount; c++){
        for (var r=0; r<brickRowCount; r++){
            if(bricks[c][r].status == 1){
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX,brickY,brickWidth,brickHeight);
                ctx.fillStyle = "green";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}


function drawBall(){
    ctx.beginPath();
    ctx.arc(x,y,ballRadius,0, Math.PI*2);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth,paddleHeight);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    collisionDetection();

    if (x + dx > canvas.width-ballRadius || x + dx < ballRadius){
        dx = -dx;
    }

    if(y + dy<ballRadius){
        dy = -dy;
    }

    else if (y + dy > canvas.height-ballRadius){
        if(x>paddleX && x < paddleX + paddleWidth){
            dy = -dy;
        }
        else {
        alert("GAME OVER");
        document.location.reload();
        clearInterval(interval);
        }
    }
    

    if(rightPressed){
        paddleX += 7;
        if (paddleX + paddleWidth > canvas.width){
            paddleX = canvas.width - paddleWidth;
        }
    }

    else if(leftPressed){
        paddleX -= 7;
        if (paddleX < 0){
            paddleX = 0;
        }
    }

    x += dx;
    y += dy;
}


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(event){
    if(event.key == "Right" || event.key == "ArrowRight"){
        rightPressed = true;
    }
    else if(event.key == "Left" || event.key == "ArrowLeft"){
        leftPressed = true;
    }

}
function keyUpHandler(event){
    if(event.key == "Right" || event.key == "ArrowRight"){
        rightPressed = false;
    }
    else if(event.key == "Left" || event.key == "ArrowLeft"){
        leftPressed = false;
    }

}
var interval = setInterval(draw,10);