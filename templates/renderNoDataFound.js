function renderNoDataFound() {

    const title = 'No data found';
    
    const thead_el = document.getElementById('table-head');
    const tbody_el = document.getElementById('table-body');
    const tfoot_el = document.getElementById('table-foot');

    //table header
    const rowh = document.createElement('tr');
    rowh.id = 'tr-headers'
    rowh.innerHTML = title;
    thead_el.appendChild(rowh)
    
    //table body
    const rowb = document.createElement('tr');
    rowb.className = 'tr-data'
    rowb.innerHTML += `
                    <td class="no-data-found">No se encontraron datos</td>
                    `;
    tbody_el.appendChild(rowb)
    
    //table-foot
    const rowf = document.createElement('tr')
    rowf.id = 'tr-foot'
    rowf.innerHTML = title;
    tfoot_el.appendChild(rowf)
    
    return false
}

export { renderNoDataFound }