import { Container, Graphics } from "./pixi.mjs";

export class Bonus {
    constructor(x, y, width = 20, height = 20) {
        this.width = width;
        this.height = height;
        this.speedY = 3; 
        this.isCollected = false;

        this._view = new Container();
        this._view.x = x;
        this._view.y = y;


        const graphics = new Graphics();
        graphics.roundRect(0, 0, this.width, this.height, 4).fill(0x22c55e);
        graphics.rect(8, 4, 4, 12).fill(0xffffff);
        graphics.rect(4, 8, 12, 4).fill(0xffffff);

        this._view.addChild(graphics);
    }

    get view() {
        return this._view;
    }

  
    move(delta = 1) {
        this._view.y += this.speedY * delta;
    }

   
    checkCollision(racket) {
        if (this.isCollected) return false;

        const bLeft = this._view.x;
        const bRight = this._view.x + this.width;
        const bTop = this._view.y;
        const bBottom = this._view.y + this.height;

        const racketX = racket.view.x;
        const racketY = racket.view.y;
        const racketWidth = racket.width || 120; 
        const racketHeight = 20;

        return (
            bRight >= racketX &&
            bLeft <= racketX + racketWidth &&
            bBottom >= racketY &&
            bTop <= racketY + racketHeight
        );
    }

    destroy(app) {
        this.isCollected = true;
        app.stage.removeChild(this._view);
        this._view.destroy({ children: true });
    }
}