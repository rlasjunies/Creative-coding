import {
    settings
} from "./pane.js";

const canvas = document.getElementById('canvaselmt');
export const context = canvas.getContext('2d');

canvas.addEventListener('mousemove', (e) => {
    mouse.x = e.x - e.target.offsetLeft;
    mouse.y = e.y - e.target.offsetTop;
    // console.log(mouse);
});

export function cleanCanvas() {
    context.fillStyle = 'black';
    context.fillRect(0, 0, settings.width, settings.height);
}

export function resizeCanvasIfSettingsChanged() {
    const canvasSizeAndSettingsSizeAreDifferent = (canvas.height !== Math.floor(settings.height)) || (canvas.width !== Math.floor(settings.width));
    if (canvasSizeAndSettingsSizeAreDifferent) {
        canvas.width = settings.width;
        canvas.height = settings.height;
        cleanCanvas();
    }
}

export let mouse = {
    x: 0,
    y: 0,
}

// eKxport const init = (canvas) => {
//     canvas.addEventListener('mousemove', (e) => {
//         mouse.x = e.x - e.target.offsetLeft;
//         mouse.y = e.y - e.target.offsetTop;
//         // console.log(mouse);
//     });
// // }