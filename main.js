const canvas = document.getElementById("canvas");
const canvasWidth = 800;
const canvasHeight = 600;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

const blockSize = 64;
const moveDistance = 64

const slitherdingle = canvas.getContext("2d");
let x = 128;
let y = 128;
let e = -1
let tick = 0.5*(1000);
let goUp = false;
let goLeft = false;
slitherdingle.mozImageSmoothingEnabled = false;
slitherdingle.webkitImageSmoothingEnabled = false;
slitherdingle.msImageSmoothingEnabled = false;
slitherdingle.imageSmoothingEnabled = false;

const targetEatee = canvas.getContext("2d");
let targetX = 64;
let targetY = 64;
targetEatee.mozImageSmoothingEnabled = false;
targetEatee.webkitImageSmoothingEnabled = false;
targetEatee.msImageSmoothingEnabled = false;
targetEatee.imageSmoothingEnabled = false;

function draw(){
    targetEatee.clearRect(0,0,canvasWidth,canvasHeight)

    targetEatee.fillStyle = "fuchsia";
    targetEatee.fillRect(targetX,targetY,blockSize,blockSize)
    
    slitherdingle.fillStyle = "mediumSeaGreen";
    slitherdingle.fillRect(x,y,blockSize,blockSize)
};

function updatePos() {
    if (goLeft===true) {
        x = x - moveDistance
    } else if (goLeft===false) {
        x = x + moveDistance
    }
    if (goUp===true) {
        y = y - moveDistance
    } else if (goUp===false) {
        y = y + moveDistance
    }
    draw()
};

function moveSet() {
}

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

main()