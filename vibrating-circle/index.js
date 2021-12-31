const canvas = document.getElementById('canvaselmt');
const context = canvas.getContext('2d');


let lastTime = 0;
let timer = 0;
let drawn = false;
createPane();
loop(0);

function loop(timeStamp) {
  const nextFrame = 1000 / settings.fps;
  if (JSON.stringify(settings) !== JSON.stringify(previousSetting)) {
    drawn = false;
    console.log(settings, previousSetting);
  }
  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  // console.log(`${deltaTime} - lastime:${lastTime}`);

  if (timer > nextFrame) {
    if (settings.animate || !drawn) {
      drawCanvas(context, settings);
      drawn = true;
      previousSetting = JSON.parse(JSON.stringify(settings));
    }
    timer = 0;
  } else {
    timer += deltaTime;
  }

  requestAnimationFrame(loop);
}