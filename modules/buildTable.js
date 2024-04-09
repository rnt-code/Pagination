function buildTable(one_page_data, headers) {

    const data_length = one_page_data.length;
    const item3_el = document.getElementById("item3");
    
    if(data_length === 0) {
        headers = ['No data found'];
    }
    
    const istable = !!item3_el.children[1].children[0];
    if(istable) {
        item3_el.children[1].children[0].remove();
    }

    const tabla = document.createElement("table");
    //tabla.className = 'table table-sm table-bordered table-hover table-striped' //Boostrap classes
    tabla.id = 'tdatos'

    document.getElementById('datatable').appendChild(tabla);

    const thead = document.createElement('thead');
    thead.id = 'table-head';
    const tbody = document.createElement('tbody');
    tbody.id = 'table-body'
    const tfoot = document.createElement('tfoot');
    tfoot.id = 'table-foot'
    const caption = document.createElement('caption')
    
    tabla.appendChild(caption);
    caption.id = 'metrics';
    tabla.appendChild(thead);
    tabla.appendChild(tbody);
    tabla.appendChild(tfoot);
    
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
    if(data_length === 0) {
        //data = no data
        const rowd1 = document.createElement('tr');
        rowd1.id = 'tr-data'
        let td_empty = '';
        for(let i = 0; i < headers.length; i++){
            td_empty = td_empty + `<td class="tdata"></td>`
        }

        rowd1.innerHTML = td_empty;
        tbody.appendChild(rowd1)

        const rowd2 = document.createElement('tr');
        rowd2.id = 'tr-data'
        rowd2.innerHTML += `
                        <td 
                            colspan="9" 
                            style="
                                color: red; 
                                font-size: 20px; 
                                font-weight: bold;
                            ">
                            No se encontraron datos
                        </td>
                        `;
        tbody.appendChild(rowd2)
    }
    else {
        //full data 
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
    }
    
    //table-foot
    const rowf = document.createElement('tr')
    rowf.id = 'tr-foot'
    rowf.innerHTML = th_titles;
    tfoot.appendChild(rowf)
}

export { buildTable }