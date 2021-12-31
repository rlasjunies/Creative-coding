let text = 'A';
// let fontSize = settings.fontSize;
let fontFamily = 'serif';

function drawCanvas(frame) {
  const cell = settings.cellSize;
  const cols = Math.floor(settings.width / cell);
  const rows = Math.floor(settings.height / cell);
  const numCells = cols * rows;
  const typeCanvas = document.createElement('canvas');
  const typeContext = typeCanvas.getContext('2d');
  typeCanvas.width = cols;
  typeCanvas.height = rows;
  
  // resize canvas if needed
  if (canvas.width !== Math.floor(settings.width)) canvas.width = settings.width;
  if (canvas.height !== settings.height) canvas.height = settings.height;

  // clean canvas
  context.fillStyle = 'white';
  context.fillRect(0, 0, settings.width, settings.height);

  const typeData = typeTemplate(typeContext, cols, rows).getImageData(0, 0, cols, rows).data;
  //context.drawImage(typeCanvas, 0, 0);

  drawBlackBackground(context, settings.width, settings.height);
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


const patternToFillLetter = (val) => {
  if (val < 50) return '';
  if (val < 100) return '.';
  if (val < 150) return '-';
  if (val < 200) return `${text}`;

  const glyphs = '_=/+'.split('');
  return random_pick(glyphs);

}

const randomizedFont = () => {
  var r = Math.random();
  var fontSize;

  switch (true){
    case r < 0.1: 
      fontSize = settings.fontSize/2;
      break;
    case r < 0.9: 
      fontSize = settings.fontSize
      console.log(`r:${r}`);
      break;
    default:
      fontSize = settings.fontSize * 2;
      console.log(`default r:${r}`);

  }

  return `${fontSize}px ${fontFamily}`
}

const keyUp = (e) => {
  text = e.key.toUpperCase();
  drawCanvas(0);
};

document.addEventListener('keyup', keyUp);

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