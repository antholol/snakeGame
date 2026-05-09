const canvas = document.getElementById("canvas");
const canvasWidth = 832;
const canvasHeight = 640;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

const blockSize = 64;
const moveDistance = blockSize;
let tick = (1/12.5)*(1000);

const slitherdingle = canvas.getContext("2d");
let slitherX = 0; //xpos
let slitherY = 0; //ypos
let e = -1; //switch
let eatCount = 0;
let goUp = false;
let goLeft = false;
slitherdingle.mozImageSmoothingEnabled = false;
slitherdingle.webkitImageSmoothingEnabled = false;
slitherdingle.msImageSmoothingEnabled = false;
slitherdingle.imageSmoothingEnabled = false;

//why js just making a simple 2d array so goofy ahh what is this
const movesRow = 2**16;
const coordinatesRow = 2;
const prevPositions = Array(movesRow).fill().map(() => Array(coordinatesRow).fill(undefined));
let move = movesRow; //the move err like in chess or whatever but moves left but whateverrr

const targetEatee = canvas.getContext("2d");
let targetX = 64;
let targetY = 64;
targetEatee.mozImageSmoothingEnabled = false;
targetEatee.webkitImageSmoothingEnabled = false;
targetEatee.msImageSmoothingEnabled = false;
targetEatee.imageSmoothingEnabled = false;

alert("Game is go");

function main(){    
    document.addEventListener('keydown', //makes it clearer for my vb.net ahh
        function(keyboardInputs) {
            if (keyboardInputs.key==='e') {
                e = e * -1
            }
            if (e===-1) {
                    if (keyboardInputs.key === 'd') {
                        goUp = null
                        goLeft = false
                    }
                    if (keyboardInputs.key === 'a') {
                        goUp = null
                        goLeft = true
                    }
                    if (keyboardInputs.key === 's') {
                        goLeft = null
                        goUp = false
                    }
                    if (keyboardInputs.key === 'w') {
                        goLeft = null
                        goUp = true
                    }
                }
                if (e===1) {
                    if (keyboardInputs.key === 'd') {
                        goLeft = false
                    }
                    if (keyboardInputs.key === 'a') {
                        goLeft = true
                    }
                    if (keyboardInputs.key === 's') {
                        goUp = false
                    }
                    if (keyboardInputs.key === 'w') {
                        goUp = true
                    }
                }
                if (keyboardInputs.key === 'q' || keyboardInputs.key === "Escape" || keyboardInputs.key === "Enter") {
                    alert("You have paused! Click 'OK' to resume :3");
                }
    });
    setInterval(oneTick, tick)
};

function oneTick() {
    updatePos();
    saveLocation();
    if (1 < eatCount) {
        invalidHandler();
    }
    draw();
};

function updatePos() {
    if (goLeft===true) {
        slitherX = slitherX - moveDistance
    } else if (goLeft===false) {
        slitherX = slitherX + moveDistance
    }
    if (goUp===true) {
        slitherY = slitherY - moveDistance
    } else if (goUp===false) {
        slitherY = slitherY + moveDistance
    }    
};

function saveLocation() {
    move = move - 1;
    prevPositions[move][0] = slitherX; //DONT REMOVE THE SEMI COLON OML
    prevPositions[move][1] = slitherY;
};

function draw(){
    targetEatee.clearRect(0,0,canvasWidth,canvasHeight)
    
    canvas.getContext("2d").fillStyle = "midnightblue";
    canvas.getContext("2d").fillRect(0,0,canvasWidth,canvasHeight);

    targetEatee.fillStyle = "yellow";
    targetEatee.fillRect(targetX,targetY,blockSize,blockSize);
    
    slitherdingle.fillStyle = "mediumSeaGreen";
    slitherdingle.fillRect(slitherX,slitherY,blockSize,blockSize);
    for(let i = move; i <= (move + eatCount); i = i + 1) {
        slitherdingle.fillRect(prevPositions[i][0],prevPositions[i][1],blockSize,blockSize);
    };
    eaten();
    document.getElementById("comboText").innerHTML = eatCount + "x combo!";
};

function eaten() {
    if(slitherX == targetX && slitherY == targetY) { //then
        eatCount = eatCount + 1

        targetX = canvasWidth * (Math.random())
        targetX = Math.round(targetX)
        targetX = Math.floor(targetX / 64) //okay this is ridiculous what in the js is this vb.net ftw what the shit
        targetX = targetX * blockSize

        targetY = canvasHeight * (Math.random())
        targetY = Math.round(targetY)
        targetY = Math.floor(targetY / 64)
        targetY = targetY * blockSize

        slitherdingle.fillStyle = "white"
        slitherdingle.font = "50px Garamond"; //REMEMBER TO CHANGE THE px IF CHANGE BLOCK SIZE SOMEONE DECIDED THAT YOU CANT ALTER SHIT BEFORE PUTTING IT IN bruh why concatenation no work :[
        slitherdingle.fillText(">:3",(slitherX),(slitherY+blockSize));
    }
};

function invalidHandler() {
    let prevMove = (move + 2);
    const prevSlitherX = prevPositions[prevMove][0];
    const prevSlitherY = prevPositions[prevMove][1];

    if ((eatCount > 1) && ((slitherX == prevSlitherX) && (slitherY == prevSlitherY))) {
        alert("You've died");
    };
};

function gamePauseHandler() {

};

main()