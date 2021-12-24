const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [1080, 1080]
};

let text = 'A';
let fontSize = 400;
let fontFamily = 'serif';

const typeCanvas = document.createElement('canvas');
const typeContext = typeCanvas.getContext('2d');

const sketch = ({
  context,
  width,
  height
}) => {
  const cell = 20;
  const cols = Math.floor(width /cell);
  const rows = Math.floor(height / cell);
  const numCells =  cols * rows;

  typeCanvas.width = cols;
  typeCanvas.height = rows;


  return ({
    context,
    width,
    height
  }) => {
    typeContext.fillStyle = 'black';
    typeContext.fillRect(0, 0, cols, rows);

    typeContext.fillStyle = 'white';
    fontSize = cols;
    typeContext.font = `${fontSize}px ${fontFamily}`;

    const metrics = typeContext.measureText(text);
    const mx = metrics.actualBoundingBoxLeft * -1;
    const my = metrics.actualBoundingBoxAscent * -1;
    const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight
    const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent

    const ctx = (cols - mw) / 2 - mx;
    const cty = (rows - mh) / 2 - my;
    typeContext.save();

    typeContext.translate(ctx, cty);

    typeContext.beginPath();
    typeContext.rect(mx, my, mw, mh);
    typeContext.stroke();

    typeContext.fillText(text, 0, 0);
    typeContext.restore();

    context.drawImage(typeCanvas,0,0);
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
