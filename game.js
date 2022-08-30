/* Selectores HTML */
const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const spanLives = document.querySelector('#lives');
const spanTime = document.querySelector('#time');
const spanRecord = document.querySelector('#record');

/* Default de variables */
let canvasSize;
let elementsSize;
let level = 0;
let vidas = 3;
const playerPosition = {
    x: undefined, 
    y: undefined,
};
const giftPosition = {
    x: undefined,
    y: undefined,
}
let bombPosition = [];
let timeStart = Date.now();
let timeInterval = setInterval(() => renderTime(), 100);

/* Listeners */
window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

/* Renderizado del canvas */
function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.7;
    } else {
        canvasSize = window.innerHeight * 0.7;
    }
  
    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);
      
    elementsSize = canvasSize / 10;

    startGame();
}

/* Inicialización del juego */
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

    if (localStorage.getItem('timeRecord') != undefined && localStorage.getItem('timeRecord') != 0) {
        spanRecord.innerHTML = localStorage.getItem('timeRecord');
    } else {
        spanRecord.innerHTML = 'No hay ningún record todavía.'
    }
    

    renderVidas();
    movePlayer();
}

/* Muevo el personaje */
function movePlayer() {
    game.fillText(emojis['PLAYER'], elementsSize * playerPosition.x, elementsSize * playerPosition.y);

    if (playerPosition.x === giftPosition.x && playerPosition.y === giftPosition.y) {

        /* Paso al siguiente nivel */
        if (level < maps.length - 1) {
            level += 1
            limpiarPosiciones();
            startGame();    
        } else {
            let timeDiff = Date.now() - timeStart
            if ((timeDiff < localStorage.getItem('timeRecord')) || localStorage.getItem('timeRecord') == undefined) {
                localStorage.setItem('timeRecord', timeDiff);
                alert('Felicitaciones! Superaste todos los niveles en tiempo record');
            } else {
                alert('Felicitaciones, pero no fuiste el mejor. Sigue intentando.');
            }            
            clearInterval(timeInterval);
        }    

    }
    for (const bomb of bombPosition) {
        if (playerPosition.x === bomb.x && playerPosition.y === bomb.y) {            
            
            vidas--;

            /* Arranco de nuevo el nivel */
            limpiarPosiciones();  
            if (vidas == 0) {              
                /* Arranco de nuevo el juego entero */  
                level = 0;
                vidas = 3;
            } else {
                renderVidas();                                
            }
            startGame();
            break;

        }
    }
}

function limpiarPosiciones() {
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    giftPosition.x = undefined;
    giftPosition.y = undefined;
    bombPosition = [];
}

function renderVidas() {
    spanLives.innerHTML = '';
    for (let heartIndex = 0; heartIndex < vidas; heartIndex++) {
        spanLives.innerHTML += emojis['HEART'];
    }
}

function renderTime() {
    let timeDiff = Date.now() - timeStart ;
    spanTime.innerHTML = timeDiff;
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

