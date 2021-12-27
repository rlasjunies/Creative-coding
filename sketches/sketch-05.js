const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [1080, 1080]
};

let text = 'A';
let fontSize = 400;
let fontFamily = 'serif';


const sketch = ({
  context,
  width,
  height
}) => {
  const cell = 20;
  const cols = Math.floor(width / cell);
  const rows = Math.floor(height / cell);
  const numCells = cols * rows;
  const typeCanvas = document.createElement('canvas');
  const typeContext = typeCanvas.getContext('2d');
  typeCanvas.width = cols;
  typeCanvas.height = rows;


  return ({
    context,
    width,
    height
  }) => {

    const typeData = typeTemplate(typeContext, cols, rows).getImageData(0, 0, cols, rows).data;
    //context.drawImage(typeCanvas, 0, 0);

    drawBlackBackground(context, width, height);
    // console.log(typeData);

    for (i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cell;
      const y = row * cell;

      const r = typeData[i * 4 + 0];
      const g = typeData[i * 4 + 1];
      const b = typeData[i * 4 + 2];
      // const alpha = typeData[i * 4 + 4];

      context.fillStyle = `rgb(${r},${g},${b})`;
      context.save();
      context.translate(x, y);
      // context.fillRect(0,0,cell,cell);

      // context.beginPath();
      // context.arc(cell * 0.5, cell * 0.5, cell * 0.5, 0, Math.PI * 2);
      // context.fill();

      context.font = randomizedFont();
      context.fillText(patternToFillLetter(r), 0, 0)
      context.restore();
    }

  };
};

const patternToFillLetter = (val) => {
  if (val < 50) return '';
  if (val < 100) return '.';
  if (val < 150) return '-';
  if (val < 200) return `${text}`;

  const glyphs = '_=/+'.split('');
  return random.pick(glyphs);

}

const randomizedFont = () => {
  var r = Math.random();
  var fontSize;

  switch (true){
    case r < 0.1: 
      fontSize = 20;
      break;
    case r < 0.9: 
      fontSize = 40;
      console.log(`r:${r}`);
      break;
    default:
      fontSize = 80;
      console.log(`default r:${r}`);

  }

  return `${fontSize}px ${fontFamily}`
}

const keyUp = (e) => {
  text = e.key.toUpperCase();
  manager.render();
};

document.addEventListener('keyup', keyUp);

const start = async () => {
  manager = await canvasSketch(sketch, settings);
}

const drawBlackBackground = (context, width, height) => {
  var oldFillStyle = context.fillStyle;
  context.fillStyle = 'black';
  context.fillRect(0, 0, width, height);
  context.fillStyle = oldFillStyle;
}

const typeTemplate = (typeContext, cols, rows) => {

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
  typeContext.fillText(text, 0, 0);
  typeContext.restore();

  return typeContext
}

start();