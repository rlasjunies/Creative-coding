import {
    mapRange
} from "./util/math.js";
import {
    distance
} from "./util/math.js";
import {
    settings
} from "./pane.js";

import * as canvasUtil from './canvas.js';

export class Particule {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.initialX = this.x;
        this.initialY = this.y;
        this.density = (Math.random() * 30) + 1; // weight of the particule
        this.size = this.density / 10;
    }

    draw() {
        // console.log(`Draw: x:${this.x} y:${this.y} ${this.size}`);
        canvasUtil.context.fillStyle = 'white';
        canvasUtil.context.beginPath();
        canvasUtil.context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        canvasUtil.context.closePath();
        canvasUtil.context.fill();
    }
}