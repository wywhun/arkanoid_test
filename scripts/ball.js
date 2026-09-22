import { Container, Graphics } from "./pixi.mjs";

export class Ball{
    constructor(radius = 10){
        this.radius = radius;
        this.speedX = 7;
        this.speedY = 7;

        this._view = new Container();

        const graphicsCircle = new Graphics();
        graphicsCircle.circle(0, 0, radius)
        graphicsCircle.fill(0xffffff);

        this._view.addChild(graphicsCircle)
    }

    get view(){
        return this._view;
    }

    movemantBall(){
        this._view.x += this.speedX;
        this._view.y += this.speedY;
    }
}