function drawCanvas() {
    // resize canvas if needed
    if (canvas.width !== Math.floor(settings.width)) canvas.width = settings.width;
    if (canvas.height !== settings.height) canvas.height = settings.height;
  
    // clean canvas
    context.fillStyle = 'white';
    context.fillRect(0, 0, settings.width, settings.height);
  
    // prepare drawing
    context.fillStyle = 'black';
  
    const canvasCenterX = settings.width / 2;
    const canvasCenterY = settings.height / 2;
  
    const rectWidth = settings.width * 0.01;
    const rectHeight = settings.height * 0.1;
  
    let startRectX, startRectY;
  
    const numberOfSlices = 20;
    const radius = settings.width * .3;
  
    const slice = math_degToRad(360 / numberOfSlices);
    for (i = 0; i < numberOfSlices; i++) {
      const angle = slice * i;
  
      startRectX = canvasCenterX + radius * Math.sin(angle);
      startRectY = canvasCenterY + radius * Math.cos(angle);
      // console.log(`x:${startRectX}-y:${startRectY}`);
  
      // rect
      context.save();
      context.translate(startRectX, startRectY);
      context.rotate(-angle);
      context.scale(random_range(0, 2), random_range(1, 2));
  
      context.beginPath()
      context.rect(0, 0, rectWidth * random_range(0.5, 2), rectHeight * random_range(0.5, 1));
      context.fill()
      context.restore();
  
      // arc
      context.save();
      context.translate(canvasCenterX, canvasCenterY);
      context.rotate(-angle);
      context.lineWidth = random_range(1, 10);
      //context.scale(random_range(0,2),random_range(1,2))
  
      context.beginPath()
      context.arc(0, 0, radius * random_range(0.7, 1.3), slice * random_range(1, -8), slice * random_range(1, 5));
      context.stroke();
      context.restore();
    }
  }