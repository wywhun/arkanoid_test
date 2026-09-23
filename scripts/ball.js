import { Container, Graphics } from "./pixi.mjs";

export class Ball{
    constructor(radius = 10){
        this.radius = radius;
        this.speedX = 7;
        this.speedY = 7;
        this.started = false;

        this._view = new Container();

        const graphicsCircle = new Graphics();
        graphicsCircle.circle(0, 0, radius)
        graphicsCircle.fill(0xffffff);

        this._view.addChild(graphicsCircle)
    }

    get view(){
        return this._view;
    }

    start(){
        this.started = true;
    }

    movemantBall(racket, app, modal){

        if (!this.started) {
            this._view.x = racket.view.x + 55;
            this._view.y = racket.view.y - this.radius - 3; 
            return; 
        }

        this._view.x += this.speedX;
        this._view.y += this.speedY;


        if (this._view.x <= 0 || this._view.x >= 1000) {
            this.speedX *= -1;
        }
        if (this._view.y <= 0) {
            this.speedY *= -1;
        }
        if (this._view.y >= 600 ){
             modal.classList.remove('hidden')
             app.ticker.stop();
             
        }
        if (racket){
            const racketX = racket.view.x;
            const racketY = racket.view.y;
            const racketWidth = 120;
            const racketHeight = 20;
        

            const racketLeft = racketX - racketWidth / 2;
            const racketRight = racketX + racketWidth / 2;
            const racketTop = racketY;
            const racketBottom = racketY + racketHeight;

        
            const ballLeft = this._view.x - this.radius;
            const ballRight = this._view.x + this.radius;
            const ballTop = this._view.y - this.radius;
            const ballBottom = this._view.y + this.radius;

        
            if (this.speedY > 0 && ballBottom >= racketTop && ballTop <= racketBottom && ballRight >= racketLeft && ballLeft <= racketRight) {
                this.speedY *= -1;
            }
        }
    }
}