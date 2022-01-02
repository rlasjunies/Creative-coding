import {
    settings
} from "./pane.js";
export const titleOfTheProject = "Particules";

let particules = [];

export const init = () => {
    // particules = [];
    // for (let i = 0; i < settings.particulesNumber; i++) {
    //     const x = Math.random() * settings.width;
    //     const y = Math.random() * settings.height;
    //     particules.push(new Particule(x, y));
    // }
}

export const settingsChanged = (deltaSettings) => {
    // use of detla settings
    // if (delta.setting != oldSettings.width) init();
    // if (newSettings.height != oldSettings.height) init();
    // if (newSettings.particulesNumber != oldSettings.particulesNumber) init();
    
}

export const draw = (frame) => {
    // particules.forEach((p) => {
    //     p.draw();
    //     // p.blowIfCloseToMouse();
    //     p.moveAwayIfCloseToMouse();
    // });
};