let text = 'A';
// let fontSize = settings.fontSize;
let fontFamily = 'serif';
let PatternFactorVariator = 0;
class FlowFieldEffect {
  constructor(context) {
    this.context = context;
    // this.context.strokeStyle = 'white';
    // this.width = width;
    // this.height = height;
    // this.draw(10,10);
    this.x = 0;
    this.y = 0;
    this.angle = 0;
    this.createGradient();
    // this.strokeStyle = this.gradient;
  }

  createGradient() {
    this.gradient = this.context.createLinearGradient(0, 0, settings.width, settings.height);
    this.gradient.addColorStop(0.1, "#ff5c33");
    this.gradient.addColorStop(0.2, "#ff66b3");
    this.gradient.addColorStop(0.4, "#ccccff");
    this.gradient.addColorStop(0.6, "#b3ffff");
    this.gradient.addColorStop(0.8, "#80FF80");
    this.gradient.addColorStop(0.9, "#ffff33");
  }

  drawLine(angle, x, y) {
    //distance with mouse
    // const dist = Math.sqrt((mouse.x - x)*(mouse.x - x)+(mouse.y-y)*(mouse.y-y))
    const dist = Math.log10(((mouse.x - x)*(mouse.x - x)+(mouse.y-y)*(mouse.y-y))/300000);

    // this.context.strokeStyle = 'white';
    this.context.strokeStyle = this.gradient;
    this.context.lineWidth = settings.lineWidth;
    this.context.beginPath();
    this.context.moveTo(x, y);
    const tox = x + Math.cos(angle) * settings.LineLengthCosFactor * dist;
    const toy = y + Math.sin(angle) * settings.LineLengthSinFactor * dist;
    this.context.lineTo(tox, toy);
    // console.log(`x:${cx} y:${cy} tox:${x} toy:${y} canvas.style.left:${canvas.style.left} canvas.style.top:${canvas.style.top}`);
    this.context.stroke();
  }



  animate() {

    if( settings.AnimatePatternFactor) {PatternFactorVariator+=0.01;} else {PatternFactorVariator=0;}
    this.angle += 0.1;
    // this.draw(this.width/2 + Math.sin(this.angle) * 100, this.height/2 + Math.cos(this.angle) * 100);

    for (let x = 0; x < settings.width; x += settings.cellSize) {
      for (let y = 0; y < settings.height; y += settings.cellSize) {
        const angle = (Math.cos(x * settings.PatternZoomCosFactor / 50) + Math.sin(y * settings.PatternZoomSinFactor / 50)) * (settings.PatternFactor + PatternFactorVariator);
        this.drawLine(angle, x, y);
      }
    }
    this.drawLine(mouse.x, mouse.y);
  }
}

const flowField = new FlowFieldEffect(context, settings.width, settings.height);

function drawCanvas(frame) {

  // resize canvas if needed
  if (canvas.width !== Math.floor(settings.width)) canvas.width = settings.width;
  if (canvas.height !== Math.floor(settings.height)) canvas.height = settings.height;
  console.log("drawcanvas");
  // clean canvas
  context.fillStyle = 'black';
  context.fillRect(0, 0, settings.width, settings.height);
  flowField?.animate();
};

const mouse = {
  x: 0,
  y: 0,
}
canvas.addEventListener('mousemove', (e) => {
  mouse.x = e.x - e.target.offsetLeft;
  mouse.y = e.y - e.target.offsetTop;
});