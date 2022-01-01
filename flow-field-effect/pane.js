const settings = {
    width: 600,
    height: 600,
    animate: true,
    fps: 100,

    cellSize:10,
    fontSize:40, 
    LineLengthCosFactor:20,
    LineLengthSinFactor:20,
    PatternZoomCosFactor:1,
    PatternZoomSinFactor:1,
    PatternFactor:1,
    AnimatePatternFactor:false,
    lineWidth:1,
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

    folder.addInput(settings, 'cellSize', {
        min: 1,
        max: 50,
        step: 1,
    });
    folder.addInput(settings, 'LineLengthCosFactor', {
        min: 1,
        max: 100,
        step: 1,
    });
    folder.addInput(settings, 'LineLengthSinFactor', {
        min: 1,
        max: 100,
        step: 1,
    });
    folder.addInput(settings, 'PatternZoomCosFactor', {
        min: 1,
        max: 100,
        step: 1,
    });
    folder.addInput(settings, 'PatternZoomSinFactor', {
        min: 1,
        max: 100,
        step: 1,
    });
    folder.addInput(settings, 'PatternFactor', {
        min: 1,
        max: 100,
        step: 1,
    });
    folder.addInput(settings, 'AnimatePatternFactor');
    folder.addInput(settings, 'lineWidth', {
        min: 0.1,
        max: 5,
        step: 0.1,
    });
}