function buildTableBody() {
    
    //contenedor tbody
    const table_el = document.createElement("table");
    table_el.id = 'tdatos'

    const tbody_el = document.createElement('tbody');
    tbody_el.id = 'table-body'
    
    table_el.appendChild(tbody_el);

    return false
}

export { buildTableBody }