export const getTextCanvasImageData= (cols, rows, text) => {
    const typeCanvas = document.createElement('canvas');
    const typeContext = typeCanvas.getContext('2d');
    typeCanvas.width = cols;
    typeCanvas.height = rows;

    return typeTemplate(typeContext, cols, rows, text).getImageData(0, 0, cols, rows).data;
}


export const typeTemplate = (typeContext, cols, rows, text) => {

    typeContext.fillStyle = 'black';
    typeContext.fillRect(0, 0, cols, rows);
    typeContext.fillStyle = 'white';
    fontSize = cols;
    typeContext.font = `canvasText - typeTemplate: ${fontSize}px ${fontFamily}`;
  
    const metrics = typeContext.measureText(text);
    const mx = metrics.actualBoundingBoxLeft * -1;
    const my = metrics.actualBoundingBoxAscent * -1;
    const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight
    const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
  
    const ctx = (cols - mw) / 2 - mx;
    const cty = (rows - mh) / 2 - my;
    typeContext.save();
  
    typeContext.translate(ctx, cty);
    typeContext.fillText(text, 0, 0);
    typeContext.restore();
  
    return typeContext
  }