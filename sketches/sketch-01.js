const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [1000, 1000]
};

const sketch = () => {
  return ({
    context,
    width,
    height
  }) => {

    context.fillStyle = 'white';
    context.fillRect(0,0,width,height);
    context.lineWidth = width * 0.001;

    for (i = 0; i < 5; i++) {
      for (j = 0; j < 5; j++) {
        const w = width * 0.10;
        const h = height * 0.10;
        const gap = width * 0.03;
        const ix = width * 0.17;
        const iy = width * 0.17;

        const off = width * 0.01;

        let x = ix + i * (w + gap);
        let y = iy + j * (h + gap);

        context.beginPath();
        context.rect(x, y, w, h);
        context.stroke();

        if (Math.random() < 0.5) {
          context.beginPath()
          context.rect(x + off, y + off, w - 2*off, h - 2*off);
          context.stroke();
        }
      }
    }
  };
};

canvasSketch(sketch, settings);