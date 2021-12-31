const settings = {
    width: 600,
    height: 600,
    animate: true,
    fps: 100,
    cols:20,
    rows:20, 
    frequency:7,
    amplitude:9,
}

let previousSetting = JSON.parse(JSON.stringify(settings));

const createPane = () => {
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
        title: 'Sketch'
    });

    folder.addInput(settings, 'cols', {
        min: 5,
        max: 40,
        step: 1,
    });
    folder.addInput(settings, 'rows', {
        min: 5,
        max: 40,
        step: 1,
    });
    folder.addInput(settings, 'frequency', {
        min: 1,
        max: 40,
        step: 1,
    });
    folder.addInput(settings, 'amplitude', {
        min: 1,
        max: 40,
        step: 1,
    });


}