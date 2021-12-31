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

function drawCanvas(frame) {

  // resize canvas if needed
  if (canvas.width !== Math.floor(settings.width)) canvas.width = settings.width;
  if (canvas.height !== settings.height) canvas.height = settings.height;

  // clean canvas
  context.fillStyle = 'white';
  context.fillRect(0, 0, settings.width, settings.height);

  const cells = [];
  const cols = settings.cols;
  const rows = settings.rows;
  const numCells = cols * rows;

  const gridW = settings.width * 0.8;
  const gridH = settings.height * 0.8;
  const cellW = gridW / cols;
  const cellH = gridH / rows;
  const margX = (settings.width - gridW) * 0.5;
  const margY = (settings.height - gridH) * 0.5;

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


  context.fillStyle = 'white';
  context.fillRect(0, 0, settings.width, settings.height);

  cells.forEach((cell) => {

    context.save();
    // console.log(`${cell.cx}  ${cell.cy}`);
    context.translate(cell.cx, cell.cy);

    // return values from -1 to 1
    //const r = random.noise2D(cell.cx + frame * 10, cell.cy, 0.001);
    //const f = params.animate ? frame : params.frame;
    //const r = random_noise3D(cell.cx, cell.cy, loopCounter * 7, 0.003);
    const r = random_noise3D(cell.cx, cell.cy, loopCounter * settings.frequency, settings.amplitude / 3000)
    // rotation
    const angle = r * Math.PI * 0.2;
    // console.log(`angle:${angle}`);
    context.rotate(angle);

    // line width
    const width = math_mapRange(r, -1, 1, 0.5, 10);
    context.lineWidth = width;

    context.beginPath()
    context.moveTo(cell.w * -0.5, 0);
    context.lineTo(cell.w * 0.5, 0);
    context.stroke();

    context.restore();
  })

}