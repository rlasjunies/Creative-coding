import {
    settings
} from "./pane.js";
import * as sketchCanvas from './canvas.js';
import * as canvasText from './util/canvasText.js';
import {
    Particule
} from "./particule.js";
import * as math from './util/math.js';

export const titleOfTheProject = "Eiffel letter";

let particules = [];

export const init = () => {
    particules = [];
    const fontSize = 30;

    const letterImageData = canvasText.getTextCanvasImageData(fontSize, "ABC");
    // console.log(letterImageData);
    // sketchCanvas.context.putImageData(letterImageData, 100, 100);

    let index = 0;
    for (let row = 0; row < letterImageData.height; row++) {
        for (let col = 0; col < letterImageData.width; col++) {
            const red = letterImageData.data[index * 4];
            const green = letterImageData.data[index * 4 + 1];
            const blue = letterImageData.data[index * 4 + 2];
            const alpha = letterImageData.data[index * 4 + 3];
            index += 1;
            //console.log(`${index}-[${col},${row}] red:${red} green:${green} blue:${blue} alpha:${alpha}`);

            const xFactor = (settings.width / letterImageData.width);
            const yFactor = (settings.height / letterImageData.height);
            const xLetter = (col / 4);
            const yLetter = (row / fontSize);
            const x = xLetter * xFactor;
            const y = yLetter * yFactor;
            if (alpha !== 0) {
                // console.log(`${index}-[${xLetter},${yLetter}][${x},${y}] red:${red} green:${green} blue:${blue} alpha:${alpha}`);
                particules.push(new Particule(col * xFactor, row * yFactor));
            }
        }
    }
}

export const settingsChanged = (deltaSettings) => {
    // use of delta settings
    // if (delta.setting != oldSettings.width) init();
    // if (newSettings.height != oldSettings.height) init();
    // if (newSettings.particulesNumber != oldSettings.particulesNumber) init();
}

export const draw = (frame) => {

    particules.forEach((p) => {
        p.draw();
        p.moveAwayIfCloseToMouse();
    });

    createConstellation();

};

const createConstellation = () => {
    for (let a = 0; a < particules.length; a++) {
        for (let b = a; b < particules.length; b++) {
            const {
                dist: dist
            } = math.distance(particules[a].x, particules[a].y, particules[b].x, particules[b].y);

            if (dist < 60) {
                sketchCanvas.context.strokeStyle = 'white';
                sketchCanvas.context.lineWidth = 2;
                sketchCanvas.context.beginPath();
                sketchCanvas.context.moveTo(particules[a].x, particules[a].y);
                sketchCanvas.context.lineTo(particules[b].x, particules[b].y);
                sketchCanvas.context.stroke();
            }
        }
    }
}