import { builddatatable } from './pagination_modules/buildDataTable.js'

//Obtención datos a listar
async function getData() {

    const response = await fetch(`./getData.php`);
    const data = await response.json();
    return data;
}

const data = await getData();
const number_of_buttons = 4;
const custom_header = ['Id', 'Nombre', 'Apellido', 'Dirección', 'Ciudad', 'Teléfono', 'e-mail','Compañia', 'Posición', 'Oficina', 'Edad', 'Fecha inicio'];

//console.log(data);

//Entry point
builddatatable(data, 6, custom_header);