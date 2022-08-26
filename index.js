import { builddatatable } from './buildDataTable.js'

//Datos a listar de la tabla
async function getData() {

    const response = await fetch(`./getData.php`);
    const data = await response.json();
    return data;
}

const data = await getData();

builddatatable(data);