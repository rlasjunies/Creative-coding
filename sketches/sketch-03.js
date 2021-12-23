const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = ({ context, width, height }) => {

  const agents = [];
  const padding = 50;

  for (let i=0;i<40;i++){
    let x = random.range(padding,width-padding);
    let y = random.range(padding,height-padding);

    agents.push(new Agent(x,y));
  }

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    agents.forEach(agent => {
      agent.draw(context);
    })

  };
};

canvasSketch(sketch, settings);

class Point {
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
}

class Agent{
  constructor(x,y){
    this.pos = new Point(x,y);
    this.radius = 10;
  }

  draw(context){
    context.save();
    context.fillStyle = 'black';
    context.beginPath();
    context.arc(this.pos.x,this.pos.y,this.radius,0,Math.PI*2);
    context.fill();
    context.restore();
  }
}