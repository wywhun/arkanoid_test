import { Application } from './pixi.mjs';
import { Racket } from './racket.js';
import { Ball } from './ball.js';
import { Block } from './block.js';
import { Bonus } from './bonus.js';

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

//БЛОКИ и БОНУСЫ

const blocks = [];
const activeBonuses = [];

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
            if (Math.random() < 0.05) {
                const bonusX = block.view.x + block.width / 2 - 10;
                const bonusY = block.view.y;
                
                const bonus = new Bonus(bonusX, bonusY);
                app.stage.addChild(bonus.view);
                activeBonuses.push(bonus);
            }
            block.destroy(app); 
            blocks.splice(i, 1);
            ball.speedY *= -1; 

            updateScore(50);

            if (blocks.length === 0){
                const modalTitle = document.querySelector('.text-lose')
                setTimeout(() => {
                app.ticker.stop();
                modal.classList.remove('hidden');
                modalTitle.textContent = 'YOU WIN!';
                btnRestart.textContent = 'REPEAT';
            }, 50);
        }

            break; 

        }
    }

    for (let i = activeBonuses.length - 1; i >= 0; i--) {
        const bonus = activeBonuses[i];
        bonus.move(ticker.deltaTime); 

        if (bonus.checkCollision(racket)) {
            racket.expand(); 
            bonus.destroy(app);
            activeBonuses.splice(i, 1);
            continue;
        }
        if (bonus.view.y > 600) {
            bonus.destroy(app);
            activeBonuses.splice(i, 1);
        }
    }


function restartGame() {
    modal.classList.add('hidden');
    blocks.forEach(block => block.destroy(app));
    blocks.length = 0;

    createBlocksGrid();

    if (typeof activeBonuses !== 'undefined') {
        activeBonuses.forEach(bonus => bonus.destroy(app));
        activeBonuses.length = 0;
    }

    racket._view.scale.x = 1;
    racket.isExpanded = false;

    ball.started = false;
    app.ticker.start();
}
btnRestart.addEventListener('click', () => {
    score = 0;
    updateScore(0);
    restartGame();
    });
});