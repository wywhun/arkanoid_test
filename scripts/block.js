import { Container, Graphics } from "./pixi.mjs";

export class Block {
    constructor( x, y, width=80, height=25, color = 0xef4444){
        this.width = width;
        this.height = height;
        this.isDestroy = false;
    
        this._view = new Container();

        this._view.x = x;
        this._view.y = y;

        const graphicsBlock = new Graphics();
        graphicsBlock.roundRect(0, 0, this.width, this.height, 6);
        graphicsBlock.fill({ color: color, alpha: 0.85 });
        graphicsBlock.stroke({ width: 1.5, color: 0xffffff, alpha: 0.4 });

        this._view.addChild(graphicsBlock);
    }

    get view(){
        return this._view;
    }

    destroy(app) {
        this.isDestroy = true;
        app.stage.removeChild(this._view);
        this._view.destroy({ children: true })
    }

    

    checkCollision(ball) {
        if (this.isDestroy) return false;

        const bLeft = this._view.x;
        const bRight = this._view.x + this.width;
        const bTop = this._view.y;
        const bBottom = this._view.y + this.height;

        const ballLeft = ball.view.x - ball.radius;
        const ballRight = ball.view.x + ball.radius;
        const ballTop = ball.view.y - ball.radius;
        const ballBottom = ball.view.y + ball.radius;

        return (
            ballRight >= bLeft &&
            ballLeft <= bRight &&
            ballBottom >= bTop &&
            ballTop <= bBottom
        );
    }
}