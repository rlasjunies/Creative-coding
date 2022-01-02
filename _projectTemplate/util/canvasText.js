import * as canvas from '../canvas.js';
export const getTextCanvasImageData = (fontSize, text) => {
    const typeCanvas = document.createElement('canvas');
    const typeContext = typeCanvas.getContext('2d');

    const {
        textWidth: textW,
        textHeight: textH
    } = typeText(typeContext, text, fontSize, 'Cascadia Mono');
    const imgData = typeContext.getImageData(0, 0, textW, textH);
    //console.log(imgData);
    typeCanvas.remove();
    return imgData;
}

export const typeText = (typeContext, text, fontSize, fontFamily) => {

    // typeContext.fillStyle = 'blue';
    // typeContext.fillRect(0, 0, cols * text.length, rows);
    // typeContext.fillStyle = 'white';

    typeContext.font = `${fontSize}px ${fontFamily}`;

    const metrics = typeContext.measureText(text);
    const mx = metrics.actualBoundingBoxLeft;
    const my = metrics.actualBoundingBoxAscent;
    const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight
    const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
    //console.log(`metrics:mx:${mx} my:${my} mw:${mw} mh:${mh}`);

    // typeContext.fillStyle = 'rgb(200,100,100,0.8)';
    // typeContext.fillRect(0, 0, mw, my );

    typeContext.save();
    typeContext.fillStyle = 'blue';
    typeContext.translate(0, my);
    typeContext.fillText(text, 0, 0);
    typeContext.restore();

    return {
        textWidth: mw,
        textHeight: mh,
    }
}