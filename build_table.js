function buildtable(data_length) {

    const item3_el = document.getElementById("item3");

    const istable = !!item3_el.children[1].children[0];
    if(istable) {
        item3_el.children[1].children[0].remove();
    }

    const tabla = document.createElement("table");
    tabla.className = 'table table-sm table-hover'
    tabla.id = 'tdatos'

    document.getElementById('datatable').appendChild(tabla);

    const thead = document.createElement('thead');
    thead.id = 'table-head';
    const tbody = document.createElement('tbody');
    const tfoot = document.createElement('tfoot')
    
    tabla.appendChild(thead);
    tabla.appendChild(tbody);
    tabla.appendChild(tfoot)
    
    const rowh = document.createElement('tr')
    rowh.innerHTML += `
                    <th>id</th>
                    <th>name</th>
                    <th>last name</th>
                    <th>position</th>
                    <th>office</th>
                    <th>age</th>
                    <th>start date</th>
                    `;
    thead.appendChild(rowh)
    if(data_length === 0) {
        const row1 = document.createElement('tr')
        row1.innerHTML += `
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        `;
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
                            Sin datos para listar
                        </td>
                        `;
        tbody.appendChild(row2)
    }
    else {   
        for(let i = 0; i < data_length; i++) {  
            const row = document.createElement('tr')
            row.innerHTML += `
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            `;
            tbody.appendChild(row)      
        }; 
    }
    const rowf = document.createElement('tr')
    rowf.innerHTML += `
                    <td>id</td>
                    <td>name</td>
                    <td>last name</td>
                    <td>position</td>
                    <td>office</td>
                    <td>age</td>
                    <td>start date</td>
                    `;
    tfoot.appendChild(rowf)
}

export { buildtable }