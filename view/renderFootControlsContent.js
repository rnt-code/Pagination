function renderFootControlsContent() {

    const foot_controls = document.getElementById('foot-controls')
    foot_controls.innerHTML = `
        <div id="info"></div>
        <div id="foot-nav-buttons"></div>
    `
}

export { renderFootControlsContent }