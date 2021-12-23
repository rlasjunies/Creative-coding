const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [1080, 1080]
};

const sketch = ({
  context,
  width,
  height
}) => {
  const cells = [];
  const cols = 10;
  const rows = 10;
  const numCells = cols * rows;

  const gridW = width * 0.8;
  const gridH = height * 0.8;
  const cellW = gridW / cols;
  const cellH = gridH / rows;
  const margX = (width - gridW) * 0.5;
  const margY = (height - gridH) * 0.5;

  for (i = 0; i < numCells; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    
    const x = col * cellW + margX;
    const y = row * cellH + margY;
    const w = cellW * 0.8;
    const h = cellH * 0.8;
    const cx = x + w / 2;
    const cy = y + h / 2;
    cells.push(new Cell(x, y, w, h, cx, cy));
  }

  return ({
    context,
    width,
    height
  }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    cells.forEach((cell) => {

      context.save();
      // console.log(`${cell.cx}  ${cell.cy}`);
      context.translate(cell.cx, cell.cy);

      // return values from -1 to 1
      const r = random.noise2D(cell.cx,cell.cy,0.001);
      
      // rotation
      const angle = r * Math.PI * 0.2;
      console.log(`angle:${angle}`);
      context.rotate(angle);

      // line width
      const width = math.mapRange(r,-1,1,1,30);
      context.lineWidth = width;

      context.beginPath()
      context.moveTo(cell.w * -0.5, 0);
      context.lineTo(cell.w * 0.5, 0);
      context.stroke();

      context.restore();

    })
  };
};

canvasSketch(sketch, settings);

class Cell {
  constructor(x, y, w, h, cx, cy) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.cx = cx;
    this.cy = cy;
  }
}