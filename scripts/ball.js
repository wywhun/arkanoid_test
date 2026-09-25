import { Container, Graphics } from "./pixi.mjs";

export class Ball{
    constructor(radius = 10){
        this.radius = radius;
        this.speedX = 10;
        this.speedY = 10;
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

    movemantBall(racket, app, modal, delta = 1){

        if (!this.started) {
            this._view.x = racket.view.x + 55;
            this._view.y = racket.view.y - this.radius - 3; 
            return; 
        }

        this._view.x += Math.round(this.speedX * delta);
        this._view.y += Math.round(this.speedY * delta);


        if (this._view.x - this.radius <= 0 && this.speedX < 0) {
            this._view.x = this.radius; 
            this.speedX *= -1;
        }
        if (this._view.x + this.radius >= 1000 && this.speedX > 0) {
            this._view.x = 1000 - this.radius; 
            this.speedX *= -1;
        }
        if (this._view.y - this.radius <= 0 && this.speedY < 0) {
            this._view.y = this.radius; 
            this.speedY *= -1;
        }
        if (this._view.y >= 600 ){
             modal.classList.remove('hidden')
             app.ticker.stop();
             
        }
        if (racket){
            const racketX = racket.view.x;
            const racketY = racket.view.y;
            const racketWidth = racket.width;
            const racketHeight = 20;
        

            const racketLeft = racketX;
            const racketRight = racketX + racketWidth;
            const racketTop = racketY;
            const racketBottom = racketY + racketHeight;

        
            const ballLeft = this._view.x - this.radius;
            const ballRight = this._view.x + this.radius;
            const ballTop = this._view.y - this.radius;
            const ballBottom = this._view.y + this.radius;

        
            if (this.speedY > 0 && ballBottom >= racketTop && ballTop <= racketBottom && ballRight >= racketLeft && ballLeft <= racketRight) {
                this.speedY *= -1;
                this._view.y = racketTop - this.radius;
            }
        }
    }
}