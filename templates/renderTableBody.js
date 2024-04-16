function renderTableBody(one_page_data_length, head_titles_length) {

    const tbody_el = document.getElementById('table-body');
    
    //table body
    for(let i = 0; i < one_page_data_length; i++) {  
        const rowd = document.createElement('tr');
        rowd.className = 'tr-data'
        let td_data = '';
        for(let i = 0; i < head_titles_length; i++){
            td_data = td_data + `<td></td>`
        }
        rowd.innerHTML = td_data;
        tbody_el.appendChild(rowd)      
    }; 
    
}

export { renderTableBody }