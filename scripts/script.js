import { Application } from './pixi.mjs';
import { Racket } from './racket.js';
import { Ball } from './ball.js';
import { Block } from './block.js';

const app = new Application();

await app.init({
    width: 1000,
    height: 600,
    background: 0x000000,
    antialias: true,                       
    resolution: window.devicePixelRatio || 1, 
    autoDensity: true
})

app.stage.eventMode = 'static'
app.stage.hitArea = app.screen;


document.body.appendChild(app.canvas);

//ОЧКИ
let score = 0;
const scoreValueEl = document.getElementById('score-value');

function updateScore(points) {
    score += points;
    scoreValueEl.textContent = score;
}

function resetScore() {
    score = 0;
    scoreValueEl.textContent = '0';
}

//РАКЕТКА
const racket = new Racket();

racket._view.y = 530;
racket.movemantRacet(500)


app.stage.addChild(racket._view)

app.stage.on('pointermove', (event) => {
    racket.movemantRacet(event.global.x)
})

//МЯЧ
const ball = new Ball();

const modal = document.querySelector('.modal-window');
const btnRestart = document.querySelector('.btn-restart');

app.stage.addChild(ball._view)

app.stage.on('pointerdown', () => {
    ball.start()
})

btnRestart.addEventListener('click', ()=>{
    modal.classList.add('hidden')
    ball.started = false;
    app.ticker.start()
})

//БЛОКИ

const blocks = [];

function createBlocksGrid(){
    const rows = 4;
    const cols = 10;
    const blockWidth = 80;
    const blockHeight = 25;
    const padding = 15;
    const offsetTop = 60;
    const offsetLeft = 32.5;

    const rowColors = [ 0xef4444, 0xf97316, 0x06b6d4, 0x8b5cf6 ];

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const x = offsetLeft + c * (blockWidth + padding);
            const y = offsetTop + r * (blockHeight + padding);

            const block = new Block(x, y, blockWidth, blockHeight, rowColors[r]);
            app.stage.addChild(block.view);
            blocks.push(block);
        }
    }
}

createBlocksGrid();

app.ticker.add((ticker) => {
    ball.movemantBall(racket, app, modal, ticker.deltaTime); 
    for (let i = blocks.length - 1; i >= 0; i--) {
        const block = blocks[i];
        if (block.checkCollision(ball)) {
            block.destroy(app); 
            blocks.splice(i, 1);
            ball.speedY *= -1; 

            updateScore(50);

            if (blocks.length === 0){
                app.ticker.stop()
            }

            break; 

        }
    }
});