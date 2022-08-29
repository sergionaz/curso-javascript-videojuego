const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

let canvasSize;
let elementsSize;
let level = 0;

const playerPosition = {
    x: undefined, 
    y: undefined,
};
const giftPosition = {
    x: undefined,
    y: undefined,
}
let bombPosition = [];

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.8;
    }
  
    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);
      
    elementsSize = canvasSize / 10;

    startGame();
}

function startGame() {
    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[level];
    const mapRows = map.trim().split('\n');    
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    
    game.clearRect(0, 0, canvasSize, canvasSize)

    mapRowCols.forEach((row, rowIndex) => {
         row.forEach((col, colIndex) => {
            const emoji = emojis[col];            
            const posX = elementsSize * (colIndex + 1);
            const posY = elementsSize * (rowIndex + 1);

            if (col === 'O' && playerPosition.x === undefined) {
                playerPosition.x = colIndex + 1;
                playerPosition.y = rowIndex + 1;
            }
            if (col === 'I') {
                giftPosition.x = colIndex + 1;
                giftPosition.y = rowIndex + 1;
            }
            if (col === 'X') {
                bombPosition.push({
                    x:colIndex + 1,
                    y:rowIndex + 1,
                })
            }            
            game.fillText(emoji, posX, posY);
         });
    });

    movePlayer();
}

function movePlayer() {
    game.fillText(emojis['PLAYER'], elementsSize * playerPosition.x, elementsSize * playerPosition.y);

    if (playerPosition.x === giftPosition.x && playerPosition.y === giftPosition.y) {
        if (level <= 1) {
            level += 1
            playerPosition.x = undefined;
            playerPosition.y = undefined;
            giftPosition.x = undefined;
            giftPosition.y = undefined;
            bombPosition = [];
            startGame();    
        } else {
            alert('Felicitaciones! Ya no hay más niveles :(');
        }        
    }
    for (const bomb of bombPosition) {
        if (playerPosition.x === bomb.x && playerPosition.y === bomb.y) {
            alert('Ouch!');
            playerPosition.x = undefined;
            playerPosition.y = undefined;
            giftPosition.x = undefined;
            giftPosition.y = undefined;
            bombPosition = [];
            level = 0;
            startGame();
            break;
        }
    }
}

/* Comportamiento de los botones y las teclas del teclado */
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);
window.addEventListener('keydown', moveByKeys);
function moveUp() {
    if (playerPosition.y > 1) {
        playerPosition.y -= 1;
        startGame();
    }
}
function moveLeft() {
    if (playerPosition.x > 1) {
        playerPosition.x -= 1;
        startGame();
    }
}
function moveRight() {
    if (playerPosition.x < 10) {
        playerPosition.x += 1;
        startGame();
    }    
}
function moveDown() {
    if (playerPosition.y < 10) {
        playerPosition.y += 1;
        startGame();
    }
}
function moveByKeys(event) {
    if (event.key === 'ArrowUp') moveUp();
    else if (event.key === 'ArrowLeft') moveLeft();
    else if (event.key === 'ArrowRight') moveRight();
    else if (event.key === 'ArrowDown') moveDown();
}