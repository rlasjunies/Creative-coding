export const settings = {
    width: 600,
    height: 600,
    animate: true,
    fps: 100,
}

export function createPane() {
    const pane = new Tweakpane.Pane({
        container: document.getElementById('panecontainer'),
    });

    let folder;
    folder = pane.addFolder({
        title: 'Canvas'
    });

    folder.addInput(settings, 'width', {
        min: 100,
        max: 1080,
        step: 100,
    });
    folder.addInput(settings, 'height', {
        min: 100,
        max: 1080,
        step: 100,
    });


    folder = pane.addFolder({
        title: 'Animate'
    });

    const btn = folder.addButton({
        title: 'redraw',
        label: 'static', // optional
    });

    btn.on('click', () => {
        drawn = false;
    });

    folder.addSeparator();

    folder.addInput(settings, 'animate');

    folder.addInput(settings, 'fps', {
        min: 0,
        max: 200,
        step: 1,
    });


    folder = pane.addFolder({
        title: 'Sketch parameters'
    });
}