import { removeDataTableContent } from "../helpers/removeDataTableContent.js";
import { buildTable } from "./buildTable.js";

function renderNoDataFound() {

    const title = 'No data found';
    
    removeDataTableContent();
    buildTable();

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
                    <td class="no-data-found">
                        No se encontraron datos
                    </td>
                    `;
    tbody.appendChild(rowb)
    
    //table-foot
    const rowf = document.createElement('tr')
    rowf.id = 'tr-foot'
    rowf.innerHTML = title;
    tfoot.appendChild(rowf)
}

export { renderNoDataFound }