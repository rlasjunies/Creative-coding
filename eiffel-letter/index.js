import * as sketchCanvas from "./canvas.js";
import * as sketch from "./sketch.js";
import * as pane from "./pane.js";

let lastTime = 0;
let timer = 0;

const settingsChanged_PaneCallback = (deltaSettings) => {
  // console.log(JSON.stringify(deltaSettings));

  // predefined changes reaction
  if (pane.sizeModified(deltaSettings) || pane.modeModified(deltaSettings)) startSketching();

  sketch.settingsChanged(deltaSettings);
}

const refreshStaticDraw_PaneCallback = () => {
  // console.log("refreshStaticDraw");
  // sketch.init();
  sketch.draw();
};

pane.create(settingsChanged_PaneCallback, refreshStaticDraw_PaneCallback);

startSketching();

function startSketching() {
  document.title = sketch.titleOfTheProject;
  sketchCanvas.resizeCanvasBasedOnSettings();
  sketch.init();
  if (pane.settings.mode === 'animate') {
    infiniteLoop(0);
  } else {
    sketch.draw();
  }
}

function infiniteLoop(timeStamp) {
  const nextFrame = 1000 / pane.settings.fps;

  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  // console.log(`${deltaTime} - lastTime:${lastTime}`);

  if (timer > nextFrame) {
    sketchCanvas.cleanCanvas();
    sketch.draw(timeStamp);
    timer = 0;
  } else {
    timer += deltaTime;
  }

  if (pane.settings.mode === 'animate') requestAnimationFrame(infiniteLoop);
}