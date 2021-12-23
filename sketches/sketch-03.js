const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');

const settings = {
  dimensions: [1080, 1080],
  animate: true
};

const sketch = ({
  context,
  width,
  height
}) => {

  const agents = [];
  const padding = 50;
  const env = new Environment(width,height);

  for (let i = 0; i < 40; i++) {
    let x = random.range(padding, width - padding);
    let y = random.range(padding, height - padding);

    agents.push(new Agent(x, y, env));
  }

  return ({
    context,
    width,
    height
  }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    agents.forEach(agent => {
      agent.update();
      agent.draw(context);
    })

  };
};

canvasSketch(sketch, settings);

class Environment{
  constructor(width,height){
    this.width = width;
    this.height = height;
  }
}
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
class Movement {
  constructor(angle, vel) {
    this.angle = angle;
    this.xdirection = Math.cos(this.angle);
    this.ydirection = Math.sin(this.angle);
    this.velocity = vel;
  }

  horizontalBounce() {
    // this.angle = Math.PI - this.angle;
    // 
    this.ydirection = -this.ydirection;
    this.angle = Math.atan2(this.ydirection,this.xdirection);
  }
  verticalBounce() {
    this.xdirection = -this.xdirection;
    this.angle = Math.atan2(this.ydirection,this.xdirection);    
  }
}

class Agent {
  constructor(x, y, env) {
    this.pos = new Point(x, y);
    this.move = new Movement(random.range(0, Math.PI * 2), 1);
    this.radius = random.range(4, 12);
    this.environment = env;
  }

  update() {
    this.pos.x += this.move.xdirection * this.move.velocity;
    this.pos.y += this.move.ydirection * this.move.velocity;
    this.bounce( this.environment.width, this.environment.height );
  }

  bounce(width, height) {

    if (this.pos.x < this.radius || ((this.pos.x + this.radius) > width)) this.move.verticalBounce();
    if (this.pos.y < this.radius || ((this.pos.y + this.radius) > height)) this.move.horizontalBounce();

  }

  draw(context) {
    context.save();
    // context.fillStyle = 'black';
    context.lineWidth = 4;
    context.translate(this.pos.x, this.pos.y);

    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    // context.fill();
    context.stroke()

    context.restore();
  }
}