import { Application } from './pixi.mjs';
import { Racket } from './racket.js';

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
