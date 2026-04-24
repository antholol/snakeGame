const canvas = document.getElementById("canvas");
const canvasWidth = 800;
const canvasHeight = 600;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

const blockSize = 64;
const moveDistance = blockSize;
let tick = (1/3)*(1000);

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
const prevPositions = Array(movesRow).fill().map(() => Array(coordinatesRow).fill(null));
let move = movesRow; //the move err like in chess or whatever but moves left but whateverrr

const targetEatee = canvas.getContext("2d");
let targetX = 64;
let targetY = 64;
targetEatee.mozImageSmoothingEnabled = false;
targetEatee.webkitImageSmoothingEnabled = false;
targetEatee.msImageSmoothingEnabled = false;
targetEatee.imageSmoothingEnabled = false;

function draw(){
    targetEatee.clearRect(0,0,canvasWidth,canvasHeight)
    saveLocation();

    targetEatee.fillStyle = "fuchsia";
    targetEatee.fillRect(targetX,targetY,blockSize,blockSize);
    
    slitherdingle.fillStyle = "mediumSeaGreen";
    //slitherdingle.fillRect(slitherX,slitherY,blockSize,blockSize);
    for(let i = 0; i <= (movesRow); i = i + 1) {
        slitherdingle.fillRect(prevPositions[i][0],prevPositions[i][1],blockSize,blockSize);
    };    
    eaten();
};

function main(){
    document.addEventListener('keydown', (wasd) => {
        if (wasd.key==='e') {
            e = e * -1
        }
        if (e===-1) {
                if (wasd.key === 'd') {
                    goUp = null
                    goLeft = false
                }
                if (wasd.key === 'a') {
                    goUp = null
                    goLeft = true
                }
                if (wasd.key === 's') {
                    goLeft = null
                    goUp = false
                }
                if (wasd.key === 'w') {
                    goLeft = null
                    goUp = true
                }
            }
            if (e===1) {
                if (wasd.key === 'd') {
                    goLeft = false
                }
                if (wasd.key === 'a') {
                    goLeft = true
                }
                if (wasd.key === 's') {
                    goUp = false
                }
                if (wasd.key === 'w') {
                    goUp = true
                }
            }
    });
    setInterval(updatePos, tick)
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
    draw()
};

function eaten() {
    if(slitherX == targetX && slitherY == targetY) { //then
        eatCount = eatCount + 1
        slitherdingle.fillStyle = "white"
        slitherdingle.font = "50px EB Garamond"; //REMEMBER TO CHANGE THE px IF CHANGE BLOCK SIZE SOMEONE DECIDED THAT YOU CANT ALTER SHIT BEFORE PUTTING IT IN bruh why concatenation no work :[
        slitherdingle.fillText(">:3",(slitherX),(slitherY+blockSize));
    }
}

function saveLocation() {
    move = move - 1;
    prevPositions[move][0] = slitherX; //DONT REMOVE THE SEMI COLON OML
    prevPositions[move][1] = slitherY;


};

main()