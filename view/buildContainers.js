function buildContainers(datalength) {

    const place_for_list = document.getElementById("place-for-list");

    //borro lo que haya en place-for-list
    place_for_list.innerHTML = '';

    //build head-controls container
    const head_controls = document.createElement('div');
    head_controls.id = 'head-controls';
    place_for_list.appendChild(head_controls);
    head_controls.hidden = false;

    if(datalength === 0 ) {
        head_controls.hidden = true;
    }

    //build top-metrics container
    const top_metrics_container = document.createElement('div')
    top_metrics_container.id = 'top-info'
    const label_top = document.createElement('label')
    label_top.id = 'metrics-top'
    top_metrics_container.appendChild(label_top)
    place_for_list.appendChild(top_metrics_container)

    //build datatable container
    const table_container = document.createElement('div');
    table_container.style = 'overflow-x:auto';
    table_container.id = 'datatable';
    place_for_list.appendChild(table_container);

    //build bottom-metrics container
    const bottom_metrics_container = document.createElement('div')
    bottom_metrics_container.id = 'bottom-info'
    const label_bottom = document.createElement('label')
    label_bottom.id = 'metrics-bottom'
    bottom_metrics_container.appendChild(label_bottom)
    place_for_list.appendChild(bottom_metrics_container)

    //build foot-controls container
    const foot_controls = document.createElement('div');
    foot_controls.id = 'foot-controls';
    place_for_list.appendChild(foot_controls);

    renderHead();
    renderFoot();
    
    function renderHead() {
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
            <div id="nav-buttons">
            <!--
            <div id="search_filter">
                <label class="">Buscar:<input type="search" placeholder="ingrese parametro" aria-controls="search"></label>
            </div>
            -->
        `
    }

    function renderFoot() {
        foot_controls.innerHTML = `
        <!--<div id="info">foot controls</div>
            <div id="nav-buttons"></div>-->
        `
    }
}

export { buildContainers }