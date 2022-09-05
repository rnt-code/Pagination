function buildtable(one_page_data, headers) {

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
    const tfoot = document.createElement('tfoot');
    const caption = document.createElement('caption')
    
    tabla.appendChild(caption);
    caption.id = 'metrics';
    tabla.appendChild(thead);
    tabla.appendChild(tbody);
    tabla.appendChild(tfoot);
    
    const rowh = document.createElement('tr');

    let th_names = '';
    for(let i = 0; i < headers.length; i++){
        th_names = th_names + `<th>${headers[i]}</th>`
    }
    rowh.innerHTML = th_names;
    thead.appendChild(rowh)
    
    if(data_length === 0) {
        
        const row1 = document.createElement('tr');
        let td_empty = '';
        for(let i = 0; i < headers.length; i++){
            td_empty = td_empty + `<td></td>`
        }

        row1.innerHTML = td_empty;
        tbody.appendChild(row1)

        const row2 = document.createElement('tr')
        row2.innerHTML += `
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
        tbody.appendChild(row2)
    }
    else {   
        for(let i = 0; i < data_length; i++) {  
            const row = document.createElement('tr');
            let td_data = '';
            for(let i = 0; i < headers.length; i++){
                td_data = td_data + `<td></td>`
            }
            row.innerHTML = td_data;
            tbody.appendChild(row)      
        }; 
    }
    
    const rowf = document.createElement('tr')
    rowf.innerHTML = th_names;
    tfoot.appendChild(rowf)
}

export { buildtable }