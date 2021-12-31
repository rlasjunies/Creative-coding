var EPSILON = Number.EPSILON;

function math_degToRad(n) {
  // Reference:
  // https://github.com/mattdesl/canvas-sketch-util/blob/master/math.js
  return n * Math.PI / 180;
}

function math_radToDeg(n) {
  // Reference:
  // https://github.com/mattdesl/canvas-sketch-util/blob/master/math.js
  return n * 180 / Math.PI;
}

function math_mapRange(value, inputMin, inputMax, outputMin, outputMax, clamp) {
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

function math_mapRange (value, inputMin, inputMax, outputMin, outputMax, clamp) {
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