const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasWidth = 800;
const canvasHeight = 600;

const blockSize = 64;
const dist = 64
let x = 0;
let y = 0;
canvas.width = canvasWidth;
canvas.height = canvasHeight;
ctx.fillStyle = 'black';
let e = -1
let tick = 1*(1000);
let goUp = false;
let goLeft = false;

let targetX = 50;
let targetY = 50;

ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

function draw(){
    ctx.clearRect(0,0,canvasWidth,canvasHeight)
    ctx.fillRect(x,y,blockSize,blockSize)
    ctx.fillRect(targetX,targetY,blockSize,blockSize)
};

function updatePos() {
    if (goLeft===true) {
        x = x - dist
    } else if (goLeft===false) {
        x = x + dist
    }
    if (goUp===true) {
        y = y - dist
    } else if (goUp===false) {
        y = y + dist
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