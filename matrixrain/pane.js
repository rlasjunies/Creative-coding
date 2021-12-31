const settings = {
    width: 480,
    height: 480,    
    fps: 30
}

const createPane = () => {
    const pane = new Tweakpane.Pane({
        container: document.getElementById('panecontainer'),
      });

    let folder;
    folder = pane.addFolder({
        title: 'canvas'
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
    folder.addInput(settings, 'fps', {
        min: 5,
        max: 40,
        step: 1,
    });

}