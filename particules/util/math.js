export const EPSILON = Number.EPSILON;

export function degToRad(n) {
  // Reference:
  // https://github.com/mattdesl/canvas-sketch-util/blob/master/math.js
  return n * Math.PI / 180;
}

export function radToDeg(n) {
  // Reference:
  // https://github.com/mattdesl/canvas-sketch-util/blob/master/math.js
  return n * 180 / Math.PI;
}

export const mapRange = (value, inputMin, inputMax, outputMin, outputMax, clamp) => {
  // Reference:
  // https://github.com/mattdesl/canvas-sketch-util/blob/master/math.js
  // ---
  // Reference:
  // https://openframeworks.cc/documentation/math/ofMath/
  if (Math.abs(inputMin - inputMax) < EPSILON) {
    return outputMin;
  } else {
    var outVal = ((value - inputMin) / (inputMax - inputMin) * (outputMax - outputMin) + outputMin);
    if (clamp) {
      if (outputMax < outputMin) {
        if (outVal < outputMax) outVal = outputMax;
        else if (outVal > outputMin) outVal = outputMin;
      } else {
        if (outVal > outputMax) outVal = outputMax;
        else if (outVal < outputMin) outVal = outputMin;
      }
    }
    return outVal;
  }
}

export const distance = (x1,y1,x2,y2) => {
  const dx = (x2-x1);
  const dy = (y2-y1);
  return {
    dist: Math.sqrt(dx*dx+dy*dy),
    dx:dx,
    dy:dy
  };
}