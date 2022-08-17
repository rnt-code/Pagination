function buildtable(len) {

    const item3_el = document.getElementById("item3");
    const istable = !!item3_el.children[0];
    if(istable) {
        item3_el.children[0].remove();
    }

    const tabla = document.createElement("table");
    tabla.className = 'table table-sm table-hover'
    tabla.id = 'tdatos'
    const div = document.createElement("div");
    item3_el.appendChild(div);
    div.className = 'container'
    div.appendChild(tabla);

    const thead = document.createElement("thead");
    thead.id = 'table-head';
    const tbody = document.createElement("tbody");
    
    tabla.appendChild(thead);
    tabla.appendChild(tbody);
    const rowh = document.createElement('tr')
    rowh.innerHTML += `
                    <th><a href="#">id</a></th>
                    <th>name</th>
                    <th>last name</th>
                    <th>position</th>
                    <th>office</th>
                    <th>age</th>
                    <th>start date</th>
                    `;
    thead.appendChild(rowh)

    if(len === 0) {
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
        for(let i = 0; i < len; i++) {  
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
}

export { buildtable }