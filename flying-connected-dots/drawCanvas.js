// prepare scene
const agents = [];
const padding = 50;

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
    this.angle = Math.atan2(this.ydirection, this.xdirection);
  }
  verticalBounce() {
    this.xdirection = -this.xdirection;
    this.angle = Math.atan2(this.ydirection, this.xdirection);
  }
}

class Agent {
  constructor(x, y ) { 
    this.pos = new Point(x, y);
    this.move = new Movement(random_range(0, Math.PI * 2), 1);
    this.radius = random_range(4, 12);
    this.width = settings.width;
    this.height = settings.height;
    // this.lineWidth = Math.random() * 3;
    this.lineWidth = 2;
  }

  distance(otherAgent) {
    // console.log("agent" + otherAgent);
    // console.log(`Agent:${this.pos.x} -${this.pos.y}`);
    const dx = this.pos.x - otherAgent.pos.x;
    const dy = this.pos.y - otherAgent.pos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // console.log(`distance: ${dist}`);
    return dist;
  }

  update() {
    this.pos.x += this.move.xdirection * this.move.velocity;
    this.pos.y += this.move.ydirection * this.move.velocity;
    this.bounce(this.width, this.height);
  }

  // bounce(width, height) {
  bounce() {

    if (this.pos.x < this.radius || ((this.pos.x + this.radius) > this.width)) this.move.verticalBounce();
    if (this.pos.y < this.radius || ((this.pos.y + this.radius) > this.height)) this.move.horizontalBounce();

  }

  draw(context) {
    context.save();
    // context.fillStyle = 'black';
    context.lineWidth = this.lineWidth;
    context.translate(this.pos.x, this.pos.y);

    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    // context.fill();
    context.stroke()

    context.restore();
  }
}


for (let i = 0; i < 40; i++) {
  let x = random_range(padding, settings.width - padding);
  let y = random_range(padding, settings.height - padding);

  agents.push(new Agent(x, y, settings.width, settings.height));
}

function drawCanvas() {

  // resize canvas if needed
  if (canvas.width !== Math.floor(settings.width)) canvas.width = settings.width;
  if (canvas.height !== settings.height) canvas.height = settings.height;

  // clean canvas
  context.fillStyle = 'white';
  context.fillRect(0, 0, settings.width, settings.height);


  for (i = 0; i < agents.length; i++) {
    let agent = agents[i];
    for (j = i + 1; j < agents.length; j++) {
      let other = agents[j];

      const dist = agent.distance(other);
      if (dist > 200) continue

      context.lineWidth = math_mapRange(dist, 0, 200, 3, 0);
      context.beginPath();
      context.moveTo(agent.pos.x, agent.pos.y);
      context.lineTo(other.pos.x, other.pos.y);
      context.stroke();
    }
  }

  agents.forEach(agent => {
    agent.update();
    agent.draw(context);
  })
}