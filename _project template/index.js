import { drawCanvas, titleOfTheProject } from "./drawCanvas.js";
import { createPane, settings } from "./pane.js";

const canvas = document.getElementById('canvaselmt');
const context = canvas.getContext('2d');


let lastTime = 0;
let timer = 0;
let drawn = false;
let loopCounter=0;
let previousSetting = JSON.parse(JSON.stringify(settings));

document.title = titleOfTheProject;
createPane();
loop(0);
 
function loop(timeStamp) {
  const nextFrame = 1000 / settings.fps;
  if (JSON.stringify(settings) !== JSON.stringify(previousSetting)) {
    drawn = false;
    // console.log(settings, previousSetting);
  }
  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  // console.log(`${deltaTime} - lastime:${lastTime}`);

  if (timer > nextFrame) {
    if (settings.animate || !drawn) {
      resizeCanvasIfSettingsChanged();
      cleanCanvas();    
      drawCanvas(timeStamp);
      drawn = true;
      previousSetting = JSON.parse(JSON.stringify(settings));
      loopCounter+=1;
    }
    timer = 0;
  } else {
    timer += deltaTime;
  }

  requestAnimationFrame(loop);
}

function cleanCanvas() {
  context.fillStyle = 'black';
  context.fillRect(0, 0, settings.width, settings.height);
}

function resizeCanvasIfSettingsChanged() {
  if (canvas.width !== Math.floor(settings.width))
    canvas.width = settings.width;
  if (canvas.height !== Math.floor(settings.height))
    canvas.height = settings.height;
}

const mouse = {
  x: 0,
  y: 0,
}
canvas.addEventListener('mousemove', (e) => {
  mouse.x = e.x - e.target.offsetLeft;
  mouse.y = e.y - e.target.offsetTop;
  // console.log(mouse);
});