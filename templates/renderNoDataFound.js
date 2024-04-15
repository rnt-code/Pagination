import { cleanUpDataTableContent } from "../utility/cleanUpDataTableContent.js";
import { buildTable } from "../build/buildTable.js";

function renderNoDataFound() {

    const title = 'No data found';
    
    const thead = document.getElementById('table-head');
    const tbody = document.getElementById('table-body');
    const tfoot = document.getElementById('table-foot');

    //table header
    const rowh = document.createElement('tr');
    rowh.id = 'tr-headers'
    rowh.innerHTML = title;
    thead.appendChild(rowh)
    
    //table body
    const rowb = document.createElement('tr');
    rowb.id = 'tr-data'
    rowb.innerHTML += `
                    <td class="no-data-found">No se encontraron datos</td>
                    `;
    tbody.appendChild(rowb)
    
    //table-foot
    const rowf = document.createElement('tr')
    rowf.id = 'tr-foot'
    rowf.innerHTML = title;
    tfoot.appendChild(rowf)
    
    return false
}

export { renderNoDataFound }