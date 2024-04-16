function renderDataTable(one_page_data_length, head_titles_length) {

    const thead = document.getElementById('table-head');
    const tbody = document.getElementById('table-body');
    const tfoot = document.getElementById('table-foot');

    //table header
    const rowh = document.createElement('tr');
    rowh.id = 'tr-headers'
    let th_titles = '';
    for(let i = 0; i < head_titles_length; i++){
        th_titles = th_titles + `<th></th>`
    }
    rowh.innerHTML = th_titles;
    thead.appendChild(rowh)
    
    //table body
    for(let i = 0; i < one_page_data_length; i++) {  
        const rowd = document.createElement('tr');
        rowd.className = 'tr-data'
        let td_data = '';
        for(let i = 0; i < head_titles_length; i++){
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
    return false
}

export { renderDataTable }