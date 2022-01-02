import {
    settings
} from "./pane.js";
import * as sketchCanvas from "./canvas.js";
export const img = new Image();
export const titleOfTheProject = "ASCII effect";
let pixels = [];

export const init = () => {
}

export const settingsChanged = (deltaSettings) => {}

export const draw = (frame) => {
    let parsedImage = [];
    sketchCanvas.context.drawImage(img, 0, 0, settings.width, settings.height);
    const pixels = sketchCanvas.context.getImageData(0, 0, settings.width, settings.height);

    // parse image and create an abstraction with ascii code 
    let cellIndex = 0;
    // let index = 0;
    for (let y = 0; y < pixels.height; y += settings.cellSize) {
        for (let x = 0; x < pixels.width; x += settings.cellSize) {
            const index = (y * pixels.width * 4) + (x * 4);

            const red = pixels.data[index];
            const green = pixels.data[index + 1];
            const blue = pixels.data[index + 2];
            const alpha = pixels.data[index + 3];
            const avg = Math.floor((red + green + blue) / 3);
            const symbol = convertToAscii(avg);

            if (alpha > 128 && avg > 50) {
                parsedImage.push({
                    index: index,
                    x: x,
                    y: y,
                    symbol: symbol,
                    color: `rgb(${red},${green},${blue},${alpha})`
                });
                cellIndex += 1
                // console.log(`index:${cellIndex} x:${x} y:${y} avg: ${avg} symbol: ${symbol}`);
            }
        }
    } 

    sketchCanvas.cleanCanvas();
    // draw the abstracted image
    sketchCanvas.context.font = `${settings.cellSize}px Courrier`; 
    sketchCanvas.context.fillStyle = 'white';
    parsedImage.forEach(cell => {
        // sketchCanvas.context.fillStyle = cell.color; 
        sketchCanvas.context.fillText(cell.symbol, cell.x, cell.y);
        // console.log(`cell: x:${cell.x} y:${cell.y} symbol:${cell.symbol}`);
    })
    // console.log(pixels);

};

const convertToAscii = (avg) => {
    const chars = [' ', '.', '°', '*', 'o', 'a', '#', '@'];
    const slice = 255 / chars.length;
    const index = Math.floor(avg / slice);
    // console.log(`convertToAscii: avg${avg} - slice: ${slice} - index:${index} - char:[${chars[index]}]`);
    return chars[index]

}