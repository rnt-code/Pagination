    function buildTableBodyAndMetricsContainers() {
    
    //contenedor tbody
    const table_el = document.createElement("table");
    table_el.id = 'tdatos'
    const tbody_el = document.createElement('tbody');
    tbody_el.id = 'table-body'
    
    table_el.appendChild(tbody_el);
    
    //contenedor para las métricas
    const top_info_el = document.getElementById('top-info')
    const label_top_el = document.createElement('label');
    label_top_el.id = 'metrics-top';

    top_info_el.appendChild(label_top_el);

    const bottom_info_el = document.getElementById('bottom-info')
    const label_bottom_el = document.createElement('label');
    label_bottom_el.id = 'metrics-bottom';

    bottom_info_el.appendChild(label_bottom_el);
    
    return false
}

export { buildTableBodyAndMetricsContainers }
