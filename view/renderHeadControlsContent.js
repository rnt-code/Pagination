function renderHeadControlsContent() {

    const head_controls = document.getElementById('head-controls');
    head_controls.innerHTML = `
        <div id="records-length">
            <label>Mostrando 
                <select id="count">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15" selected>15</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="300">300</option>
                    <option value="500">500</option>
                    <option value="1000">1000</option>
                </select> registros
            </label>
        </div>
        <div id="head-nav-buttons">
        <!--
        <div id="search_filter">
            <label class="">Buscar:<input type="search" placeholder="ingrese parametro" aria-controls="search"></label>
        </div>
        -->
    `
}

export { renderHeadControlsContent }