import { Container, Graphics } from "./pixi.mjs";

export class Racket{
    constructor(width = 110, height = 10){
        this.width = width;
        this.height = height;

        this._view= new Container();

        const graphics = new Graphics();
        graphics.rect(0, 0, width, height);
        graphics.fill(0x00adf5)

        this._view.addChild(graphics)
    }

    get view(){
        return this._view;
    }

    movemantRacet(x){
        this._view.x = x - this.width/2
    }
}