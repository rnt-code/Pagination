import { builddatatable } from './buildDataTable.js'

//Obtención datos a listar
async function getData() {

    const response = await fetch(`./getData.php`);
    const data = await response.json();
    return data;
}

const data = await getData();

//Entry point
builddatatable(data);