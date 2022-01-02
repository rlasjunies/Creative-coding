export const settings = {
    width: 600,
    height: 600,
    mode: 'animate',
    fps: 100,
    particulesNumber: 2000,
    mouseDistance: 100,
}

export function createPane(cbSettingsChanged, cbRefreshStatic) {
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

    folder.addInput(settings, 'mode', {
            options: {
                animate: 'animate',
                static: 'static',
            },
        })
        .on('change', (ev) => {
            // console.log(ev.value);
            if (ev.value === 'animate') {
                refreshButton.hidden = true;
                fpsInput.hidden = false;
            } else {
                refreshButton.hidden = false;
                fpsInput.hidden = true;
            }
        });

    const refreshButton = folder.addButton({
            title: 'refresh',
            label: '', // optional
        })
        .on('click', () => {
            //settings.drawn = false;
            cbRefreshStatic();
        });
    refreshButton.hidden = true;

    const fpsInput = folder.addInput(settings, 'fps', {
        min: 0,
        max: 200,
        step: 1,
    });

    folder.addSeparator();

    folder = pane.addFolder({
        title: 'Sketch parameters'
    });

    folder.addInput(settings, 'particulesNumber', {
        min: 1,
        max: 2000,
        step: 1,
    });

    folder.addInput(settings, 'mouseDistance', {
        min: 1,
        max: 500,
        step: 1,
    });

    pane.on('change', (ev) => {
        // console.log(ev);
        if ( ev.last) cbSettingsChanged({presetKey: ev.presetKey, value:ev.value});
    });
}