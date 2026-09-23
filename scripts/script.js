import { Application } from './pixi.mjs';
import { Racket } from './racket.js';
import { Ball } from './ball.js';

const app = new Application();

await app.init({
    width: 1000,
    height: 600,
    background: 0x000000,
})

app.stage.eventMode = 'static'
app.stage.hitArea = app.screen;


document.body.appendChild(app.canvas);

const racket = new Racket();

racket._view.y = 530;
racket.movemantRacet(500)


app.stage.addChild(racket._view)

app.stage.on('pointermove', (event) => {
    racket.movemantRacet(event.global.x)
})


const ball = new Ball();

const modal = document.querySelector('.modal-window');
const btnRestart = document.querySelector('.btn-restart');

app.stage.addChild(ball._view)

app.ticker.add(() => {
    ball.movemantBall(racket, app, modal);
})

app.stage.on('pointerdown', () => {
    ball.start()
})

btnRestart.addEventListener('click', ()=>{
    modal.classList.add('hidden')
    ball.started = false;
    app.ticker.start()
})