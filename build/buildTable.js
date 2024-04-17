function buildTable() {
    
    const table_el = document.createElement("table");
    table_el.id = 'tdatos'
    document.getElementById('datatable').appendChild(table_el);

    const thead_el = document.createElement('thead');
    thead_el.id = 'table-head';
    const tbody_el = document.createElement('tbody');
    tbody_el.id = 'table-body'
    const tfoot_el = document.createElement('tfoot');
    tfoot_el.id = 'table-foot'

    table_el.appendChild(thead_el);
    table_el.appendChild(tbody_el);
    table_el.appendChild(tfoot_el);
    
    return false
}

export { buildTable }