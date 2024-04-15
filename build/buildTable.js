function buildTable() {
    
    const tabla = document.createElement("table");
    tabla.id = 'tdatos'
    document.getElementById('datatable').appendChild(tabla);
    const thead = document.createElement('thead');
    thead.id = 'table-head';
    const tbody = document.createElement('tbody');
    tbody.id = 'table-body'
    const tfoot = document.createElement('tfoot');
    tfoot.id = 'table-foot'

    tabla.appendChild(thead);
    tabla.appendChild(tbody);
    tabla.appendChild(tfoot);
    
    return false
}

export { buildTable }