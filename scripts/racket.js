import { Container, Graphics } from "./pixi.mjs";

export class Racket{
    constructor(width = 110, height = 10){
        this.baseWidth = width;
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

    get width() {
        return this.baseWidth * this._view.scale.x;
    }

    movemantRacet(x){
        this._view.x = x - this.width/2
    }

    
    expand(duration = 8000) { 
        if (this.isExpanded) return;

        this.isExpanded = true;
        this._view.scale.x = 1.5;

        setTimeout(() => {
            this._view.scale.x = 1;
            this.isExpanded = false;
        }, duration);
    }
}