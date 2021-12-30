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
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = [];
    this.initialize();
  }
  initialize() {
    for (let index = 0; index < this.columns; index++) {
      this.symbols[index] = new Symbol(index, this.canvasHeight / this.fontSize, this.fontSize, this.canvasHeight);
    }
  }
}

const { width, height, context } = initializeCanvas();
// console.log(`canvas height:${canvas.height}`);

const effect = new Effect(width, height);
context.font = effect.fontSize + 'px monospace';

let lastTime = 0;
const fps=20;
const nextFrame = 1000/fps;
let timer=0;

animate(0);

function initializeCanvas() {
  const canvas = document.getElementById('canvaselmt');
  const context = canvas.getContext('2d');
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  return { width, height, context };
}

function animate(timeStamp) {
  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  console.log(`${deltaTime} - lastime:${lastTime}`);

  if( timer > nextFrame ) {
    // context.fillStyle = 'black';
    context.fillStyle = 'rgba(0,0,0,0.05)';
    context.fillRect(0, 0, width, height);
    effect.symbols.forEach(symbol => symbol.draw(context));
    timer = 0;
  } else {
    timer += deltaTime;
  }
  
  requestAnimationFrame(animate);
}