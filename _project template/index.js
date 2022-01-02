// import { drawCanvas, titleOfTheProject, init as canvasInit, settingsChanged } from "./drawCanvas.js";
import * as canvasUtil from "./canvas.js";
import * as sketch from "./sketch.js";
import {
  createPane,
  settings
} from "./pane.js";
// import {
//   init as inputInit
// } from "./input.js";

let lastTime = 0;
let timer = 0;
let previousSetting = JSON.parse(JSON.stringify(settings));

const settingsChanged = (ev) => {
  console.log(JSON.stringify(ev));
  // sketch.init();
  canvasUtil.resizeCanvasIfSettingsChanged();
  sketch.settingsChanged(ev, previousSetting);
}

const refreshStaticDraw = () => {
  console.log("refreshStaticDraw");
  sketch.draw();
};

document.title = sketch.titleOfTheProject;
createPane(settingsChanged, refreshStaticDraw);

canvasUtil.resizeCanvasIfSettingsChanged();
sketch.init();
if (settings.mode === 'animate') {
  infiniteLoop(0);
} else {
  sketch.draw();
}



function infiniteLoop(timeStamp) {
  const nextFrame = 1000 / settings.fps;
  // if (JSON.stringify(settings) !== JSON.stringify(previousSetting)) sketch.settingsChanged(settings,previousSetting);

  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  // console.log(`${deltaTime} - lastTime:${lastTime}`);

  if (timer > nextFrame) {
    // if (settings.animate || !settings.drawn) {
    canvasUtil.cleanCanvas();
    sketch.draw(timeStamp);
    // settings.drawn = true;
    previousSetting = JSON.parse(JSON.stringify(settings));
    // }
    timer = 0;
  } else {
    timer += deltaTime;
  }

  if (settings.mode === 'animate') requestAnimationFrame(infiniteLoop);
}

