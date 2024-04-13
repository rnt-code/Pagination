import { cleanUpDataTableContent } from '../utility/cleanUpDataTableContent.js';
import { buildTable } from "../build/buildTable.js";

function renderDataTable(one_page_data, headers) {

    const data_length = one_page_data.length;

    cleanUpDataTableContent();
    buildTable();

    const thead = document.getElementById('table-head');
    const tbody = document.getElementById('table-body');
    const tfoot = document.getElementById('table-foot');

    //table header
    const rowh = document.createElement('tr');
    rowh.id = 'tr-headers'
    let th_titles = '';
    for(let i = 0; i < headers.length; i++){
        th_titles = th_titles + `<th>${headers[i]}</th>`
    }
    rowh.innerHTML = th_titles;
    thead.appendChild(rowh)
    
    //table body
    for(let i = 0; i < data_length; i++) {  
        const rowd = document.createElement('tr');
        rowd.id = 'tr-data'
        let td_data = '';
        for(let i = 0; i < headers.length; i++){
            td_data = td_data + `<td></td>`
        }
        rowd.innerHTML = td_data;
        tbody.appendChild(rowd)      
    }; 
    
    //table-foot
    const rowf = document.createElement('tr')
    rowf.id = 'tr-foot'
    rowf.innerHTML = th_titles;
    tfoot.appendChild(rowf)
}

export { renderDataTable }