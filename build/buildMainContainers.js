function buildMainContainers() {

    const place_for_list_el = document.getElementById('place-for-list');
    
    //**build head-controls container*/
    const head_controls_el = document.createElement('div');
    head_controls_el.id = 'head-controls';
    place_for_list_el.appendChild(head_controls_el);

    //contenedores para el selector y para los botones de navegación
    head_controls_el.innerHTML =
                            `
                            <div id="hc-records-selector"></div>
                            <div id="hc-nav-buttons"></div>
                            `;
    //**build top-metrics container*/
    const top_metrics_container_el = document.createElement('div');
    top_metrics_container_el.id = 'top-info';

    //contenedor para las métricas
    const label_top_el = document.createElement('label');
    label_top_el.id = 'metrics-top';
    top_metrics_container_el.appendChild(label_top_el);
    place_for_list_el.appendChild(top_metrics_container_el);

    //**build datatable container*/
    const table_container_el = document.createElement('div');
    table_container_el.style = 'overflow-x:auto';
    table_container_el.id = 'datatable';
    place_for_list_el.appendChild(table_container_el);

    //**build bottom-metrics container*/
    const bottom_metrics_container_el = document.createElement('div');
    bottom_metrics_container_el.id = 'bottom-info';
    
    //contenedor para las métricas
    const label_bottom_el = document.createElement('label');
    label_bottom_el.id = 'metrics-bottom';
    bottom_metrics_container_el.appendChild(label_bottom_el);
    place_for_list_el.appendChild(bottom_metrics_container_el);

    //**build foot-controls container*/
    const foot_controls_el = document.createElement('div');
    foot_controls_el.id = 'foot-controls';
    place_for_list_el.appendChild(foot_controls_el);

    //contenedores para el selector y para los botones de navegación
    foot_controls_el.innerHTML =
                            `
                            <div id="fc-records-selector"></div>
                            <div id="fc-nav-buttons"></div>
                            `;
    return false
}

export { buildMainContainers }