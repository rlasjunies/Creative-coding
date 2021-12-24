const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [1080, 1080]
};

let text = 'A';
let fontSize = 400;
let fontFamily = 'serif';

const sketch = () => {
  return ({
    context,
    width,
    height
  }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'black';
    context.font = `${fontSize}px ${fontFamily}`;
    // context.baseLine = 'middle';
    // context.textAlign = 'center';

    const metrics = context.measureText(text);
    const mx = metrics.actualBoundingBoxLeft * -1;
    const my = metrics.actualBoundingBoxAscent * -1;
    const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight
    const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent

    const ctx = (width - mw) / 2 - mx;
    const cty = (height - mh) / 2 - my;
    context.save();

    context.translate(ctx, cty);

    context.beginPath();
    context.rect(mx, my, mw, mh);
    context.stroke();

    context.fillText(text, 0, 0);
    context.restore();
  };
};

const keyUp = (e) => {
  text = e.key.toUpperCase();
  manager.render();
};

document.addEventListener('keyup', keyUp);

const start = async () => {
  manager = await canvasSketch(sketch, settings);
}

start();
