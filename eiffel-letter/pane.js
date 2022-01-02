export const settings = {
    width: 800,
    height: 800,
    mode: 'animate',
    // mode: 'static',
    fps: 100,
    particulesNumber: 2000,
    mouseDistance: 100,
}

export const previousSetting = JSON.parse(JSON.stringify(settings));
export const sizeModified = (deltaSettings) =>{
    return (deltaSettings.key === 'width') || (deltaSettings.key === 'height' );
}
export const modeModified = (deltaSettings) =>{
    return (deltaSettings.key === 'mode');
}

export function create(cbSettingsChanged, cbRefreshStatic) {
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
    if ( settings.mode == 'animate') refreshButton.hidden = true;

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
        if ( ev.last) cbSettingsChanged({key: ev.presetKey, value:ev.value});
    });
}