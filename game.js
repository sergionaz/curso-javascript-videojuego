const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

let canvasSize;
let elementsSize;

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

    const map = maps[1];
    const mapRows = map.trim().split('\n');    
    const mapRowCols = mapRows.map(row => row.trim().split(''));

    mapRowCols.forEach((row, rowIndex) => {
         row.forEach((col, colIndex) => {
            const emoji = emojis[col];
            const posX = elementsSize * (colIndex + 1);
            const posY = elementsSize * (rowIndex + 1);
            game.fillText(emoji, posX, posY);
         });
    });
}

/* Comportamiento de los botones y las teclas del teclado */
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);
window.addEventListener('keydown', moveByKeys);
function moveUp() {
    console.log('Me quiero mover hacia arriba');
}
function moveLeft() {
    console.log('Me quiero mover hacia la izquierda');
}
function moveRight() {
    console.log('Me quiero mover hacia la derecha');
}
function moveDown() {
    console.log('Me quiero mover hacia abajo');
}
function moveByKeys(event) {
    if (event.key === 'ArrowUp') moveUp();
    else if (event.key === 'ArrowLeft') moveLeft();
    else if (event.key === 'ArrowRight') moveRight();
    else if (event.key === 'ArrowDown') moveDown();
}
/* Comportamiento de los botones y las teclas del teclado */
