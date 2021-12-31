class Symbol {
  constructor(x, y, fontSize, canvasHeight) {
    this.chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.x = x;
    this.y = y;
    this.fontSize = fontSize;
    this.text = '';
    this.canvasHeight = canvasHeight;
  }
  draw(context) {

    this.text = this.chars.charAt(Math.floor(Math.random() * this.chars.length));
    // console.log(`draw(${this.x},${this.y}) - ${this.text}`);
    context.fillStyle = '#0aff0a';
    context.textAlign = 'center';
    context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);

    const biggerThanCanvasHeight = this.y * this.fontSize > this.canvasHeight;
    const randomizedRestartRain = Math.random() > 0.98;
    if (biggerThanCanvasHeight && randomizedRestartRain) {
      this.y = 0;
    } else {
      this.y += 1;
    }
  }
}

class Effect {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.fontSize = 25;
    this.columns = canvasWidth / this.fontSize;
    this.symbols = [];
    this.initialize();
  }
  initialize() {
    for (let index = 0; index < this.columns; index++) {
      const outOfTheCanvas = this.canvasHeight / this.fontSize + 1;
      this.symbols[index] = new Symbol(index, outOfTheCanvas, this.fontSize, this.canvasHeight);
    }
  }
}

const canvas = document.getElementById('canvaselmt');
const context = canvas.getContext('2d');

const effect = new Effect(settings.width, settings.height);
// context.font = effect.fontSize + 'px monospace';

let lastTime = 0;
let timer = 0;

createPane();
animate(0);

canvas.width = settings.width;
canvas.height = settings.height;


function animate(timeStamp) {
  const nextFrame = 1000 / settings.fps;
  if (canvas.width !== Math.floor(settings.width)) canvas.width = settings.width;
  if (canvas.height !== settings.height) canvas.height = settings.height;
  context.font = effect.fontSize + 'px monospace';

  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  // console.log(`${deltaTime} - lastime:${lastTime}`);


  if (timer > nextFrame) {
    context.fillStyle = 'rgba(0,0,0,0.05)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    effect.symbols.forEach(symbol => symbol.draw(context));
    timer = 0;
  } else {
    timer += deltaTime;
  }

  requestAnimationFrame(animate);
}