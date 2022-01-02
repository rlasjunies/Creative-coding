import {
    mapRange
} from "./util/math.js";
import {
    distance
} from "./util/math.js";
import {
    settings
} from "./pane.js";

import * as sketchCanvas from './canvas.js';

export class Particule {
    /**
     * Description
     * @param {number} x
     * @param {number} y
     **/
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.initialX = this.x;
            this.initialY = this.y;
            this.density = (Math.random() * 30) + 1; // weight of the particule
            // this.size = this.density / 10;
            this.size = 3;
        }

        draw() {
            // console.log(`Draw: x:${this.x} y:${this.y} ${this.size}`);
            sketchCanvas.context.fillStyle = 'white';
            sketchCanvas.context.beginPath();
            sketchCanvas.context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            sketchCanvas.context.closePath();
            sketchCanvas.context.fill();
        }
        moveAwayIfCloseToMouse() {
            const maxDistance = settings.mouseDistance;
            //move away fast when close to the mouse, then slow down til 0
            const {
                dist: distMouse,
                dx: dxMouse,
                dy: dyMouse
            } = distance(this.x, this.y, sketchCanvas.mouse.x, sketchCanvas.mouse.y);
            // console.log(`dist:${distMouse}`);
            const speed = mapRange(distMouse, 0, maxDistance, 1, 0) * 5/this.density;
            
            const distEpsilon = maxDistance / 10 + 1;
            const toClose = distMouse < maxDistance 
            const farEnough = distMouse > maxDistance + distEpsilon
            if (toClose) {
                // push Away the particules
                this.x -= dxMouse * speed;
                this.y -= dyMouse * speed;
            } else if (farEnough) { 
                //move back to initial position smoothly
                const {
                    dist: distInit,
                    dx: dxInit,
                    dy: dyInit
                } = distance(this.x, this.y, this.initialX, this.initialY);
                // console.log(`distInit:${distInit} ${dxInit} ${dyInit} - x:${this.x} y:${this.y} initx:${this.initialX} inity:${this.initialY}`);
                if (this.x !== this.initialX) this.x += dxInit / 10;
                if (this.y !== this.initialY) this.y += dyInit / 10;
            }
        }
    }
}