const settings = {
    width: 400,
    height: 400,
    animate: true,
    fps: 100,
    cols:10,
    rows:10,
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
        min: 0,
        max: 20,
        step: 1,
    });
    folder.addInput(settings, 'rows', {
        min: 0,
        max: 20,
        step: 1,
    });

}